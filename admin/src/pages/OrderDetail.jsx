import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../context/ThemeContext';
import { useParams } from 'react-router-dom';
import { IoPrint } from "react-icons/io5";
import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';
import logo from '../assets/logo-3.png'

import LoadingLoader from "../components/LoadingLoader";
import { getOrder } from '../actions/orderAction/order.action';
import { extractUploads, removeTrailingZeros } from '../utils/truncateText';
import formatNumberWithSeparators from '../utils/numberSeparator';

const OrderDetail = () => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const { theme } = useTheme();
    const dispatch = useDispatch();
    const { orderId } = useParams();
    const orderRef = useRef();

    const ordersState = useSelector(state => state.orders);
    const { order, loading } = ordersState;
    const [myOrder, setMyOrder] = useState(order)

    useEffect(() => {
        dispatch(getOrder(orderId));
    }, [dispatch, orderId]);

    useEffect(() => {
        setMyOrder(order);
    }, [order]);

    const generatePDF = async () => {
        // Ajouter un style pour forcer le fond blanc
        orderRef.current.style.backgroundColor = 'white';

        const canvas = await html2canvas(orderRef.current, {
            useCORS: true,  // Pour traiter les images venant de domaines externes
        });
        const imgData = canvas.toDataURL('image/png');

        // Définir une taille de page plus petite (comme un reçu)
        // const pdf = new jsPDF({
        //     orientation: 'portrait',
        //     unit: 'mm',
        //     format: [80, 200] // Par exemple, 80mm x 200mm
        // });
        const pdf = new jsPDF()
        // Calculer la taille de l'image pour s'adapter à la nouvelle taille de la page
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`facture_commande_${orderId}.pdf`);
    };

    return (
        loading ? (
            <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
                <LoadingLoader />
                <p className='text-xl text-gray-500 text-center mt-3'>Patientez quelques minutes le temps que les données chargent</p>
            </div>
        ) : (
            <div className="w-full">
                <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
                    <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Les détails sur la Commande</h2>
                    <h4 className='text-base'>
                        <span className='text-gray-500 cursor-pointer'>Tableau de bord / </span>
                        <span className='text-purple-700'>Commande détails</span>
                    </h4>
                </div>
                <div className="flex justify-end mb-4 flex-wrap gap-3">
                    <button
                        className='flex items-center justify-center px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700'
                        onClick={generatePDF}
                    >
                        <span>Imprimer la facture</span>
                        <span className='ml-2'><IoPrint /></span>
                    </button>
                </div>
                <div ref={orderRef} style={{ padding: '20px', borderRadius: '10px' }}>
                    <div className={`flex px-4 overflow-x-auto py-4 justify-between mt-5 ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border-b shadow-2xl text-gray-500`}>
                        <div className='font-semibold'>ENTREPRISE</div>
                        <div>
                            <img className='w-20 h-12' src={logo} alt='logo' />
                            <div>Store-course</div>
                            <div>Yaoundé, CM</div>
                            <div>+237686534</div>
                        </div>
                        <div className='font-semibold'>CLIENT</div>
                        <div>
                            <div className='text-blue-500'>{order?.shipping.email}</div>
                            <div>{myOrder?.user.name}</div>
                            <div>{myOrder?.shipping.name}</div>
                            <div>{myOrder?.shipping.phone}</div>
                            <div>{myOrder?.shipping.address.line1}</div>
                            <div>{`${myOrder?.shipping.address.city}, ${myOrder?.shipping.address.country}`}</div>
                        </div>
                        <div className='font-semibold'>INFORMATIONS DE LIVRAISON</div>
                        <div>
                            <div>{myOrder?.shipping.name}</div>
                            <div>{myOrder?.shipping.address.line1}</div>
                            <div>{`${myOrder?.shipping.address.city}, ${myOrder?.shipping.address.country}`}</div>
                        </div>

                    </div>
                    <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto shadow-2xl text-gray-500`}>
                        <table className='w-1400px xl:w-full'>
                            <thead>
                                <tr>
                                    <th className={`border-r-0 columns-2 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>ARTICLES</th>
                                    <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>QUANTITÉ</th>
                                    <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>PRIX UNITAIRE</th>
                                    <th className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 text-left py-4`}>MONTANT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrder?.products.map((element) => (
                                    <tr key={element._id}>
                                        <td className={`border-r-0 columns-2 flex gap-3 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>
                                            <img
                                                className='w-28 h-28'
                                                src={typeof element.product.images[0] === 'string'
                                                    ? apiUrl + extractUploads(element.product.images[0])
                                                    : element.product.images[0] instanceof File
                                                        ? URL.createObjectURL(element.product.images[0])
                                                        : "/uploads/images/no-image-product.jpg"}
                                                alt="product"
                                            />
                                            <div className='w-450px h-44'>{element.product.name}</div>
                                        </td>
                                        <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(element.quantity, " ")}</td>
                                        <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators(element.product.new_price.toFixed(2), " ")} €</td>
                                        <td className={`border-r-0 ${theme === 'dark' ? "border-gray-600" : "border-gray-200"} border-b px-4 py-5`}>{formatNumberWithSeparators((element.quantity * element.product.new_price).toFixed(2), " ")} €</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={`flex justify-end gap-40 pr-20 py-4 overflow-x-auto ${theme === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'} border-b shadow-2xl text-gray-500`}>
                        <div className='flex flex-col'>
                            <span>Expédition{`(${myOrder?.total_details.amount_shipping > 0 ? 'avec frais' : 'sans frais'})`}</span>
                            <span className='mt-5 font-semibold'>Total</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-semibold'> {formatNumberWithSeparators(removeTrailingZeros(myOrder?.total_details.amount_shipping).toFixed(2), ' ')} €</span>
                            <span className='mt-5 font-semibold'>{formatNumberWithSeparators(removeTrailingZeros(myOrder?.totalPrice).toFixed(2), ' ')} €</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    );
};

export default OrderDetail;
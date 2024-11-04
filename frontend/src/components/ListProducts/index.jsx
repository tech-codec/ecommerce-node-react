import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../../context/CartContext';
//import { useCart } from '../../context/CartContext';


function ListProducts({ products }) {


    const { addToCart } = useContext(CartContext);

    const hanleonclick = (product)=>{
        console.log("merci pour le produit")
        addToCart(product)
    }

    return (
        <div className='w-full visible_filter:w-74p list_p_1179:w-79p'>
            <div className='grid grid-cols-1 sm:grid-cols-2 list_p_1179:grid-cols-3 list_p_1406:grid-cols-4 gap-3 '>
                {products.map(product =>
                    <div key={product.id} className="rounded-lg border bg-white  py-4 px-4 shadow-lg">
                        <Link to={`/product/${product.id}`}>
                            <img src={product.image[0]} alt="" className="rounded-lg m-auto w-40 h-40 cursor-pointer" />
                        </Link>

                        <Link to={`/product/${product.id}`}>
                            <div className="text-sm cursor-pointer text-gray-700 whitespace-normal mt-4 mb-8 text-center max-h-16 overflow-hidden overflow-ellipsis">
                                {product.description}
                            </div>
                        </Link>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <div className="text-gray-400">
                                    <span>Ancien prix:</span><span className="line-through"> {product.old_price}</span>
                                </div>

                                <span className="font-semibold text-lg text-gray-900">{product.new_price} FCFA</span>
                            </div>
                            <div className="w-12 cursor-pointer h-12 rounded-full bg-orange-600 hover:bg-orange-700 flex items-center justify-center relative" onClick={()=>hanleonclick(product)}>
                                <span className="text-lg absolute top-2 left-0 text-white"><ion-icon name="add-outline"></ion-icon></span>
                                <div className="w-5 h-5">
                                    <span className="text-2xl text-white"><ion-icon name="cart-outline"></ion-icon></span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListProducts
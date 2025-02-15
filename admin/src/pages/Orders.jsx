import { useState, useMemo, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { FaRegEye } from 'react-icons/fa6';
import { useTheme } from '../context/ThemeContext';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { IoChevronBackSharp, IoChevronForwardSharp } from 'react-icons/io5';
import DeleteOrderModal from '../components/Modals/OrdersModals/DeleteOrderModal';
import LoadingLoader from "../components/LoadingLoader";
import { useDispatch, useSelector } from 'react-redux';
import formatNumberWithSeparators from '../utils/numberSeparator';
import { removeTrailingZeros } from '../utils/truncateText';
import { getAllOrders, deleteOrder, updateStatusOrder, getOrder } from '../actions/orderAction/order.action';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const { theme } = useTheme();
  const orderState = useSelector(state => state.orders);
  const dispatch = useDispatch();
  const { ordersData, loading } = orderState;
  const [orders, setOrders] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [currentOrderId, setcurrentOrderId] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();

  const statusMap = {
    'Pending': 'En attente',
    'Processing': 'Traitement',
    'Shipped': 'Expédié',
    'Delivered': 'Livré',
    'Cancelled': 'Annulé'
  };

  const reverseStatusMap = {
    'En attente': 'Pending',
    'Traitement': 'Processing',
    'Expédié': 'Shipped',
    'Livré': 'Delivered',
    'Annulé': 'Cancelled'
  };

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    setOrders(ordersData);
  }, [ordersData]);

  // Gestion des données filtrées
  const filteredorders = useMemo(() => {
    return orders?.filter(order =>
      statusMap[order.orderStatus]?.toLowerCase().includes(search.toLowerCase())
    );
  }, [orders, search]);

  const paginatedorders = useMemo(() => {
    const start = page * rowsPerPage;
    return filteredorders?.slice(start, start + rowsPerPage);
  }, [filteredorders, page, rowsPerPage]);

  // Gestion de la recherche et de la pagination
  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(0); // Réinitialiser la pagination lors de la recherche
  };

  const handleShowDelete = (id) => {
    setcurrentOrderId(id);
    setShowDeleteModal(true);
  };


  const handleDelete = (id) => {
    setOrders(prevorders => prevorders.filter(order => order._id !== id));
    dispatch(deleteOrder(id));
    setShowDeleteModal(false);
  };

  const handleViewOrder = (id)=>{
    dispatch(getOrder(id))
    navigate(`/order-detail/${id}`)
  }

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(orders);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'orders');
    XLSX.writeFile(wb, 'orders.xlsx');
  };

  const handleStatusChange = (id, status) => {
    const dbStatus = reverseStatusMap[status];
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order._id === id ? { ...order, orderStatus: dbStatus } : order
      )
    );
    dispatch(updateStatusOrder(id, { orderStatus: dbStatus }));
  };

  // Calcul de la plage des entrées visibles
  const start = page * rowsPerPage + 1;
  const end = Math.min((page + 1) * rowsPerPage, filteredorders?.length);

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-500';
      case 'Processing':
        return 'bg-blue-500';
      case 'Shipped':
        return 'bg-purple-500';
      case 'Delivered':
        return 'bg-green-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    loading ? (
      <div className='px-3 md:px-8 flex items-center flex-col justify-center h-screen'>
        <LoadingLoader />
        <p className='text-xl text-gray-500 text-center mt-3'>patienté quelques minutes le temps que les données chargent</p>
      </div>
    ) : (
      <div className="w-full">
        <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
          <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Toutes les Commandes</h2>
          <h4 className='text-base'>
            <span className='text-gray-500 cursor-pointer'>Tableau de bord / </span>
            <span className='text-purple-700'>commandes</span>
          </h4>
        </div>
        <div className="flex justify-between mb-4 flex-wrap gap-3">
          <input
            value={search}
            className='px-3 py-2 text-gray-500 text-lg border border-gray-400 rounded-lg outline-none bg-transparent'
            placeholder="Recherche..."
            onChange={handleSearchChange}
          />
          <button
            className='px-3 py-2 rounded-md text-lg hover:bg-opacity-80 shadow-2xl text-white bg-blue-700'
            onClick={handleExport}
          >
            Exporter vers Excel
          </button>
        </div>
        <div className={`${theme === 'dark' ? 'bg-gray-700' : 'bg-white'} overflow-x-auto rounded-md shadow-2xl text-gray-500`}>
          <table className='w-1400px xl:w-full'>
            <thead>
              <tr>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>ID</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Client</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Nombre Total de produits</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Prix Total</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Coût de la livraison</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Status</th>
                <th className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 text-left py-4`}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedorders?.map((order, index) => (
                <tr key={order._id}>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>{start + index}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>{order.user.name}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>{formatNumberWithSeparators(order.totalProduct, ' ')}</td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>{formatNumberWithSeparators(removeTrailingZeros(order.totalPrice).toFixed(2), ' ')} €</td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>{formatNumberWithSeparators(removeTrailingZeros(order.total_details.amount_shipping).toFixed(2), ' ')} €</td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>
                    <select
                      className={`px-2 py-1 rounded-md ${getStatusColor(order.orderStatus)} text-white`}
                      value={statusMap[order.orderStatus]}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    >
                      {Object.values(statusMap).map(displayStatus => (
                        <option key={displayStatus} value={displayStatus}>
                          {displayStatus}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className={`border-r-0 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-200'} border-b px-4 py-5`}>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleShowDelete(order._id)}>
                      <span className='text-red-800'><RiDeleteBin6Line /></span>
                    </button>
                    <button className="bg-transparent px-2 py-1 m-1" onClick={() => handleViewOrder(order._id)}>
                      <span className='text-gray-500'><FaRegEye /></span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between mt-4 gap-2 flex-wrap">
          <select
            value={rowsPerPage}
            onChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
            className="border border-gray-300 p-2 rounded-md bg-gray-300 shadow-2xl"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
          <div>
            <span className="text-sm text-gray-700 font-semibold">
              Affichage de {start} à {end} sur {filteredorders?.length} entrées
            </span>
          </div>
          <div className='flex items-center justify-between text-white'>
            <button
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 mr-3 py-2"
              disabled={page === 0}
              onClick={() => setPage(page - 1)}
            >
              <span><IoChevronBackSharp /></span>Précédent
            </button>
            <button
              className="bg-blue-700 flex items-center justify-between rounded-md hover:bg-opacity-80 px-4 py-2"
              disabled={(page + 1) * rowsPerPage >= filteredorders?.length}
              onClick={() => setPage(page + 1)}
            >
              Suivant <span><IoChevronForwardSharp /></span>
            </button>
          </div>
        </div>

        <DeleteOrderModal
          show={showDeleteModal}
          currentOrderId={currentOrderId}
          onDelete={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      </div>
    )
  );
};

export default Orders;
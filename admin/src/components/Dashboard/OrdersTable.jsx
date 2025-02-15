import React from 'react';
import { removeTrailingZeros } from '../../utils/truncateText';

// Fonction pour obtenir la couleur de statut
const getStatusColor = (status) => {
  const statusColors = {
    'Pending': 'bg-yellow-500',
    'Processing': 'bg-blue-500',
    'Shipped': 'bg-purple-500',
    'Delivered': 'bg-green-500',
    'Cancelled': 'bg-red-500',
  };
  return statusColors[status] || 'bg-gray-500';
};

// Fonction pour obtenir la traduction du statut
const getStatusTranslation = (status) => {
  const statusTranslations = {
    'Pending': 'En attente',
    'Processing': 'Traitement',
    'Shipped': 'Expédié',
    'Delivered': 'Livré',
    'Cancelled': 'Annulé'
  };
  return statusTranslations[status] || status;
};

const OrdersTable = ({ orders }) => {
  return (
    <div className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Dernières Commandes
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">ID Commande</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Montant</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Statut</th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {orders?.map((order) => (
              <tr key={order._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">#{order._id.slice(-6)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{order.user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString('fr-FR')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{removeTrailingZeros(order.totalPrice).toLocaleString('fr-FR')} €</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.orderStatus)}`}>
                    {getStatusTranslation(order.orderStatus)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrdersTable;
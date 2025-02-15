import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { removeTrailingZeros } from '../../utils/truncateText';
import formatNumberWithSeparators from '../../utils/numberSeparator';

const CustomerActivity = ({ activityData }) => {
  // Formater les données pour correspondre au format attendu par le graphique
  const formattedData = activityData?.map((item) => ({
    customer: item.customer,
    orders: item.orders,
    totalSpent: removeTrailingZeros(item.totalSpent),
  }));

  return (
    <div className="mt-6 p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
        Activité des Clients
      </h2>
      <p className="text-base text-gray-700 dark:text-gray-300 mb-4">
        Nombre de commandes et montant total par client
      </p>
      <div className="mt-6 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={formattedData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="customer" stroke="#4A5568" />
            <YAxis stroke="#4A5568" />
            <Tooltip 
              contentStyle={{ backgroundColor: '#2D3748', borderColor: '#4A5568' }}
              labelStyle={{ color: '#E2E8F0' }}
              itemStyle={(value, name) => ({
                color: name === "Total Dépensé" ? "#10B981" : "#3B82F6", // Couleur dynamique
              })}
              formatter={(value, name) => name === "Total Dépensé" ? `${formatNumberWithSeparators(value.toFixed(2), ' ')} €` : `${value} Commandes`}
            />
            <Legend />
            <Bar dataKey="orders" fill="#3B82F6" name="Commandes" />
            <Bar dataKey="totalSpent" fill="#10B981" name="Total Dépensé" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CustomerActivity;
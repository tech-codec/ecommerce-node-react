import React from 'react';
import { Card, Title, DonutChart, Legend } from '@tremor/react';

const CustomerStats = ({ customerData }) => {
  return (
    <Card className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white">Répartition des Clients</Title>
      <div className="mt-6">
        <DonutChart
          data={customerData}
          category="value"
          index="name"
          colors={["indigo", "cyan", "orange"]}
        />
      </div>
      <div className="mt-3 flex justify-center space-x-4">
        {customerData?.map((item, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={`h-4 w-4 rounded-full ${index === 0 ? 'bg-indigo-500' : index === 1 ? 'bg-cyan-500' : 'bg-orange-500'}`}></div>
            <div className="text-gray-900 dark:text-white">{item.name}: {item.value}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CustomerStats;
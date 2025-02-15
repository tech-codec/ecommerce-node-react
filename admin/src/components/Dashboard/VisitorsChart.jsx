import React from 'react';
import { Card, Title } from '@tremor/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VisitorsChart = ({ visitorsData }) => {
  return (
    <Card className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white">Trafic du Site</Title>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={visitorsData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('fr-FR')} />
          <YAxis />
          <Tooltip formatter={(value) => new Intl.NumberFormat('fr-FR').format(value)} />
          <Legend />
          <Line type="monotone" dataKey="visitors" stroke="#8884d8" name="Visiteurs" />
          <Line type="monotone" dataKey="pageViews" stroke="#82ca9d" name="Pages vues" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default VisitorsChart;
import React from 'react';
import { Card, Title } from '@tremor/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { removeTrailingZeros } from '../../utils/truncateText';

const SalesChart = ({ salesData }) => {
  const formattedData = salesData?.map(item => ({
    revenue: removeTrailingZeros(item.revenue),
    date: format(new Date(item.date), 'dd MMM', { locale: fr }),
  }));

  return (
    <Card className="mt-6 p-4 shadow-lg rounded-lg bg-white dark:bg-gray-800">
      <Title className="text-xl font-semibold text-gray-900 dark:text-white">Évolution des Ventes</Title>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip 
            formatter={(value) => new Intl.NumberFormat('fr-FR', {
              style: 'currency',
              currency: 'EUR'
            }).format(value)}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#6366f1"
            fillOpacity={1}
            fill="url(#colorRevenue)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesChart;
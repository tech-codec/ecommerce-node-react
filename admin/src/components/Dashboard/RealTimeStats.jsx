import React, { useState, useEffect } from 'react';
import { Card, Text, Metric } from '@tremor/react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRealTime } from '../../actions/dashBoardAction/dashboard.action';

const RealTimeStats = () => {
  const dispatch = useDispatch();
  const dashboardState = useSelector(state => state.dashboard);
  const { statistic } = dashboardState;
  const [stats, setStats] = useState(statistic);

  useEffect(() => {
    const fetchRealTimeStats = async () => {
      dispatch(getAllRealTime());
    };

    fetchRealTimeStats();
    const interval = setInterval(fetchRealTimeStats, 60000);

    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setStats(statistic);
  }, [statistic]);

  const StatCard = ({ title, value, trend, trendValue, Icon, color, footer }) => (
    <Card className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8">
        <div className={`absolute inset-0 bg-${color}-500 opacity-10 rounded-full`}></div>
      </div>
      <div className="relative p-6 z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`flex-shrink-0 p-3 bg-${color}-100 dark:bg-${color}-900 rounded-2xl`}>
            <Icon className={`w-8 h-8 text-${color}-600 dark:text-${color}-300`} />
          </div>
          <div className={`flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
            trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} dark:bg-opacity-20`}>
            {trend === 'up' ? <ArrowTrendingUpIcon className="w-4 h-4 mr-1" /> : <ArrowTrendingDownIcon className="w-4 h-4 mr-1" />}
            {trendValue}
          </div>
        </div>
        <Text className="text-slate-600 dark:text-gray-400 font-medium mb-2">{title}</Text>
        <Metric className="text-3xl font-bold text-slate-900 dark:text-white">{value}</Metric>
        {footer && (
          <div className="mt-4">
            <Text className="text-sm text-slate-500 dark:text-gray-500">{footer}</Text>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
      <StatCard
        title="Ventes du jour"
        value={`${stats.revenue.toLocaleString('fr-FR')} €`}
        trend={stats.revenueGrowth >= 0 ? 'up' : 'down'}
        trendValue={`${Math.abs(stats.revenueGrowth)}%`}
        Icon={ArrowTrendingUpIcon}
        color="indigo"
        footer="vs mois dernier"
      />

      <StatCard
        title="Commandes du jour"
        value={stats.orders}
        trend="up"
        trendValue={`${stats.orderCompletionRate}%`}
        Icon={CheckCircleIcon}
        color="emerald"
        footer="Taux de complétion"
      />

      <StatCard
        title="Nouveaux clients"
        value={stats.newCustomers}
        trend={stats.customerGrowth >= 0 ? 'up' : 'down'}
        trendValue={`${Math.abs(stats.customerGrowth)}%`}
        Icon={ArrowTrendingUpIcon}
        color="blue"
        footer="de croissance"
      />

      <StatCard
        title="Produits en rupture"
        value={stats.lowStock}
        trend={stats.lowStock > 10 ? 'down' : 'up'}
        trendValue={stats.lowStock > 10 ? 'Stock critique' : 'Stock normal'}
        Icon={ExclamationCircleIcon}
        color="amber"
        footer="Produits à réapprovisionner"
      />
    </div>
  );
};

export default RealTimeStats;
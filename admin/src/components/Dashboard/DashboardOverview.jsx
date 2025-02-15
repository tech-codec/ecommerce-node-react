import React from 'react';
import { Card, Text, Metric } from '@tremor/react';
import { CurrencyEuroIcon, ShoppingCartIcon, UsersIcon, ChartBarIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';
import formatNumberWithSeparators from '../../utils/numberSeparator';
import { removeTrailingZeros } from '../../utils/truncateText';

const DashboardOverview = ({ stats }) => {
  const cardClass = "relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300";
  const iconBackgroundClass = "absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8";
  const iconWrapperClass = "flex-shrink-0 p-3 rounded-2xl";
  const textClass = "text-slate-600 dark:text-gray-400 font-medium mb-2";
  const metricClass = "text-3xl font-bold text-slate-900 dark:text-white";
  const growthClass = "flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 1400m:grid-cols-4 1600m:grid-cols-5 gap-6">
      {/* Chiffre d'affaires */}
      <Card className={cardClass}>
        <div className={iconBackgroundClass}>
          <div className="absolute inset-0 bg-indigo-500 opacity-10 rounded-full"></div>
        </div>
        <div className="relative p-6 z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${iconWrapperClass} bg-indigo-100 dark:bg-indigo-900`}>
              <CurrencyEuroIcon className="w-8 h-8 text-indigo-600 dark:text-indigo-300" />
            </div>
            <div className={`${growthClass} ${stats?.revenueGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} dark:bg-opacity-20`}>
              {stats?.revenueGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats?.revenueGrowth)}%
            </div>
          </div>
          <Text className={textClass}>Ventes du jour</Text>
          <Metric className={metricClass}>
            {formatNumberWithSeparators(removeTrailingZeros(stats?.revenue).toFixed(2), ' ')} €
          </Metric>
          <Text className="mt-4 text-sm text-slate-500 dark:text-gray-500">vs mois dernier</Text>
        </div>
      </Card>

      {/* Commandes */}
      <Card className={cardClass}>
        <div className={iconBackgroundClass}>
          <div className="absolute inset-0 bg-emerald-500 opacity-10 rounded-full"></div>
        </div>
        <div className="relative p-6 z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${iconWrapperClass} bg-emerald-100 dark:bg-emerald-900`}>
              <ShoppingCartIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-300" />
            </div>
            <div className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 dark:bg-opacity-20">
              {stats?.orderCompletionRate}% complétées
            </div>
          </div>
          <Text className={textClass}>Commandes du jour</Text>
          <Metric className={metricClass}>{stats?.orders}</Metric>
          <div className="mt-4">
            <div className="w-full h-2 bg-emerald-100 dark:bg-emerald-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${stats?.orderCompletionRate}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Clients */}
      <Card className={cardClass}>
        <div className={iconBackgroundClass}>
          <div className="absolute inset-0 bg-blue-500 opacity-10 rounded-full"></div>
        </div>
        <div className="relative p-6 z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${iconWrapperClass} bg-blue-100 dark:bg-blue-900`}>
              <UsersIcon className="w-8 h-8 text-blue-600 dark:text-blue-300" />
            </div>
            <div className={`${growthClass} ${stats?.customerGrowth >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} dark:bg-opacity-20`}>
              {stats?.customerGrowth >= 0 ? '↑' : '↓'} {Math.abs(stats?.customerGrowth)}%
            </div>
          </div>
          <Text className={textClass}>Nouveaux Clients</Text>
          <Metric className={metricClass}>{stats?.newCustomers}</Metric>
          <Text className="mt-4 text-sm text-slate-500 dark:text-gray-500">de croissance</Text>
        </div>
      </Card>

      {/* Taux de conversion */}
      <Card className={cardClass}>
        <div className={iconBackgroundClass}>
          <div className="absolute inset-0 bg-amber-500 opacity-10 rounded-full"></div>
        </div>
        <div className="relative p-6 z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${iconWrapperClass} bg-amber-100 dark:bg-amber-900`}>
              <ChartBarIcon className="w-8 h-8 text-amber-600 dark:text-amber-300" />
            </div>
            <div className="flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 dark:bg-opacity-20">
              Objectif: 10%
            </div>
          </div>
          <Text className={textClass}>Taux de Conversion</Text>
          <Metric className={metricClass}>{stats?.conversionRate == null?0:stats?.conversionRate}%</Metric>
          <div className="mt-4">
            <div className="w-full h-2 bg-amber-100 dark:bg-amber-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${stats?.conversionRate * 10}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Produits en rupture */}
      <Card className={cardClass}>
        <div className={iconBackgroundClass}>
          <div className="absolute inset-0 bg-amber-500 opacity-10 rounded-full"></div>
        </div>
        <div className="relative p-6 z-10">
          <div className="flex items-center space-x-4 mb-4">
            <div className={`${iconWrapperClass} bg-amber-100 dark:bg-amber-900`}>
              <ExclamationCircleIcon className="w-8 h-8 text-amber-600 dark:text-amber-300" />
            </div>
            <div className={`${growthClass} ${stats?.lowStock > 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} dark:bg-opacity-20`}>
              {stats?.lowStock > 10 ? '↓' : '↑'} {stats?.lowStock > 10 ? 'Stock critique' : 'Stock normal'}
            </div>
          </div>
          <Text className={textClass}>Produits en rupture</Text>
          <Metric className={metricClass}>{stats?.lowStock}</Metric>
          <Text className="mt-4 text-sm text-slate-500 dark:text-gray-500">Produits à réapprovisionner</Text>
        </div>
      </Card>
    </div>
  );
};

export default DashboardOverview;
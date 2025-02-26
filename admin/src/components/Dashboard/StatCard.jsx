import React from 'react';
import { Card, Text, Metric } from '@tremor/react';

const StatCard = ({ title, value, trend, trendValue, Icon, color, footer }) => {
  const cardClass = "relative overflow-hidden bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300";
  const iconBackgroundClass = "absolute top-0 right-0 w-32 h-32 transform translate-x-8 -translate-y-8";
  const iconWrapperClass = "flex-shrink-0 p-3 rounded-2xl";
  const textClass = "text-slate-600 dark:text-gray-400 font-medium mb-2";
  const metricClass = "text-3xl font-bold text-slate-900 dark:text-white";
  const growthClass = "flex items-center px-3 py-1 rounded-full text-xs font-semibold";

  return (
    <Card className={cardClass}>
      <div className={iconBackgroundClass}>
        <div className={`absolute inset-0 bg-${color}-500 opacity-10 rounded-full`}></div>
      </div>
      <div className="relative p-6 z-10">
        <div className="flex items-center space-x-4 mb-4">
          <div className={`${iconWrapperClass} bg-${color}-100 dark:bg-${color}-900`}>
            <Icon className={`w-8 h-8 text-${color}-600 dark:text-${color}-300`} />
          </div>
          <div className={`${growthClass} ${trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} dark:bg-opacity-20`}>
            {trend === 'up' ? '↑' : '↓'} {trendValue}
          </div>
        </div>
        <Text className={textClass}>{title}</Text>
        <Metric className={metricClass}>{value}</Metric>
        {footer && (
          <Text className="mt-4 text-sm text-slate-500 dark:text-gray-500">{footer}</Text>
        )}
      </div>
    </Card>
  );
};

export default StatCard;
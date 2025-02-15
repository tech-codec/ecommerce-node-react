import React, { useState, useEffect } from 'react';
import DashboardOverview from './DashboardOverview';
import SalesChart from './SalesChart';
import CustomerActivity from './CustomerActivity';
import VisitorsChart from './VisitorsChart';
import RealTimeStats from './RealTimeStats';
import ExportData from './ExportData';
import StockAlert from './StockAlert';
import TopProducts from './TopProducts';

const Dashboard = () => {
  const [stats, setStats] = useState({});
  const [salesData, setSalesData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [visitorsData, setVisitorsData] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all necessary data for the dashboard
    const fetchData = async () => {
      const statsResponse = await fetch('/api/dashboard/real-time');
      const statsData = await statsResponse.json();
      setStats(statsData);

      const salesResponse = await fetch('/api/dashboard/visitors');
      const salesData = await salesResponse.json();
      setSalesData(salesData);

      const activityResponse = await fetch('/api/dashboard/customer-activity');
      const activityData = await activityResponse.json();
      setActivityData(activityData);

      const visitorsResponse = await fetch('/api/dashboard/visitors');
      const visitorsData = await visitorsResponse.json();
      setVisitorsData(visitorsData);

      const productsResponse = await fetch('/api/dashboard/recent-orders');
      const productsData = await productsResponse.json();
      setProducts(productsData);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Tableau de Bord Administratif</h1>
      <DashboardOverview stats={stats} />
      <SalesChart salesData={salesData} />
      <RealTimeStats />
      <CustomerActivity activityData={activityData} />
      <VisitorsChart visitorsData={visitorsData} />
      <StockAlert products={products} />
      <TopProducts products={products} />
      <ExportData />
    </div>
  );
};

export default Dashboard;
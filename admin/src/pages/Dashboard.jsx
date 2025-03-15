import { useState, useEffect } from 'react';
import { TabGroup, Tab, TabList, TabPanels, TabPanel } from '@tremor/react';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import SalesChart from '../components/Dashboard/SalesChart';
import CustomerActivity from '../components/Dashboard/CustomerActivity';
import TopProducts from '../components/Dashboard/TopProducts';
import OrdersTable from '../components/Dashboard/OrdersTable';
import VisitorsChart from '../components/Dashboard/VisitorsChart';
import CustomerStats from '../components/Dashboard/CustomerStats';
import StockAlert from '../components/Dashboard/StockAlert';
import ExportData from '../components/Dashboard/ExportData';
import { useTheme } from '../context/ThemeContext';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCustomerActivity, getAllCustomerStats, getAllLowStock, getAllRealTime, getAllRecentOrders, getAllSales, getAllTopProducts, getAllVisitors } from '../actions/dashBoardAction/dashboard.action';

const Dashboard = () => {
  const dispatch = useDispatch()
  const dashboardState = useSelector(state => state.dashboard)
  const {lowStockProducts, topProducts, customerActivity, customerStats, recentOrders, salesData, visitorsData, statistic} = dashboardState
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState(0);
 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Récupérer les statistiques en temps réel
        dispatch(getAllRealTime())

        // Récupérer les données de vente
        dispatch(getAllSales())

        // Récupérer l'activité des clients
        dispatch(getAllCustomerActivity())
        
        // Récupérer les produits les plus vendus
        dispatch(getAllTopProducts())

        // Récupérer les commandes récentes
        dispatch(getAllRecentOrders())

        // Récupérer les données de visiteurs
        dispatch(getAllVisitors())
        // Récupérer les statistiques clients
        dispatch(getAllCustomerStats())
        
        // Récupérer les produits en rupture de stock
        dispatch(getAllLowStock())
        
      } catch (error) {
        
      }
    };

    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 300000); // Rafraîchir toutes les 5 minutes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full p-4 lg:p-8">
      <div className='mb-8 flex items-center justify-between flex-wrap gap-2'>
        <h2 className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Tableau de Bord Administratif</h2>
        <h4 className='text-base'>
          <span className='text-purple-700 cursor-pointer'>Tableau de bord / </span>
        </h4>
      </div>

      <DashboardOverview stats={statistic} />

      <TabGroup index={activeTab} onIndexChange={setActiveTab}>
        <TabList className="flex gap-3 mt-5 overflow-x-auto border-b-2 border-gray-200 dark:border-gray-700">
          {['Ventes', 'Clients', 'Produits', 'Analyses'].map((tab, index) => (
            <Tab
              key={index}
              className={`p-2 text-gray-600 dark:text-gray-300 focus:outline-none ${activeTab === index ? 'border-b-2 border-purple-700 text-purple-700' : ''}`}
            >
              {tab}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          {/* Panel Ventes */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <SalesChart salesData={salesData} />
              <OrdersTable orders={recentOrders} />
            </div>
          </TabPanel>

          {/* Panel Clients */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <CustomerActivity activityData={customerActivity} />
              <CustomerStats customerData={customerStats} />
            </div>
          </TabPanel>

          {/* Panel Produits */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <TopProducts products={topProducts} />
              <StockAlert products={lowStockProducts} />
            </div>
          </TabPanel>

          {/* Panel Analyses */}
          <TabPanel>
            <div className="mt-6 space-y-6">
              <VisitorsChart visitorsData={visitorsData} />
              <ExportData />
            </div>
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
};

export default Dashboard;
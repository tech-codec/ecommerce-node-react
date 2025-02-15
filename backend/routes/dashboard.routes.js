const express = require('express');
const {
  getVisitors,
  getCustomerActivity,
  getRecentOrders,
  getRealTimeStats,
  exportData,
  getSales,
  getTopProducts,
  getCustomerStats,
  getLowStock
} = require('../controllers/dashboard.controller');
const { verifyToken, isAdminAndEmployer } = require('../milddleware/auth');
const recordVisit = require('../milddleware/recordVisit');

const router = express.Router();

// Utilisez le middleware pour enregistrer les visites
router.use(recordVisit)
router.get('/visitors',verifyToken, isAdminAndEmployer, getVisitors);
router.get('/sales' ,verifyToken, isAdminAndEmployer,getSales)
router.get('/top-products', verifyToken, isAdminAndEmployer, getTopProducts);
router.get('/low-stock', verifyToken, isAdminAndEmployer, getLowStock);
router.get('/customer-stats', verifyToken, isAdminAndEmployer, getCustomerStats)
router.get('/customer-activity',verifyToken, isAdminAndEmployer, getCustomerActivity);
router.get('/recent-orders',verifyToken, isAdminAndEmployer, getRecentOrders);
router.get('/real-time',verifyToken, isAdminAndEmployer, getRealTimeStats);
router.get('/export/:type', exportData);

module.exports = router;
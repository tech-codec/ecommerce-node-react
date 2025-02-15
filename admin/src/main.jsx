import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { getAllRoles } from './actions/roleAction/role.action.js'
import { loadUser } from './actions/authAction/auth.action.js'
import { getAllUsers } from './actions/userAction/user.action.js'
import { getAllCategories } from './actions/categoryAction/category.action.js'
import { getAllProducts } from './actions/productAction/product.action.js'
import { IntlProvider } from 'react-intl';
import { getAllOrders } from './actions/orderAction/order.action.js'
import { getAllCustomerActivity, getAllCustomerStats, getAllLowStock, getAllRealTime, getAllRecentOrders, getAllSales, getAllTopProducts, getAllVisitors } from './actions/dashBoardAction/dashboard.action.js'

store.dispatch(getAllRoles())
store.dispatch(loadUser())
store.dispatch(getAllUsers())
store.dispatch(getAllCategories())
store.dispatch(getAllProducts())
store.dispatch(getAllOrders())
store.dispatch(getAllLowStock())
store.dispatch(getAllTopProducts())
store.dispatch(getAllCustomerActivity())
store.dispatch(getAllCustomerStats())
store.dispatch(getAllRecentOrders())
store.dispatch(getAllSales())
store.dispatch(getAllVisitors())
store.dispatch(getAllRealTime())

const messages = {
  'en': {
    // vos messages de traduction ici
  },
  'fr': {
    // vos messages de traduction ici
  },
};

const language = navigator.language.split(/[-_]/)[0]; // détecter la langue du navigateur

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <IntlProvider locale={language} messages={messages[language]}>
        <App />
      </IntlProvider>
    </Provider>
  </StrictMode>
)

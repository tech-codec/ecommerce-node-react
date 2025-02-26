import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FilterProvider } from './context/FilterContext.jsx';
import { CartProvider } from './context/CartContext.jsx';


import {Provider} from 'react-redux'
import store from './store/store.js';
import { loadUser } from './actions/authAction/auth.action.js';
import { getAllCategories } from './actions/categoryAction/category.action.js';
import { getAllProducts } from './actions/productAction/product.action.js';
import { SearchProvider } from './context/SearchContext.jsx';
import { DashboardProvider } from './context/DashboradContext.jsx';

store.dispatch(loadUser())
store.dispatch(getAllCategories())
store.dispatch(getAllProducts())

//console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <FilterProvider>
        <CartProvider>
          <SearchProvider>
            <DashboardProvider>
              <App />
            </DashboardProvider>
          </SearchProvider>
        </CartProvider>
      </FilterProvider>
    </Provider>
  </StrictMode>
)

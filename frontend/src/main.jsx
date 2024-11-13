import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite';
// Import TWE and the initTE function
import { Tooltip, initTWE } from "tw-elements";
import { ProductAndCategoryProvider } from './context/ProductAndCategoryContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';
import { CartProvider } from './context/CartContext.jsx';

import {Provider} from 'react-redux'
import store from './store/store.js';
import { loadUser } from './actions/authAction/auth.action.js';

store.dispatch(loadUser())

initTWE({ Tooltip });

//console.log(store.getState())

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <FilterProvider>
        <CartProvider>
          <ProductAndCategoryProvider>
            <App />
          </ProductAndCategoryProvider>
        </CartProvider>
      </FilterProvider>
    </Provider>
  </StrictMode>
)

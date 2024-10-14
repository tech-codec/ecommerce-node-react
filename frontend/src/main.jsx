import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite';
// Import TWE and the initTE function
import { Tooltip, initTWE } from "tw-elements";
import { ProductAndCategoryProvider } from './context/ProductAndCategoryContext.jsx';
import { FilterProvider } from './context/FilterContext.jsx';



initTWE({ Tooltip });



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilterProvider>
      <ProductAndCategoryProvider>
        <App />
      </ProductAndCategoryProvider>
    </FilterProvider>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'flowbite';
// Import TWE and the initTE function
import { Tooltip, initTWE } from "tw-elements";


initTWE({ Tooltip });


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

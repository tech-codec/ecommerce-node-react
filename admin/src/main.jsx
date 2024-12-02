import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from 'react-redux'
import store from './store/store.js'
import { getAllRole } from './actions/roleAction/role.action.js'
import { loadUser } from './actions/authAction/auth.action.js'

store.dispatch(getAllRole())
store.dispatch(loadUser())

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

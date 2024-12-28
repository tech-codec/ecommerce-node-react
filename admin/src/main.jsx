import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { getAllRole } from './actions/roleAction/role.action.js'
import { loadUser } from './actions/authAction/auth.action.js'
import { getAllUser } from './actions/userAction/user.action.js'
import { getAllCategories } from './actions/categoryAction/category.action.js'
import { getAllProducts } from './actions/productAction/product.action.js'
import { IntlProvider } from 'react-intl';

store.dispatch(getAllRole())
store.dispatch(loadUser())
store.dispatch(getAllUser())
store.dispatch(getAllCategories())
store.dispatch(getAllProducts())

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

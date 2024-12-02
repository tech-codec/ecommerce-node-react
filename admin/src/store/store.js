import { configureStore } from '@reduxjs/toolkit';
import {thunk} from 'redux-thunk';
//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';
//devTools: import.meta.env.NODE_ENV !== 'production',
const middleware = [thunk];

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(middleware),
  devTools: import.meta.env.NODE_ENV !== 'production'
});

export default store;
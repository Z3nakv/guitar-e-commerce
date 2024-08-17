import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {Toaster} from 'react-hot-toast';
import { MainDataProvider } from './Context/MainFetchContext.jsx';
import { FilterDataProvider } from './Context/FilterRequestContext.jsx';
import { CartDataProvider } from './Context/CartContext.jsx';
import {BrowserRouter} from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <MainDataProvider>
    <FilterDataProvider>
      <CartDataProvider>
    
          <BrowserRouter>
            <App />
          </BrowserRouter>
        
        <Toaster />
      </CartDataProvider>
    </FilterDataProvider>
  </MainDataProvider>,
)

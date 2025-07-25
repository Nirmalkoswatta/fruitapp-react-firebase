import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './store/CartContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <BrowserRouter>
        <ToastContainer position="top-right" autoClose={2500} />
        <App />
      </BrowserRouter>
    </CartProvider>
  </StrictMode>,
)

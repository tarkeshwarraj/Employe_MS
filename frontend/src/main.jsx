import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StoreProvider } from './StoreContext/StoreContext.jsx';
import { BrowserRouter } from "react-router-dom";
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <StrictMode>
    <StoreProvider>
    <App />
    </StoreProvider>
  </StrictMode>
  </BrowserRouter>
)

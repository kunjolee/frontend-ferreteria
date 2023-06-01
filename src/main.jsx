import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { CartProvider, ModalProvider } from './context/';
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ModalProvider>
        <CartProvider>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </CartProvider>
    </ModalProvider>
);

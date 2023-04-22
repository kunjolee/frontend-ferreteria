import React from 'react';
import ReactDOM from 'react-dom/client';
import { ModalProvider } from './context/ModalContext.jsx';
import { App } from './App';

import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <ModalProvider>
        <App />
    </ModalProvider>
);

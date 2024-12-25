import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ConversationProvider } from './context/ConversationContext';
import { SocketContextProvider } from './context/SocketContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <AuthProvider>
        <ConversationProvider>
            <SocketContextProvider>
                <App />
            </SocketContextProvider>
        </ConversationProvider>
    </AuthProvider>
);

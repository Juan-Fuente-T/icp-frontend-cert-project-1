import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import NavBar from "./components/NavBar";
import './main.css'
import "./index.scss";
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <NavBar/>
        <App />
      </CartProvider>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

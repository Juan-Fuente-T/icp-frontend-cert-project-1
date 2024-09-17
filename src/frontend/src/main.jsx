import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.scss";
import { AuthProvider } from './context/AuthContext';
import './main.css'
import { BrowserRouter } from "react-router-dom";

import NavBar from "./components/NavBar";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
      <NavBar/>
      <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

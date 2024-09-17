import LoginButton from "./components/auth/LoginButton";
import LogoutButton from "./components/auth/LogoutButton";
import ProductsGrid from "./components/ProductsGrid";
import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { createActor } from '../../declarations/backend';
import { Card, CardContent, CardMedia, Typography, Button, Link } from '@mui/material';
import './App.css';
import Cart from "./components/Cart";
// import NavBar from "./components/Navbar";
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function App() {
  const { isAuthenticated, identity } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);
  const [productsInCart, setProductsInCart] = useState([]);
  console.log("isAuthenticated", isAuthenticated);

  let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  })

  // useEffect(() => {
  //   getAllProducts();
  // }, []);

  // async function getAllProducts() {
  //   try {
  //     const result = await backend.getProducts();
  //     console.log(result);
  //     if (result) {
  //       setAllProducts(result);
  //       console.log("allProducts", allProducts);
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // }

  const handleAddToCart = async (productId, quantity) => {
    // e.preventDefault();
    try {
      console.log("Params addToCart:", productId, quantity);
      const result = await backend.addToCart(productId, quantity);
      console.log("RESULT:", result);
      if ("ok" in result) {
        // productsInCart.push(productId);
        // setProductsInCart(productsInCart);
        setProductsInCart(prev => [...prev, productId]);
        console.log("result addToCart", result);
        console.log("productsInCart", productsInCart);
        alert("Se ha añadido el producto al carrito")
        const result2 = await backend.getCart();
        if ("ok" in result) {
          console.log("result2 addToCart", result2);
        }
      }
    } catch (err) {
      console.error(err);
      alert("No se ha podido añadir el producto")
    }
  };

  return (
    <div className="flex container mx-auto px-4 border-2 border-red-600">
      <header className="py-4">
        <div>
          <h2 className="text-2xl font-bold">
            <Link to="/" className="text-black no-underline">Products</Link>
          </h2>
        </div>
        <div>
          {isAuthenticated ? <LogoutButton /> : <LoginButton />}
          {productsInCart ? <Link to="/cart" className="text-black no-underline">
            <div className="relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {productsInCart.length}
                </span>
            </div>
          </Link> : ""}
        </div>
      </header>
      <main className="p-4 border-2 border-red-600">
        <Typography variant="h4" component="h1" className="text-center mb-6">
          Our Products
        </Typography>
        <Routes>
          <Route path="/" element={<ProductsGrid onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart productsInCart={productsInCart} />} />
          {/* <Route path="/contacto" element={<div>Contacto</div>} /> */}
        </Routes>
      </main>
    </div>
  );
}

export default App;

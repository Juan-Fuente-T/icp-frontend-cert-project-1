import LoginButton from "./components/auth/LoginButton";
import AuthModal from "./components/AuthModal";
import OpenChatFrame from "./components/OpenChatFrame";
import ProductsGrid from "./components/ProductsGrid";
import React, { useState, useContext, useEffect} from 'react';
import { Routes, Route } from "react-router-dom";
import { AuthContext } from './context/AuthContext';
import { useCart } from './context/CartContext';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToCart } = useCart();

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

  const handleAddToCart = async (productId) => {
    // e.preventDefault();
    try {
      console.log("ProductId addToCart:", productId);
      const result = await addToCart(productId);
      console.log("RESULT:", result);
      if (result.success) {
        // productsInCart.push(productId);
        // setProductsInCart(productsInCart);
        setProductsInCart(prev => [...prev, productId]);
        console.log("result addToCart", result);
        console.log("productsInCart", productsInCart);
        alert("Se ha añadido el producto al carrito")
        setIsModalOpen(true);
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
    <div className="flex flex-col container items-center my-4 mx-auto px-4 w-full">
      <header className="py-4 w-full">
        <div className="flex p-4 justify-center font-bold">
          <h1 className="w-1/3 text-center py-2 mb-6 bg-stone-100 rounded-md">
          Tienda
          </h1>
        </div> 
      </header>
      <main className=" p-4 w-full justify-center w-full">
        <Routes>
          <Route path="/" element={<ProductsGrid onAddToCart={handleAddToCart} />} />
          <Route path="/cart" element={<Cart productsInCart={productsInCart} />} />
          {/* <Route path="/contacto" element={<div>Contacto</div>} /> */}
        </Routes>
        <AuthModal/>
        <OpenChatFrame/>
        {/* <AddProductModal isOpen={isModalOpen} productName={product.name} quantity={quantity} onRequestClose={() => setIsModalOpen(false)} /> */}
      </main>
    </div>
  );
}

export default App;

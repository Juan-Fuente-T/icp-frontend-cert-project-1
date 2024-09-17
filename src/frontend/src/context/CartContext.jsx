// src/context/CartContext.js

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createActor } from '../../../declarations/backend';
import { AuthContext } from './AuthContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const { isAuthenticated, identity } = useContext(AuthContext);

  let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      const result = await backend.getCart();
      if ("ok" in result) {
        // const cartItems = result.ok;
        // const productIdsInCart = cartItems.map(item => item.product.id);
        setProductsInCart(result.ok);
      }
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  };
  const addToCart = async (productId) => {
    try {
      const result = await backend.addToCart(productId, 1);
      if ("ok" in result) {
        loadCart(); // Actualiza el estado local después de agregar un producto
        return {
          success: true,
          message: "Product added successfully",
          productId: productId
        };
      }
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message || "An unknown error occurred",
        productId: null,
        quantity: null
      };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const result = await backend.removeFromCart(productId);
      if ("ok" in result) {
        loadCart(); // Actualiza el estado local después de eliminar un producto
        return {
          success: true,
          message: "Product removed successfully",
          productId: productId
        };
      }
    } catch (err) {
      console.error(err);
      return {
        success: false,
        message: err.message || "An unknown error occurred",
        productId: null
      };
    }
  };

  return (
    <CartContext.Provider value={{ productsInCart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

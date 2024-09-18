import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from '../context/AuthContext';
import CartItems from './CartItems';
import CartItem from './CartItem';
import { createActor } from '../../../declarations/backend';
import { useContext } from "react";
import { useCart } from '../context/CartContext';

// src/declarations
// src/frontend/src/components/Cart.jsx
// function Cart(productsInCart) {
  export default function Cart({ productsInCart }) {
    const { isAuthenticated, identity } = useContext(AuthContext);
    // const [productsInCart, setProductsInCart] = useState([]);
    const [ , setProductsInCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cartItems, setCartItems] = useState([]);
    const { removeFromCart } = useCart();

    let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

    let backend = createActor(canisterId, {
    agentOptions: {
        identity: identity,
        host: "http://localhost:4943",
    },
    })
    useEffect(() => {
      setLoading(true);
      async function getCart() {
        try {
          const result = await backend.getCart();
          if ("ok" in result) {
            console.log("RESULT Cart: ", result.ok);
            setCartItems(result.ok);
            setProductsInCart(result.ok);
            // Aquí puedes actualizar el estado global si es necesario
          }
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      }
        getCart();
        console.log("cartItems", cartItems);
        console.log("Products IN CART", productsInCart);
    }, []);


    const handleRemove = async (productId) => {
      try {
        console.log("Product", productId);
        // const result = await backend.removeFromCart(productId);
        const result = await removeFromCart(productId);
        if (result.success) {
          alert("Se ha eliminado el producto del carrito");
           // Actualizar el estado local
          setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
        }
      } catch (err) {
        console.error("Error eliminando el producto:", err);
      }
    };


  
  const handleQuantity = async (productId, newQuantity) => {
    if (newQuantity === 0) {
      await handleRemove(productId);
    } else {
      try {
        await backend.updateQuantity(productId, newQuantity);
        // Actualizar el estado local
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.product.id === productId ? { ...item, quantity: newQuantity } : item
          )
        );
      } catch (err) {
        console.error("Error updating quantity:", err);
      }
    }
  };


  const handlePurchase = async () => {
    try {
      if (window.confirm("¿Estás seguro de que quieres realizar esta compra?")) {
        // for(i=0; i<cartItems.length; i++){
          //   handleQuantity(cartItems[i].product.id, 0)
          // }
          for (let item of cartItems) {
            await handleQuantity(item.product.id, 0);
          }
          alert("Has realizado la compra con éxito");
        }
    } catch (err) {
      console.error("Error durante la compra:", err);
      alert("Hubo un error al procesar la compra. Por favor, intenta de nuevo.");
    }
  };
    console.log("productsInCart Cart", productsInCart);
    return (
      <div>
        <header>
          <div className="flex justify-center">
          <h2 className="w-1/3 text-center py-2 mb-6 bg-stone-100 rounded-md">Carrito</h2>
          </div>
          <h2 className="p-2 px-4 mb-4 w-fit bg-stone-200 rounded-md font-bold">Productos</h2>
        </header>
        <main className="p-4 bg-stone-100 rounded-lg w-4/5 2xl:w-5/6">
          {loading ? (
            <div>
              <p>Cargando carrito...</p>
            </div>
          ) : 
          cartItems && Array.isArray(cartItems) ? (
            // <React.Fragment>
            <>
            <div >

            </div>
              {/* <CartItem cartItems={cartItems}/>  */}
              {/* <div>
              <p>productsInCart: {productsInCart.quantity}</p>
              <p>cartItems: {cartItems?.product?.name}</p>
            </div> */}

              {/* <h2 className="text-xl font-semibold mb-4">Carrito de compras</h2> */}
              <ul>
                {cartItems.map((item, index) => (
                  // <li key={index} className="mb-2">
                  //   {item.product.name} x {Number(item.quantity)} = ${item.product.price * Number(item.quantity)}
                  // </li>
                <CartItem
                  key={index}
                  product={item.product}
                  quantity={Number(item.quantity)}
                  onRemove={() => handleRemove(item.product.id)}
                  onChangeQuantity={(newQuantity) => handleQuantity(item.product.id, newQuantity)}
                />
            
                ))}
              </ul>
              <p className="p-2 px-4 mt-4 w-fit bg-stone-200 rounded-md font-bold">Total: ${cartItems.reduce((total, item) => total + item.product.price * Number(item.quantity), 0)}</p>
              <div className="flex justify-end">
                <button onClick={handlePurchase} className="px-2 py-1 bg-orange-400 text-stone-800 rounded hover:scale-105">Comprar</button> 
                </div>
            {/* </React.Fragment> */}
            </>
          ) : (
            <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
          )}
        </main>
      </div>
    );
  }
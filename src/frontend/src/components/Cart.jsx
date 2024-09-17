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

    // return(
    //         <div>
    //     <header>
    //       <h2>Cart</h2>
    //     {/* <div>
    //       <h2 className="text-2xl font-bold">
    //         <Link to="/" className="text-black no-underline">ProductsXX</Link>
    //       </h2>
    //     </div>
    //     <div>
    //     {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    //     </div> */}
    //     </header>
    //     <main>

    //     <h2 className="text-xl font-semibold mb-4">Shopping cart</h2>
    //     {_productsInCart ? (
    //     <ul>
    //         {_productsInCart.map((item, index) => (
    //         <li key={index} className="mb-2">
    //             {item.name} - ${item.price}
    //         </li>
    //         ))}
    //     </ul>
    // ) : (
    //     <h2 className="text-xl font-semibold mb-4">Tu carrito está vacío</h2>
    // )}
    //     </main>
    //     </div>
    // );
    
    // }
    // console.log("Data IN CART", product, quantity);
    const handleRemove = async (productId) => {
      try {
        console.log("Product", productId);
        // const result = await backend.removeFromCart(productId);
        const result = await removeFromCart(productId);
        if (result.success) {
          alert("Se ha eliminado el producto");
           // Actualizar el estado local
          setCartItems(prevItems => prevItems.filter(item => item.product.id !== productId));
        }
      } catch (err) {
        console.error("Error eliminando el producto:", err);
      }
    };

    async function handleDecrement () {
    // onQuantityChange(product.id, Math.max(quantity - 1, 1));
    try{
      console.log("Product-quantity", product.id, quantity+44);
      if(quantity === 1){
        handleRemove();
      }else{
        const result = await backend.updateQuantity(product.id, quantity-1);
        if("ok" in result){
          alert("Se ha decrementado la cantidad de producto");
        } 
      }
    } catch (err) {
      console.error("Error decrementando el producto:", err);
    }
  };

  async function handleIncrement () {
    // onQuantityChange(product.id, quantity + 1);
    try{
      console.log("Product and new quantity", product.id, quantity+1);
      const result = await backend.updateQuantity(product.id, quantity+1);
      if("ok" in result){
        alert("Se ha incrementado la cantidad de producto");
      } 
    } catch (err) {
      console.error("Error incrementando el producto:", err);
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
      alert("Has realizado la compra con éxito");
      // Limpiar el carrito local después de una compra exitosa
      setCartItems([]);
    } catch (err) {
      console.error("Error durante la compra:", err);
    }
  };
    console.log("productsInCart Cart", productsInCart);
    return (
      <div className="p-4 bg-stone-100 rounded-lg">
        <header>
          <h2 className="p-2 px-4 mb-4 w-fit bg-stone-200 rounded-md font-bold">
            Productos</h2>
        </header>
        <main>
          {loading ? (
            <div>
              <p>Cargando carrito...</p>
            </div>
          ) : 
          cartItems && Array.isArray(cartItems) ? (
            // <React.Fragment>
            <>
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
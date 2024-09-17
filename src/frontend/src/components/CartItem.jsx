import { useState, useEffect, useContext } from 'react';
import { createActor } from '../../../declarations/backend';
import { AuthContext } from '../context/AuthContext';

// const CartItem = ({ product, quantity }) => {

  const CartItem = ({ product, quantity, onChangeQuantity, onRemove }) => {
//     const { isAuthenticated, identity } = useContext(AuthContext);
//     const [currentQuantity, setCurrentQuantity] = useState(0);   

//     let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
//     let backend = createActor(canisterId, {
//     agentOptions: {
//         identity: identity,
//         host: "http://localhost:4943",
//     },
//     })
// console.log("Data Items CartItem", product, quantity);
//     async function handleRemove () {
//       // onRemove(product.id);
//       console.log("Product", product.id);
//       const result = await backend.removeFromCart(product.id);
//       if("ok" in result){
//         alert("Se ha eliminado el producto");
//       }
//     }

//     async function handleDecrement () {
//     // onQuantityChange(product.id, Math.max(quantity - 1, 1));
//     try{
//       console.log("Product-quantity", product.id, quantity+44);
//       if(quantity === 1){
//         handleRemove();
//       }else{
//         const result = await backend.updateQuantity(product.id, quantity-1);
//         if("ok" in result){
//           alert("Se ha decrementado la cantidad de producto");
//         } 
//       }
//     }catch{

//     }
//   };

//   async function handleIncrement () {
//     // onQuantityChange(product.id, quantity + 1);
//     try{
//       console.log("Product and new quantity", product.id, quantity+1);
//       const result = await backend.updateQuantity(product.id, quantity+1);
//       if("ok" in result){
//         alert("Se ha incrementado la cantidad de producto");
//       } 
//     }catch{
      
//     }
//   };
  const handleDecrement = () => {
    if (quantity === 1) {
      onRemove(product.id);
    } else {
      onChangeQuantity(quantity - 1);
    }
  };

  const handleIncrement = () => {
    onChangeQuantity(quantity + 1);
  };
  return (
    <li className="flex items-center justify-between py-2 border-b last:border-none">
      <div>
<div className="flex items-center">

      <div className="flex items-center">
        <img src={product.image} alt={product.name} className="w-12 h-12 mr-4 object-cover" />
        <span>{product.name}</span>
      </div>
</div>
<div className="flex items-center">
      <div className="flex items-center space-x-2">
        <span>Cantidad:{' '}{quantity}{' '}</span>
      <span>${product.price * quantity}{' '}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button onClick={handleDecrement} className="h-9 w-9 m-4 bg-gray-200 rounded hover:bg-gray-300 hover:scale-105">-</button>
        <button onClick={handleIncrement} className="h-9 w-9 bg-gray-200 rounded hover:bg-gray-300 hover:scale-105">+</button>
      </div>    
<div className="flex justify-center">
        {/* <button onClick={handleIncrement} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Comprar</button> */}
      <button onClick={() => onRemove(product.id)} className="ml-4 px-2 py-1 bg-red-500 text-white font-bold rounded hover:bg-red-600 hover:scale-105">Eliminar</button>
      </div>
</div>
  </div>
    </li>
  );
};

export default CartItem;

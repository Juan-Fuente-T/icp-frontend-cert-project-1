import React from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import LoginButton from "./auth/LoginButton";
import LogoutButton from "./auth/LogoutButton";
import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  const { productsInCart } = useCart();
    // return (
    //     <nav className="bg-gray-800 text-white py-4">
    //       <div className="container mx-auto flex justify-between items-center">
    //         <div className="logo text-xl font-bold">Mi Aplicación</div>
    //         <input type="checkbox" id="nav-toggle" className="hidden peer" />
    //         <label htmlFor="nav-toggle" className="peer-checked:bg-gray-700 peer-checked:text-white hover:bg-gray-700 hover:text-white rounded-md p-2 inline-flex items-center justify-center ease-in-out duration-300">
    //           <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
    //         </label>
    //         <ul className="hidden peer-checked:flex space-x-4 text-lg font-medium">
    //           <li><a href="/" className="hover:text-gray-400">Products</a></li>
    //           <li><a href="#cart" className="hover:text-gray-400">Cart</a></li>
    //           {/* <li><a href="/detail" className="hover:text-gray-400">ProductDetail</a></li> */}
    //         </ul>
    //       </div>
    //     </nav>
    //   );
    // }
//     return (
//       <nav className="navbar">
//         {/* <div className="logo">Mi Aplicación</div> */}
//         {/* <input type="checkbox" id="nav-toggle" className="nav-toggle" />
//         <label htmlFor="nav-toggle" className="nav-toggle-label">
//           <span></span>
//         </label> */}
//         <ul className="nav-links">
//           <li><a href="#home">Inicio</a></li>
//           <li><a href="#Cart">Cart</a></li>
//           <li><a href="#contact">Contacto</a></li>
//         </ul>
//       </nav>
//     );
//   }
  
return (
  <nav className="flex w-full bg-gray-800 text-white py-4">
    <div className="container mx-auto flex justify-stretch items-center border-2 border-red-500">
      <div className="flex-grow">
        <h1 className="text-xl font-bold ml-4">Mi Aplicación</h1>
      </div>
      <ul className="flex space-x-4">
        <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
        <li><Link to="/cart" className="hover:text-gray-400">Carrito</Link></li>
        {/* <li><Link to="/contacto" className="hover:text-gray-400">Contacto</Link></li> */}
      </ul>
      <div className="relative mx-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="absolute -top-2 -right-2 bg-red-500 text-xs rounded-full w-5 h-5 flex items-center justify-center">{productsInCart?.length}</span>
      </div>
    </div>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  </nav>
);
} 

//     return (
//       <nav className="bg-gray-800 text-white py-4">
//         <div className="container mx-auto flex justify-between items-center">
//           <div className="logo text-xl font-bold">Mi Aplicación</div>
//           <ul className="flex space-x-4 text-lg font-medium">
//             <li><Link to="/" className="hover:text-gray-400">Inicio</Link></li>
//             <li><Link to="/cart" className="hover:text-gray-400">Carrito</Link></li>
//             <li><Link to="/contacto" className="hover:text-gray-400">Contacto</Link></li>
//           </ul>
//         </div>
//       </nav>
//     );
//   
    

export default Navbar;
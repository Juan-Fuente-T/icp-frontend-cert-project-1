import React from 'react';
// import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
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
      <nav>
        <div>
          <div>Mi Aplicación</div>
          <ul>
            <li><Link to="/">Products</Link></li>
            <li><Link to="/cart" >Cart</Link></li>
            {/* <li><Link to="/contacto" >Contacto</Link></li> */}
          </ul>
        </div>
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
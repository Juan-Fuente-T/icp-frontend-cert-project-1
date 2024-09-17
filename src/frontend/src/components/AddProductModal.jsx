import React from 'react';
import { Link } from 'react-router-dom';

const AddProductModal = ({ productName, onRequestClose }) => {
  console.log("productName", productName);
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">  
     <div className="modal-box w-2/5 h-2/5 justify-items-end">
        <h3 className="text-gray-800 font-bold text-lg m-2">Se ha añadido el producto {productName}</h3>
        <p className="text-gray-800 font-bold text-lg m-2">Cantidad: 1</p>
        <div className="flex h-3/5 mt-4 border-2 border-red-500 justify-end items-end">
          <button onClick={onRequestClose} className="btn bg-red-600 mr-2 text-white hover:scale-105">
            Cerrar
          </button>
          <Link to="/cart">
            <button className="btn btn-primary hover:scale-105">
              Carrito
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProductModal;
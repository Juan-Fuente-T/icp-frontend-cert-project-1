import React,{ useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginButton from "./auth/LoginButton";

const AuthModal = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    !isAuthenticated && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="modal-box w-2/5 h-auto py-8 text-center">
          <h2 className="text-gray-800 font-bold text-lg m-auto mb-4">Necesitas hacer login para usar la aplicacion</h2>
          <p className="text-gray-800 font-bold text-lg mr-4">Gracias</p>
          <div className="flex h-3/5 mt-4 justify-center">
            <LoginButton className="font-bold text-lg m-2 w-60  bg-red-600" />
          </div>
        </div>
      </div>
    )
  );
};

export default AuthModal;
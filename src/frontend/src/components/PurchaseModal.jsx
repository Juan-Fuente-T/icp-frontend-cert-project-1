import React from 'react';
import { useState } from 'react';

const PurchaseModal = ({ onRequestClose, onPurchase, cartItems }) => {
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        direccion: '',
        telefono: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar validaciones
        if (!formData.name || !formData.direccion || !formData.telefono || !formData.email) {
            setMessage('Por favor, completa todos los campos.');
            return;
        }
        // Simular la compra
        onPurchase(formData);
    };

    if (cartItems.length === 0) return (<h2>No hay productos en el carrito</h2>);

    return (
        <div className="flex flex-col place-items-center mt-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded w-5/6 xl:w-3/5 px-8 pt-4 pb-8 mb-4 text-stone-700">
                <h3 className="text-center font-bold mb-8 text-xl md:text-2xl">Introduce tus datos de compra</h3>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name" type="text" name="name" placeholder="Tu nombre" required minLength={10}
                        maxLength={100} onChange={handleChange} value={formData.name}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="direccion">Direccion</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="direccion" type="text" name="direccion" placeholder="Tu direccion" required minLength={10}
                        onChange={handleChange} value={formData.direccion}></input>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="telefono">Teléfono</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        minLength={7} maxLength={15} id="telefono" type="text" name="telefono" placeholder="+12 34567890" required onChange={handleChange} value={formData.telefono}></input>

                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">Email</label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="email" type="email" name="email" placeholder="ejemplo@dominio.com" required minLength={20}
                        maxLength={100} onChange={handleChange} value={formData.email}></input>
                </div>
                <br></br>
                <div className="text-red-500 text-center">{message}</div>
                <div className="flex gap-2 text-sm lg:text-lg">
                    <button type="submit" disabled={!formData}
                        className="font-bold mt-10 w-3/5 xl:w-4/5 bg-green-500 text-white rounded p-2 shadow-lg" id="list-button">
                        Aceptar
                    </button>
                    <button onClick={onRequestClose} className="font-bold mt-10 w-2/5 xl:w-1/5  bg-red-600 text-white rounded p-2 shadow-lg" id="list-button">
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );

};

export default PurchaseModal;

const CartItem = ({ product, quantity, onChangeQuantity, onRemove }) => {

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
            <button onClick={() => onRemove(product.id)} className="ml-4 px-2 py-1 bg-red-500 text-white font-bold rounded hover:bg-red-600 hover:scale-105">Eliminar</button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;

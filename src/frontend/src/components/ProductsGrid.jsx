
import { useEffect, useState, useContext } from "react";
import { AuthContext } from '../context/AuthContext';
import { createActor } from '../../../declarations/backend';
import { useCart } from '../context/CartContext';
import AddProductModal from "./AddProductModal";

const ProductsGrid = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [, setProductsInCart] = useState([]);
  const { identity } = useContext(AuthContext);
  const { addToCart } = useCart();

  // console.log("isAuthenticated", isAuthenticated);

  let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;

  let backend = createActor(canisterId, {
    agentOptions: {
      identity: identity,
      host: "http://localhost:4943",
    },
  })

  useEffect(() => {
    getAllProducts();
  }, []);

  async function getAllProducts() {
    try {
      const result = await backend.getProducts();
      if (result) {
        setAllProducts(result);
      }
    } catch (err) {
      console.error(err);
    }
  }

  const handleAddToCart = async (product) => {
    try {
      const result = await addToCart(product.id);
      if (result.success) {
        setProductsInCart(prev => [...prev, product.id]);
        // alert("Se ha añadido el producto al carrito")
        setIsModalOpen(true);
        setProductName(product.name);
        const result2 = await backend.getCart();
        if ("ok" in result) {
          console.log("result2 addToCart", result2);
        }
      }
    } catch (err) {
      console.error(err);
      alert("No se ha podido añadir el producto")
    }
  };
  const handleOpenModal = (product) => {
    setIsModalOpen(true);
    setProductName(product.name);
  };
  return (
    <div className="flex flex-col p-4 items-center w-full border-2 border-stone-200 rounded-lg">
      <h2 className="w-1/3 text-center py-2 mb-6 bg-stone-100 rounded-md">Productos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {allProducts.map((product, index) => (
          <div key={index} className="card w-full bg-base-200 shadow-xl">
            <figure>
              <img src={product.image} alt={product.name} className="h-64 w-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="p-6 mb-2 text-gray-600 bg-stone-200 rounded-md">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl">${product.price}</span>
                <button
                  onClick={() => { handleAddToCart(product) }}
                  className="btn btn-primary"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <AddProductModal
          productName={productName}
          onRequestClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default ProductsGrid;
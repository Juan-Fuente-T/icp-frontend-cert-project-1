
import { useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { createActor } from '../../../declarations/backend';
import { useContext } from "react";
import { useCart } from '../context/CartContext';
import AddProductModal from "./AddProductModal";

const ProductsGrid = () => {
    const { isAuthenticated, identity } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productName, setProductName] = useState('');
    const [productsInCart, setProductsInCart] = useState([]);
    // const [quantity, setQuantity] = useState(1);
    const { addToCart } = useCart();

    console.log("isAuthenticated", isAuthenticated);
  
    let canisterId = import.meta.env.VITE_BACKEND_CANISTER_ID;
  
    let backend = createActor(canisterId, {
      agentOptions: {
        identity: identity,
        host: "http://localhost:4943",
      },
    })
    console.log("Identity", identity);
  
    useEffect(() => {
      getAllProducts();
    }, []);
  
    async function getAllProducts() {
      try {
        const result = await backend.getProducts();
        console.log("Result getAllProducts", result);
        if (result) {
          setAllProducts(result);
          console.log("allProducts", allProducts);
        }
      } catch (err) {
        console.error(err);
      }
    }

    const handleAddToCart = async (productId) => {
      // e.preventDefault();
      try {
        console.log("ProductId) addToCart:", productId);
        const result = await addToCart(productId);
        console.log("RESULT:", result);
        if (result.success) {
          // productsInCart.push(productId);
          // setProductsInCart(productsInCart);
          setProductsInCart(prev => [...prev, productId]);
          console.log("result addToCart", result);
          console.log("productsInCart", productsInCart);
          // alert("Se ha añadido el producto al carrito")
          setIsModalOpen(true);
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
      console.log("product", product);
      console.log("product.NAME", product.name);
      setIsModalOpen(true);
      setProductName(product.name);
      // setQuantity(1);
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
                  <p className="text-gray-600">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl">${product.price}</span>
                    <button 
                      onClick={() => {handleOpenModal({product});  handleAddToCart(product.id)}}
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
          // isOpen={isModalOpen}
          productName={productName} 
          onRequestClose={() => setIsModalOpen(false)} 
          // onViewCart={() => {
          //   <Link to="/cart"></Link>
          // }}
        />
      )}        
      </div>
      );
};

export default ProductsGrid;
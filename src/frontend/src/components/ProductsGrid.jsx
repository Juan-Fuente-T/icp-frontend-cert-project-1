
import { useEffect, useState } from "react";
import { AuthContext } from '../context/AuthContext';
import { createActor } from '../../../declarations/backend';
import { useContext } from "react";

const ProductsGrid = ({ onAddToCart }) => {
    const { isAuthenticated, identity } = useContext(AuthContext);
    const [allProducts, setAllProducts] = useState([]);
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
  
    return (
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Products</h2>
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
                      onClick={() => onAddToCart(product.id, 1)}
                      className="btn btn-primary"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
};

export default ProductsGrid;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import "../styles/home.css";

const IMAGE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    "/api",
    ""
  );

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await api.get("/products");
      setProducts((response.data.products || []).slice(0, 8));
    } catch (err) {
      setError("Failed to load products.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <section className="hero">
        <div>
          <h1>Welcome to ShopEase</h1>

          <p>
            Discover thousands of quality products at unbeatable prices.
          </p>

          <Link to="/products">
            <button>Shop Now</button>
          </Link>
        </div>
      </section>

      <section className="featured">
        <div className="section-header">
          <h2>Featured Products</h2>

          <Link to="/products">View All</Link>
        </div>

        {loading && <h3>Loading...</h3>}

        {error && <p className="error">{error}</p>}

        <div className="product-grid">
          {products.map((product) => (
            <div
              key={product.id}
              className="product-card"
            >
              <img
                src={
                  product.image
                    ? `${IMAGE_URL}/uploads/${product.image}`
                    : "https://via.placeholder.com/250"
                }
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/250";
                }}
              />

              <h3>{product.name}</h3>

              <p className="price">${product.price}</p>

              <Link to={`/products/${product.id}`}>
                <button>View Details</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import "../styles/products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, products]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.products);

      setFilteredProducts(response.data.products);
    } catch (err) {
      setError("Failed to load products.");
    }

    setLoading(false);
  };

  return (
    <div className="products-page">

      <h1>All Products</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {loading && <h2>Loading...</h2>}

      {error && (
        <p className="error">{error}</p>
      )}

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <div
            key={product.id}
            className="product-card"
          >

            <img
              src={
                product.image
                  ? `http://localhost:5000/uploads/${product.image}`
                  : "https://via.placeholder.com/250"
              }
              alt={product.name}
            />

            <h3>{product.name}</h3>

            <p className="price">
              ${product.price}
            </p>

            <p className="description">
              {product.description?.substring(0, 70)}...
            </p>

            <Link
              to={`/products/${product.id}`}
            >
              <button>
                View Details
              </button>
            </Link>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;
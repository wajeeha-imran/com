import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

import "../styles/productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const navigate = useNavigate();

  const { user } = useAuth();

  const [product, setProduct] = useState(null);

  const [quantity, setQuantity] = useState(1);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await api.get(`/products/${id}`);

      setProduct(response.data.product);
    } catch (err) {
      setError("Product not found.");
    }

    setLoading(false);
  };

  const addToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await api.post("/cart", {
        productId: product.id,
        quantity
      });

      alert("Product added to cart successfully!");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Failed to add product."
      );
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div className="product-details">

      <div className="image-section">

        <img
          src={
            product.image
              ? `http://localhost:5000/uploads/${product.image}`
              : "https://via.placeholder.com/500"
          }
          alt={product.name}
        />

      </div>

      <div className="info-section">

        <h1>{product.name}</h1>

        <h2>${product.price}</h2>

        <p>{product.description}</p>

        <p>
          <strong>Stock:</strong>{" "}
          {product.stock}
        </p>

        <div className="quantity">

          <label>Quantity</label>

          <input
            type="number"
            min="1"
            max={product.stock}
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />

        </div>

        <button
          onClick={addToCart}
        >
          Add To Cart
        </button>

      </div>

    </div>
  );
}

export default ProductDetails;
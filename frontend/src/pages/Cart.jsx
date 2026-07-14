import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import "../styles/cart.css";

const IMAGE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    "/api",
    ""
  );

function Cart() {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.get("/cart");

      const items = response.data.cart.items || [];

      setCart(items);
      calculateTotal(items);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const sum = items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);

    setTotal(sum);
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await api.put(`/cart/${id}`, {
        quantity,
      });

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/${id}`);

      fetchCart();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>Loading Cart...</h2>;
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      {cart.length === 0 ? (
        <h2>Your cart is empty.</h2>
      ) : (
        <>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                src={
                  item.product.image
                    ? `${IMAGE_URL}/uploads/${item.product.image}`
                    : "https://via.placeholder.com/150"
                }
                alt={item.product.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/150";
                }}
              />

              <div className="cart-info">
                <h3>{item.product.name}</h3>

                <p>${item.product.price}</p>
              </div>

              <div className="quantity">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity - 1
                    )
                  }
                >
                  -
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      item.quantity + 1
                    )
                  }
                >
                  +
                </button>
              </div>

              <button
                className="remove-btn"
                onClick={() =>
                  removeItem(item.id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <div className="cart-summary">
            <h2>
              Total: ${total.toFixed(2)}
            </h2>

            <Link to="/checkout">
              <button>
                Proceed To Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
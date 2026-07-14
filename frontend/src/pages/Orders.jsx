import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/orders.css";

const IMAGE_URL =
  (import.meta.env.VITE_API_URL || "http://localhost:5000/api").replace(
    "/api",
    ""
  );

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/my-orders");
      setOrders(response.data || []);
    } catch (error) {
      console.log(error);

      setError(
        error.response?.data?.message ||
          "Failed to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <h2 className="center">
        Loading orders...
      </h2>
    );
  }

  if (error) {
    return (
      <h2 className="center">
        {error}
      </h2>
    );
  }

  return (
    <div className="orders-page">
      <h1>My Orders</h1>

      {orders.length === 0 ? (
        <h2>No orders found.</h2>
      ) : (
        orders.map((order) => (
          <div
            className="order-card"
            key={order.id}
          >
            <div className="order-header">
              <h3>Order #{order.id}</h3>

              <span className={`status ${order.status}`}>
                {order.status}
              </span>
            </div>

            <p>
              <strong>Total:</strong> $
              {order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.paymentStatus || "Pending"}
            </p>

            <p>
              <strong>Payment Method:</strong>{" "}
              {order.paymentMethod ||
                "Cash on Delivery"}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <hr />

            <h4>Items</h4>

            {order.orderItems?.length > 0 ? (
              order.orderItems.map((item) => (
                <div
                  className="order-item"
                  key={item.id}
                >
                  <img
                    src={
                      item.product?.image
                        ? `${IMAGE_URL}/uploads/${item.product.image}`
                        : "https://via.placeholder.com/80"
                    }
                    alt={
                      item.product?.name ||
                      "Product"
                    }
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/80";
                    }}
                  />

                  <div>
                    <h5>
                      {item.product?.name}
                    </h5>

                    <p>
                      Qty: {item.quantity}
                    </p>

                    <p>
                      Price: ${item.price}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No items found.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Orders;
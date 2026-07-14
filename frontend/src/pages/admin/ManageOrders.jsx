import { useEffect, useState } from "react";
import api from "../../services/api";
import "../../styles/manageOrders.css";

function ManageOrders() {
  const [orders, setOrders] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders/admin");

      setOrders(response.data.orders);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/orders/${id}/status`, {
        status,
      });

      fetchOrders();
    } catch (error) {
      alert("Failed to update order.");
    }
  };

  if (loading) {
    return <h2>Loading Orders...</h2>;
  }

  return (
    <div className="manage-orders">

      <h1>Manage Orders</h1>

      <table>

        <thead>

          <tr>

            <th>Order ID</th>

            <th>Customer</th>

            <th>Total</th>

            <th>Payment</th>

            <th>Status</th>

            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr key={order.id}>

              <td>{order.id}</td>

              <td>{order.user.name}</td>

              <td>${order.totalAmount}</td>

              <td>{order.paymentStatus}</td>

              <td>{order.status}</td>

              <td>

                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                >
                  <option value="pending">
                    Pending
                  </option>

                  <option value="processing">
                    Processing
                  </option>

                  <option value="shipped">
                    Shipped
                  </option>

                  <option value="delivered">
                    Delivered
                  </option>

                </select>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageOrders;
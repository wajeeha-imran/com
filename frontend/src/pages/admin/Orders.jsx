import { useEffect, useState } from "react";
import API from "../../services/axios";

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}/status`, {
        status,
      });

      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Delete this order?")) return;

    try {
      await API.delete(`/orders/${id}`);
      getOrders();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h1>Orders</h1>

      <table border="1" cellPadding="10" width="100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Shipping Address</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>

              <td>{order.user?.name}</td>

              <td>PKR {order.total}</td>

              <td>{order.status}</td>

              <td>{order.shippingAddress}</td>

              <td>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>

              <td>
                <select
                  value={order.status}
                  onChange={(e) =>
                    updateStatus(order.id, e.target.value)
                  }
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>

                <button
                  style={{ marginLeft: 10 }}
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders;
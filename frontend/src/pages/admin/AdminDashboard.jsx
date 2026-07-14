import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

import "../../styles/admin.css";

function AdminDashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (user.role !== "admin") {
      navigate("/");
      return;
    }

    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/products/${id}`);

      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );

      alert("Product deleted successfully.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">

        <h1>Admin Dashboard</h1>

        <Link to="/admin/add-product">
          <button>Add Product</button>
        </Link>

      </div>

      <table>

        <thead>

          <tr>

            <th>ID</th>

            <th>Image</th>

            <th>Name</th>

            <th>Price</th>

            <th>Stock</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr key={product.id}>

              <td>{product.id}</td>

              <td>

                <img
                  src={
                    product.image
                      ? `http://localhost:5000/uploads/${product.image}`
                      : "https://via.placeholder.com/60"
                  }
                  alt={product.name}
                  width="60"
                />

              </td>

              <td>{product.name}</td>

              <td>${product.price}</td>

              <td>{product.stock}</td>

              <td>

                <Link
                  to={`/admin/edit-product/${product.id}`}
                >
                  <button className="edit-btn">
                    Edit
                  </button>
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product.id)
                  }
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

export default AdminDashboard;
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  FaEdit,
  FaTrash,
  FaPlus,
  FaSearch,
  FaBoxOpen,
} from "react-icons/fa";

import { getProducts } from "../../features/product/productSlice";
import API from "../../services/axios";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();

  const { products = [] } = useSelector((state) => state.products);

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProducts({ page: 1, limit: 100 }));
  }, [dispatch]);

  const deleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await API.delete(`/products/${id}`);
      dispatch(getProducts({ page: 1, limit: 100 }));
    } catch (err) {
      console.log(err);
    }
  };

  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-page">

      <div className="products-header">

        <div>
          <h1>Products</h1>
          <p>Manage your store products</p>
        </div>

        <Link to="/admin/add-product" className="add-btn">
          <FaPlus />
          Add Product
        </Link>

      </div>

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="products-grid">

        {filteredProducts.map((product) => (

          <div className="product-card" key={product.id}>

            <div className="product-image">

              <img
                src={
                  product.image.startsWith("http")
                    ? product.image
                    : `http://localhost:5000/${product.image}`
                }
                alt={product.name}
              />

            </div>

            <div className="product-body">

              <span className="category">
                <FaBoxOpen />
                {product.category || "General"}
              </span>

              <h3>{product.name}</h3>

              <h2>PKR {product.price}</h2>

              <span
                className={
                  product.stock > 0
                    ? "stock"
                    : "out-stock"
                }
              >
                {product.stock > 0
                  ? `${product.stock} In Stock`
                  : "Out Of Stock"}
              </span>

              <div className="product-actions">

                <Link
                  to={`/admin/edit-product/${product.id}`}
                  className="edit-btn"
                >
                  <FaEdit />
                </Link>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteProduct(product.id)
                  }
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default Products;
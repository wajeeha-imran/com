import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";
function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
          <h2>ShopEase</h2>
        </Link>
      </div>

      <div className="nav-links">
        <NavLink to="/">Home</NavLink>

        <NavLink to="/products">Products</NavLink>

        {user && (
          <>
            <NavLink to="/cart">Cart</NavLink>

            <NavLink to="/orders">Orders</NavLink>
          </>
        )}

        {user?.role === "admin" && (
  <>
    <NavLink to="/admin">
      Admin Dashboard
    </NavLink>

    <NavLink to="/admin/orders">
      Manage Orders
    </NavLink>
  </>
)}
      </div>

      <div className="auth-section">
        {!user ? (
          <>
            <Link to="/login">
              <button>Login</button>
            </Link>

            <Link to="/register">
              <button>Register</button>
            </Link>
          </>
        ) : (
          <>
            <span>
              Welcome, <strong>{user.name}</strong>
            </span>

            <button onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
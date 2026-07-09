import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");

    navigate("/login");
  };

  const getDashboardLink = () => {
    if (role === "customer") return "/customer-dashboard";
    if (role === "provider") return "/provider-dashboard";
    if (role === "admin") return "/admin-dashboard";
    return "/";
  };

  return (
    <nav className="navbar">

      <h2 className="logo">Gharify</h2>

      <div className="nav-links">

        <Link to="/">Home</Link>

        <Link to="/services">Services</Link>

        <Link to="/about">About</Link>

        <Link to="/contact">Contact</Link>

        {!token ? (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to={getDashboardLink()}>
              Dashboard
            </Link>

            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}
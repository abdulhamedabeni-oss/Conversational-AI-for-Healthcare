import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">HealthAI</h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/departments">Departments</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/chat" className="chat-link">
          Chat with AI
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
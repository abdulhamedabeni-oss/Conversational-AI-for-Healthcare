import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="logo" onClick={closeMenu}>
        HealthAI
      </Link>

      <button
        className="menu-toggle"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={menuOpen}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`nav-links ${menuOpen ? "active" : ""}`}>
        <Link to="/" onClick={closeMenu}>
          Home
        </Link>

        <Link to="/about" onClick={closeMenu}>
          About
        </Link>

        <Link to="/services" onClick={closeMenu}>
          Services
        </Link>

        <Link to="/departments" onClick={closeMenu}>
          Departments
        </Link>

        <Link to="/contact" onClick={closeMenu}>
          Contact
        </Link>

        <Link to="/appointments" onClick={closeMenu}>
          Appointments
        </Link>

        <Link to="/chat" className="chat-link" onClick={closeMenu}>
          Chat with AI
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
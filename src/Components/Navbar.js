// Navbar.js
import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  const handleNavLinkClick = (path) => {
    window.location.href = path; // This will reload the page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">NewsMonkey</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" onClick={() => handleNavLinkClick('/')}>General</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/sports" onClick={() => handleNavLinkClick('/sports')}>Sports</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/business" onClick={() => handleNavLinkClick('/business')}>Business</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/entertainment" onClick={() => handleNavLinkClick('/entertainment')}>Entertainment</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

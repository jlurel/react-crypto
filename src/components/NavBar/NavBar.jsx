import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => (
  <nav className="navigation">
    <ul className="navigation__links">
      <li className="navigation__link">
        <Link to="/">Cryptocurrencies</Link>
      </li>
      <li className="navigation__link">
        <Link to="/exchanges">Exchanges</Link>
      </li>
    </ul>
  </nav>
);

export default NavBar;

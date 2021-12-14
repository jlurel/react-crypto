import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { IoCloseOutline, IoMenuOutline } from 'react-icons/io5';

import './NavBar.css';

const NavBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li className="navigation__link">
          <Link to="/">Cryptocurrencies</Link>
        </li>
        <li className="navigation__link">
          <Link to="/exchanges">Exchanges</Link>
        </li>
      </ul>
      <div className="mobile-menu">
        <div className={open ? 'mobile-menu__links show' : 'mobile-menu__links hide'}>
          <div>
            <Link to="/" className="mobile-menu__link">
              Cryptocurrencies
            </Link>
            <Link to="/exchanges" className="mobile-menu__link">
              Exchanges
            </Link>
          </div>
          <IoCloseOutline className="menu-toggler close-menu" onClick={() => setOpen(!open)} />
        </div>
        <IoMenuOutline className="menu-toggler" onClick={() => setOpen(!open)} />
      </div>
    </nav>
  );
};

export default NavBar;

import React from 'react';
import { Link } from 'react-router-dom';

import { NavBar } from '../index';

import logo from '../../assets/logo.webp';
import './Header.css';

const Header = () => (
  <header className="header">
    <Link to="/">
      <div className="header__logo">
        <img src={logo} alt="Crypto" />
        <h1>CryptoNeko</h1>
      </div>
    </Link>
    <NavBar />
  </header>
);

export default Header;

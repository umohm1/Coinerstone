import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
      <Link to="/">
        <img src= alt= className="Header-logo" />
      </Link>
    </div>
  );
}

export default Header;
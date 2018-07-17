import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
     <Link to="/">
        <img src="https://i.imgur.com/cKY6Gpa.png" alt="" className="Header-logo" />
      </Link>
     COINERSTONE
    <Search />
    </div>
  );
}

export default Header;
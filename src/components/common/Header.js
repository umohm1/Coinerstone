import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Header.css';

const Header = () => {
  return (
    <div className="Header">
     
    <Search />
    </div>
  );
}

export default Header;
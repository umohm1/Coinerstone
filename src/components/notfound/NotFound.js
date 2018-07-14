import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  return (
    <div className="NotFound">
      <h1 className="NotFound-title">Oopsie! That page isn't here</h1>

      <Link to="/" className="NotFound-link">Go to homepage</Link>
    </div>
  )
}

export default NotFound;
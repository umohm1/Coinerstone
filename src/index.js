import React from 'react';
import ReactDOM from 'react-dom';
import Header from './components/common/Header';
import './index.css';

const App = () => {
  return ( 
    <div>
    <Header /> 
    <h1>Coinerstone</h1>
    <p>Get the latest crypto currency data!</p>
    </div>
  )
};

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
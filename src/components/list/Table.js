import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

const Table = (props) => {
  const { currencies, renderPercentChange } = props;

  return (
       <div className="Table-container">
        <table className="Table">
          <thead className="Table-head">
            <tr>
              <th>Cryptocurrency</th>
              <th>Price</th>
              <th>Market Cap</th>
              <th>Change(24h)</th>
            </tr>
          </thead>
          <tbody className="Table-body">
          {currencies.map((currency) => (
            <tr key={currency.id}>
              <td>
                <span className="Table-rank">{currency.rank}</span>
                {currency.name}
              </td>
              <td>
                <span className="Table-dollar">$</span>
                {currency.price}
              </td>
               <td>
                <span className="Table-dollar">$</span>
                {currency.marketCap}
              </td>
              <td>
                {renderPercentChange(currency.percentChange24h)}
              </td>
            </tr>
          ))}  
          </tbody>
        </table>
      </div>
  );
}

Table.PropTypes = {
  currencies: PropTypes.array.isRequired,
  renderPercentChange: PropTypes.func.isRequired,
};

export default Table;
import React from 'react';
import { API_URL } from '../../config'; 
import Loading from '../common/Loading';
import { handleResponse, renderPercentChange } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super(); 

      this.state = {
        currency: [],
        loading: false,
        error: null,
      };
    }


  componentDidMount() {
    const currencyId = this.props.match.params.id;

    this.setState({ loading: true });

    fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({
          loading: false, 
          error: null,
          currency,
        });
      })
      .catch((error) => {
        this.setState({
          loading: false,
          error: error.errorMessage, 
        });
      });
  }

  render() {
    const { loading, error, currency } = this.state;

    // Render only if loading state eq true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    } 

    // Render if there is an error fetching data
    if (error) {
      return <div className="error">{error}</div>
    }
  
    return (
      <div className="Detail">
        <h1 className="Detail-heading">
          {currency.name} ({currency.symbol})
        </h1>
        
        <div className="Detail-container">
          <div className="Detail-item">
            Price <span className="Detail-value">$ {currency.price}</span>
          </div>
          <div className="Detail-item">
            Rank <span className="Detail-value">{currency.rank}</span>
          </div>
          <div className="Detail-item">
            Change(24h)<span className="Detail-value">{renderPercentChange(currency.percentChange24h)}</span>
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Market Cap</span>
            <span className="Detail-dollar">$</span>
            {currency.marketCap}
          </div>
          <div className="Detail-item">
            <span className="Detail-title">Volume (24h) </span>
            <span className="Detail-dollar">$</span>
            {currency.volume24h}
          </div>
           <div className="Detail-item">
            <span className="Detail-title">Total Supply</span>
            <span className="Detail-dollar">$</span>
            {currency.totalSupply}
          </div>
        </div> 
      </div>
    );
  }
}

export default Detail;
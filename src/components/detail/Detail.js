import React from 'react';
import Loading from '../common/Loading';
import { handleResponse, renderPercentChange } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
  constructor() {
    super(); 

      this.state = {
        currency: {},
        loading: false,
        error: null,
      };
    }


  componentDidMount() {
    const currencyId = this.props.match.params.id;

    this.fetchCurrency(currencyId);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.location.pathname !== nextProps.location.pathname) {
      // Get new currency id from url 
      const newCurrencyId = nextProps.match.params.id;

      this.fetchCurrency(newCurrencyId);
    }
  }

  fetchCurrency(currencyId) {
    this.setState({
      loading: true
    });

    fetch(`${process.env.REACT_APP_API}/cryptocurrencies/${currencyId}`)
      .then(handleResponse)
      .then((currency) => {
        this.setState({
          currency,
          loading: false,
          error: null,
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
import React from 'react';
import { API_URL } from '../../config'; 
import Loading from '../common/Loading';
import { handleResponse } from '../../helpers';
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
      <div>Detail</div>
    );
  }
}

export default Detail;
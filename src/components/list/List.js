import React from 'react';
import { handleResponse } from '../../helpers';
import { API_URL } from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination'; 


class List extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      currencies: [],
      error: null,
      totalPages: 0,
      page: 1, 
    };
  }
   
  componentDidMount() {
    this.setState({ loading: true });

    const { page } = this.state;

    fetch(`${API_URL}/cryptocurrencies?page=${page}&perPage=20`)
      .then(handleResponse) 
      .then((data) => { 
        const { currencies, totalPages } = data;
        this.setState({ 
          currencies: currencies, 
          totalPages: totalPages,
          loading: false, 
        });
      })
      .catch((error) => {
        this.setState({ 
          error: error.errorMessage, 
          loading: false, 
        });
      });
  }

  renderPercentChange(percent) {
    if (percent > 0) {
      return <span className="percent-raised">{percent}% &uarr;</span>
    } else if (percent < 0) {
      return <span className="percent-fallen">{percent}% &darr;</span>
    } else {
      return <span>{percent}</span>
    }
  }

  render() {
    const { loading, error, currencies, page, totalPages } = this.state;

    // render loading componenet if loading state is set to true
    if (loading) {
      return <div className="loading-container"><Loading /></div>
    }

    // render error message if API call failed
    if (error) {
      return <div className="error">{this.state.error}</div>
    }

    return (
      <div>
      <Table 
      currencies={currencies} 
      renderPercentChange={this.renderPercentChange} 
      />

      <Pagination 
        page={page}
        totalPages={totalPages}
      />
      </div>
    );
  }
}

export default List; 
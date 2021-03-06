import React from 'react';
import { handleResponse } from '../../helpers';
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
      perPage: 20,
    };
  }
   
  componentDidMount() {
    this.fetchCurrencies();
  }

  fetchCurrencies() {
    this.setState({
      loading: true
    });

    const {
      page, perPage
    } = this.state;

    fetch(`${process.env.REACT_APP_API}/cryptocurrencies?page=${page}&perPage=${perPage}`)
      .then(handleResponse)
      .then((res) => {
        const {
          currencies,
          totalPages
        } = res;
        this.setState({
          currencies,
          totalPages,
          loading: false,
          error: null,
        });
      })
      .catch((error) => {
        this.setState({
          error: error.errorMessage,
          loading: false,
        });
      });
  }

  handlePaginationClick = (direction) => {
    let nextPage = this.state.page;

    // Increment nextPage if direction is next, if not decrement
    nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

    // call fetchCurrencies func in setState's callback to make sure first  // page is updated 
    this.setState({ page: nextPage }, () => {
      this.fetchCurrencies();
    });
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
      />

      <Pagination 
        page={page}
        totalPages={totalPages}
        handlePaginationClick={this.handlePaginationClick}
      />
      </div>
    );
  }
}

export default List; 
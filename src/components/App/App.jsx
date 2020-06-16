import React from 'react';
import * as rax from 'retry-axios';
import axios from 'axios';
import styled, { createGlobalStyle } from 'styled-components';
import * as ReactDOM from 'react-dom';

import TransferFlightsFilter from '../TransferFlightsFilter/TransferFlightsFilter';
import FilterButtons from '../FilterButtons/FilterButtons';
import TicketsList from '../TicketsList/TicketsList';
import logo from '../../img/aviasales_logo.svg';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Open Sans, sans-serif;
    background-color: #f3f7fa;
    margin: 0;
    padding: 0; 
  }
`;

const AppStyle = styled.div`
  margin: 0 auto;
  padding: 0 10px;
  padding-bottom: 30px;
  width: 750px;
`;

const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 160px;
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 5px;
`;

const ColLeft = styled.div`
  display: flex;
  width: 235px;
  margin-right: 20px;
`;

const ColRight = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

rax.attach();

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAllLoaded: false,
      tickets: [],
      sortBy: 'price', // duration
      filters: {
        0: true,
        1: true,
        2: true,
        3: true,
      },
    };
    this.serviceURL = 'https://front-test.beta.aviasales.ru';
    this.ticketsNumInList = 5;
  }

  async componentDidMount() {
    try {
      const { data } = await axios.get(`${this.serviceURL}/search`);
      await this.recursiveFetch(data.searchId);
    } catch (error) {
      return error;
    }
  }

  recursiveFetch = async (searchId) => {
    try {
      const { data } = await axios.get(`${this.serviceURL}/tickets?searchId=${searchId}`);
      const chunkData = data.tickets;
      const isStop = data.stop;

      this.setState((prevState) => ({
        isAllLoaded: isStop,
        tickets: [...prevState.tickets, ...chunkData],
      }));

      if (!isStop) {
        await this.recursiveFetch(searchId);
      }
    } catch (error) {
      return error;
    }
  };

  onFilterChange = (value) => {
    const { filters } = this.state;
    const newFilters = { ...filters };
    if (value === 'all') {
      const isAll = Object.values(filters).includes(false);
      Object.keys(filters).forEach((item) => {
        newFilters[item] = isAll;
      });
    } else {
      newFilters[value] = !filters[value];
    }
    this.setState({ filters: newFilters });
  };

  onSortByChange = (value) => {
    this.setState({ sortBy: value });
  };

  render() {
    const {
      isAllLoaded,
      tickets,
      filters,
      sortBy,
    } = this.state;
    return (
      <AppStyle>
        <GlobalStyle />
        <Header>
          <img alt="Aviasales" src={logo} width="80" height="80" />
        </Header>
        <Content>
          <ColLeft>
            <TransferFlightsFilter
              onChange={this.onFilterChange}
              filters={filters}
            />
          </ColLeft>
          <ColRight>
            <FilterButtons
              onChange={this.onSortByChange}
              sortBy={sortBy}
            />
            <TicketsList
              isAllLoaded={isAllLoaded}
              tickets={tickets}
              filters={filters}
              sortBy={sortBy}
              ticketsNumInList={this.ticketsNumInList}
            />
          </ColRight>
        </Content>
      </AppStyle>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

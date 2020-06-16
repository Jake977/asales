import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import Ticket from '../Ticket/Ticket';

const Loading = styled.div`
  width: 502px;
  height: 50px;
  text-align: center;
`;

const EmptyResult = styled.div`
  width: 502px;
  height: 50px;
  text-align: center;
`;

class Tickets extends React.Component {
  applyTicketFilters = (tickets) => {
    const { filters } = this.props;
    const enabledFilters = Object.keys(filters).filter((filterKey) => filters[filterKey]);
    return tickets.filter((ticket) => {
      const { segments } = ticket;
      const maxStops = segments.reduce((acc, segment) => (
        acc < segment.stops.length ? segment.stops.length : acc
      ), 0);
      return enabledFilters.includes(maxStops.toString());
    });
  };

  getFlightDuration = ({ segments }) => segments.reduce((acc, { duration }) => (acc + duration), 0);

  doSortTickets = (tickets) => {
    const { sortBy } = this.props;
    return tickets.sort((ticketA, ticketB) => {
      if (sortBy === 'price') {
        return ticketA.price - ticketB.price;
      }
      if (sortBy === 'duration') {
        const durationA = this.getFlightDuration(ticketA);
        const durationB = this.getFlightDuration(ticketB);
        return durationA - durationB;
      }
    });
  };

  render() {
    const { isAllLoaded, tickets, ticketsNumInList } = this.props;
    const filteredTickets = this.applyTicketFilters(tickets);
    const sortedTickets = this.doSortTickets(filteredTickets);
    const ticketsToView = sortedTickets.slice(0, ticketsNumInList);

    const ticketsList = (ticketsToView.length > 0) ? ticketsToView.map((ticket) => {
      const { price, carrier, segments } = ticket;
      const ticketId = `${segments[0].date}${price}`;
      return (
        <Ticket
          key={ticketId}
          price={price}
          carrier={carrier}
          segments={segments}
          className="ticket"
        />
      );
    }) : <EmptyResult>Ничего не найдено</EmptyResult>;

    const loadingMessage = <Loading>Loading...</Loading>;
    return isAllLoaded ? ticketsList : loadingMessage;
  }
}

Tickets.propTypes = {
  ticketsNumInList: PropTypes.number.isRequired,
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.string.isRequired,
  isAllLoaded: PropTypes.bool.isRequired,
};

export default Tickets;

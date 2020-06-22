import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import Ticket from '../Ticket/Ticket';
import '../../css/loadspiner.css';

const PlaceHolder = styled.div`
  width: 502px;
  height: 50px;
  text-align: center;
`;

class Tickets extends React.Component {
  applyTicketFilters = (tickets) => {
    const { filters } = this.props;
    const enabledFiltersArray = Object.values(filters)
      .map((elem, index) => ((elem === true) ? index : ''))
      .filter((elem) => elem === 0 || elem);
    return tickets.filter((ticket) => {
      const { segments } = ticket;
      const maxStops = segments.reduce((acc, segment) => (
        acc < segment.stops.length ? segment.stops.length : acc
      ), 0);
      return enabledFiltersArray.includes(maxStops);
    });
  };

  getFlightDuration = ({ segments }) => segments.reduce((acc, { duration }) => (acc + duration), 0);

  doSortTickets = (tickets) => {
    const { sortBy, sortVariants } = this.props;
    return tickets.sort((ticketA, ticketB) => {
      if (sortBy === sortVariants.PRICE) {
        return ticketA.price - ticketB.price;
      }
      if (sortBy === sortVariants.DURATION) {
        const durationA = this.getFlightDuration(ticketA);
        const durationB = this.getFlightDuration(ticketB);
        return durationA - durationB;
      }
      return null;
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
    }) : <PlaceHolder>Ничего не найдено</PlaceHolder>;

    const loadingMessage = (
      <PlaceHolder>
        Loading
        <div className="spinner">
          <div className="bounce1" />
          <div className="bounce2" />
          <div className="bounce3" />
        </div>
      </PlaceHolder>
    );
    return isAllLoaded ? ticketsList : loadingMessage;
  }
}

Tickets.propTypes = {
  ticketsNumInList: PropTypes.number.isRequired,
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  tickets: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortBy: PropTypes.string.isRequired,
  isAllLoaded: PropTypes.bool.isRequired,
  sortVariants: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default Tickets;

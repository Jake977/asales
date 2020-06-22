import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import Segment from './Segment/Segment';

const TicketView = styled.div`
  background: #FFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 20px;
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 24px;
  color: #2196F3;
`;

const TicketSegments = styled.div``;

const CarrierLogo = styled.img`
  margin-right: 30px;
`;

const Ticket = ({ price, carrier, segments }) => (
  <TicketView>
    <TicketHeader>
      <Price>{`${price.toLocaleString()} Р`}</Price>
      <CarrierLogo
        src={`https://pics.avs.io/99/36/${carrier}.png`}
        alt={`Carrier ${carrier}`}
        width="99"
        height="36"
      />
    </TicketHeader>
    <TicketSegments>
      {segments.map((segment) => (
        <Segment
          key={`${segment.date}`}
          {...segment}
        />
      ))}
    </TicketSegments>
  </TicketView>
);

Ticket.propTypes = {
  price: PropTypes.number.isRequired,
  carrier: PropTypes.string.isRequired,
  segments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ticket;

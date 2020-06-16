import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const SegmentView = styled.div`
  padding-top: 10px;
  display: flex;
  flex-direction: row;
  font-weight: 600;
`;

const Col = styled.div`
  width: 33.3333%;
`;

const GrayText = styled.span`
  font-size: 12px;
  line-height: 18px;
  letter-spacing: 0.5px;
  color: #A0B0B9;
  text-transform: uppercase;
`;

const BlackText = styled.span`
  font-size: 14px;
  line-height: 21px;
  color: #4A4A4A;
`;

const flightDurationView = (durationInMin) => {
  const hours = Math.trunc(durationInMin / 60);
  const minutes = durationInMin - hours * 60;
  return `${hours < 10 ? `0${hours}` : hours}ч`
    + ` ${minutes < 10 ? `0${minutes}` : minutes}м`;
};

const flightTimeView = (time) => {
  const hours = time.getUTCHours();
  const minutes = time.getUTCMinutes();
  return `${hours < 10 ? `0${hours}` : hours}:`
    + `${minutes < 10 ? `0${minutes}` : minutes}`;
};

const stopsText = (stops) => {
  let text = '';
  switch (stops.toString()) {
    case '1':
      text = 'пересадка';
      break;
    case '2':
    case '3':
    case '4':
      text = 'пересадки';
      break;
    default:
      text = 'пересадок';
      break;
  }
  return (stops > 0) ? `${stops} ${text}` : `Без ${text}`;
};

const Segment = ({
  origin,
  destination,
  date,
  stops,
  duration,
}) => {
  const startFLyTime = new Date(date);
  const finishFlyTime = new Date(startFLyTime.getTime() + duration * 60 * 1000);

  return (
    <SegmentView>
      <Col>
        <GrayText>
          {`${origin} - ${destination} `}
        </GrayText>
        <br />
        <BlackText>
          {`${flightTimeView(startFLyTime)} - ${flightTimeView(finishFlyTime)}`}
        </BlackText>
      </Col>
      <Col>
        <GrayText>
          В ПУТИ
        </GrayText>
        <br />
        <BlackText>
          {`${flightDurationView(duration)}`}
        </BlackText>
      </Col>
      <Col>
        <GrayText>
          {`${stopsText(stops.length)}`}
        </GrayText>
        <br />
        <BlackText>
          {`${stops}`}
        </BlackText>
      </Col>
    </SegmentView>
  );
};

Segment.propTypes = {
  origin: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  stops: PropTypes.arrayOf(PropTypes.string).isRequired,
  duration: PropTypes.number.isRequired,
};

export default Segment;

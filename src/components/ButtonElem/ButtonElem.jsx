import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const Btn = styled.button`
  flex-grow: 1;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  line-height: 20px;
  padding: 15px 0px;
  letter-spacing: 0.5px;
  justify-content: center;
  color: ${(props) => (props.active ? '#fff' : '#4a4a4a')};
  background-color: ${(props) => (props.active ? '#2196f3' : '#fff')};
  border: 1px solid ${(props) => (props.active ? '#2196f3' : '#dfe5ec')};
  border-radius: ${(props) => (props.btnPos === 1 ? '5px 0 0 5px' : '0 5px 5px 0')};;
`;

const ButtonElem = (props) => <Btn {...props} />;

ButtonElem.propTypes = {
  btnPos: PropTypes.number.isRequired,
  active: PropTypes.bool.isRequired,
};

export default ButtonElem;

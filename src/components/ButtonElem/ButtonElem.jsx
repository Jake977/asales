import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';

const Btn = styled.button`
  flex-grow: 1;
  cursor: pointer;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  padding: 15px 0px;
  justify-content: center;
  color: ${(props) => (props.active ? '#fff' : '#4a4a4a')};
  background-color: ${(props) => (props.active ? '#2196f3' : '#fff')};
  border: 1px solid ${(props) => (props.active ? '#2196f3' : '#dfe5ec')};
`;

const ButtonElem = (props) => <Btn {...props} />;

ButtonElem.propTypes = {
  active: PropTypes.bool.isRequired,
};

export default ButtonElem;

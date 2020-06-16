import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import checkmark from '../../img/checkmark.svg';

const CheckBoxView = styled.div`
  display: flex;
  vertical-align: middle;
`;

const Input = styled.input`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

const InputView = styled.div`
  margin-right: 10px;
  margin-left: 20px;
  height: ${(prop) => prop.size || '20px'};
  width: ${(prop) => prop.size || '20px'};
  box-sizing: border-box;
  content: '';
  border-radius: 2px;
  border: 1px solid ${(props) => (props.checked ? '#2196f3' : '#9ABBCE')};
  background-image: ${(props) => (props.checked ? `url(${checkmark})` : 'none')};
  background-position: center center;
  background-size: 12px 8px;
  background-repeat: no-repeat;
`;

const CustomCheckBox = ({ name, checked, onChange }) => (
  <CheckBoxView>
    <Input
      type="checkbox"
      name={name}
      checked={checked}
      onChange={onChange}
    />
    <InputView checked={checked} />
  </CheckBoxView>
);

CustomCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CustomCheckBox;

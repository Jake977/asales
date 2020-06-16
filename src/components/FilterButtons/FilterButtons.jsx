import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import ButtonElem from '../ButtonElem/ButtonElem';


const FilterButtonsView = styled.div`
  display: flex;
  flex-direction: row;
  background: #FFF;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  border-radius: 5px;
`;

const FilterButtons = ({ sortBy, onChange }) => (
  <FilterButtonsView>
    <ButtonElem
      type="button"
      active={sortBy === 'price'}
      onClick={() => (onChange('price'))}
    >
      Самый дешевый
    </ButtonElem>
    <ButtonElem
      type="button"
      active={sortBy === 'duration'}
      onClick={() => (onChange('duration'))}
    >
      Самый быстрый
    </ButtonElem>
  </FilterButtonsView>
);

FilterButtons.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default FilterButtons;

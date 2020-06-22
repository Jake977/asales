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

const FilterButtons = ({ sortBy, onChange, sortVariants }) => (
  <FilterButtonsView>
    <ButtonElem
      type="button"
      btnPos={1}
      active={sortBy === sortVariants.PRICE}
      onClick={() => (onChange(sortVariants.PRICE))}
    >
      Самый дешевый
    </ButtonElem>
    <ButtonElem
      type="button"
      btnPos={2}
      active={sortBy === sortVariants.DURATION}
      onClick={() => (onChange(sortVariants.DURATION))}
    >
      Самый быстрый
    </ButtonElem>
  </FilterButtonsView>
);

FilterButtons.propTypes = {
  sortBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  sortVariants: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default FilterButtons;

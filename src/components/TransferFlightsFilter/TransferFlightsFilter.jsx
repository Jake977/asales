import React from 'react';
import styled from 'styled-components';
import * as PropTypes from 'prop-types';
import CustomCheckBox from '../CustomCheckbox/CustomCheckbox';

const TransferFilterBlock = styled.form`
  background: #FFFFFF;
  min-width: 232px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 20px 0px;
`;

const FiltersTitle = styled.div`
  text-align: center;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  letter-spacing: 0.5px;
  line-height: 12px;
  margin-bottom: 20px;
  margin-top: 0;
  text-transform: uppercase;
`;

const Label = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 40px;
  color: #4a4a4a;
  font-size: 13px;
  font-style: normal;
  font-weight: normal;
  line-height: 20px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }
  
  &:hover {
    background: #F1FCFF;
  }  
`;

const TransferFlightsFilter = ({ onChange, filters }) => {
  const isAll = !Object.values(filters).includes(false);
  return (
    <TransferFilterBlock>
      <FiltersTitle>Количество пересадок</FiltersTitle>
      <Label key="all">
        <CustomCheckBox
          name="transfer"
          value="all"
          checked={isAll}
          onChange={() => onChange('all')}
        />
        Все
      </Label>
      <Label key="noTransfer">
        <CustomCheckBox
          name="transfer"
          checked={filters.noTransfer}
          onChange={() => onChange('noTransfer')}
        />
        Без пересадок
      </Label>
      <Label key="oneTransfer">
        <CustomCheckBox
          name="transfer"
          checked={filters.oneTransfer}
          onChange={() => onChange('oneTransfer')}
        />
        1 пересадка
      </Label>
      <Label key="twoTransfer">
        <CustomCheckBox
          name="transfer"
          checked={filters.twoTransfers}
          onChange={() => onChange('twoTransfers')}
        />
        2 пересадки
      </Label>
      <Label key="threeTransfer">
        <CustomCheckBox
          name="transfer"
          checked={filters.threeTransfers}
          onChange={() => onChange('threeTransfers')}
        />
        3 пересадки
      </Label>
    </TransferFilterBlock>
  );
};

TransferFlightsFilter.propTypes = {
  filters: PropTypes.objectOf(PropTypes.bool).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TransferFlightsFilter;

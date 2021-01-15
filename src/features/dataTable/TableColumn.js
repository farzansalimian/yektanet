import React from 'react';
import PropTypes from 'prop-types';
import { ArrowIcon } from '../../assets/svgIcons';

function TableColumn(props) {
  const { onClick, text, hasSortIcon, isDescending } = props;

  return (
    <th onClick={onClick}>
      <div className={'table-th-content'}>
        <span className={`table-arrow-icon ${isDescending && 'rotate'} ${!hasSortIcon && 'hide'}`}>
          <ArrowIcon />
        </span>
        <span>{text}</span>
      </div>
    </th>
  );
}

TableColumn.defaultProps = {
  hasSortIcon: false,
  isDescending: false,
};
TableColumn.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isDescending: PropTypes.bool,
  hasSortIcon: PropTypes.bool,
};

export default TableColumn;

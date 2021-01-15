import React, { memo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import FILTER_PLACE_HOLDERS from '../../constants/filterPlaceHolders';
import useDebounce from '../../hooks/useDebounce';

function TableRow(props) {
  const { id, name, date, title, field, newValue, oldValue } = props;
  const [isFavourite, setIsFavourite] = useState(false);

  useEffect(() => {
    setIsFavourite(!!localStorage.getItem(id));
  }, [id]);

  const onClick = useDebounce(100, () => {
    if (isFavourite) localStorage.removeItem(id);
    else localStorage.setItem(id, id);
    setIsFavourite(!isFavourite);
  });

  return (
    <tr onClick={onClick} className={isFavourite ? 'favourite' : ''}>
      <td data-label={FILTER_PLACE_HOLDERS.name}>{name}</td>
      <td data-label={FILTER_PLACE_HOLDERS.date}>{date}</td>
      <td data-label={FILTER_PLACE_HOLDERS.title}>{title}</td>
      <td data-label={FILTER_PLACE_HOLDERS.field}>{field}</td>
      <td data-label={FILTER_PLACE_HOLDERS.new_value}>{newValue}</td>
      <td data-label={FILTER_PLACE_HOLDERS.old_value}>{oldValue}</td>
    </tr>
  );
}

TableRow.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  field: PropTypes.string.isRequired,
  newValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  oldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
TableRow.defaultProps = {};
export default memo(TableRow);

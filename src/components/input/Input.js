import React from 'react';
import PropTypes from 'prop-types';
import './input.css';

function Input(props) {
  const { onChange, placeholder, value } = props;

  // Highlight text on focus
  const onFocus = (event) => {
    event.target.select();
  };

  return (
    <input
      className={'input'}
      placeholder={placeholder}
      onChange={onChange}
      onFocus={onFocus}
      value={[null, undefined].includes(value) ? '' : value}
    />
  );
}

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Input.defaultProps = {
  placeholder: '',
  value: '',
};

export default Input;

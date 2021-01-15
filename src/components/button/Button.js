import React from 'react';
import PropTypes from 'prop-types';
import './button.css';

function Button(props) {
  const { onClick, text } = props;

  return (
    <button className={'button'} onClick={onClick}>
      {text}
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func.isRequired,
};
Button.defaultProps = {
  text: '',
};

export default Button;

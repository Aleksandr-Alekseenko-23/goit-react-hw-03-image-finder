import React from 'react';
import css from './Button.module.css';
import PropTypes from 'prop-types';

function Button({ onSubmit }) {
  return (
    <button type="button" onClick={onSubmit} className={css.Button}>
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

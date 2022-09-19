import React, { Component } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeydown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeydown);
  }

  handleKeydown = ({ code }) => {
    if (code === 'Escape') this.props.toggleModal();
  };

  handleOverlayClick = ({ target, currentTarget }) => {
    if (currentTarget === target) this.props.toggleModal();
  };

  render() {
    const {
      dataModal: { src, title },
    } = this.props;

    return (
      <div className={css.Overlay} onClick={this.handleOverlayClick}>
        <div className={css.Modal}>
          <img src={src} alt={title} />
        </div>
        ;
      </div>
    );
  }
}

export default Modal;

Modal.propTypes = {
  toggleModal: PropTypes.func.isRequired,
  dataModal: PropTypes.shape({
    src: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
};

import React, { useEffect } from 'react';
import css from './Modal.module.css';
import PropTypes from 'prop-types';

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.code === 'Escape') {
        closeModal();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeModal]);

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={css.overlay} onClick={handleOverlayClick} tabIndex={0}>
      <div className={css.modal}>{children}</div>

      <button className={css.closeButton} type="button" onClick={closeModal}>
        &times;
      </button>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default Modal;

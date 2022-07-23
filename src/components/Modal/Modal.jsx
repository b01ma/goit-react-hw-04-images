import React, { useEffect } from 'react';
import css from './Modal.module.css';
// import { Component } from 'react/cjs/react.production.min';
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
  }, []);

  function handleClick() {
    closeModal();
  }

  function handleOverlayClick(e) {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  }

  return (
    <div className={css.overlay} onClick={handleOverlayClick} tabIndex={0}>
      <div className={css.modal}>{children}</div>

      <button className={css.closeButton} type="button" onClick={handleClick}>
        X
      </button>
    </div>
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleClick = () => {
//     this.props.closeModal();
//   };

//   handleOverlayClick = e => {
//     if (e.target === e.currentTarget) {
//       this.props.closeModal();
//     }
//   };

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.closeModal();
//     }
//   };

//   render() {
//     Modal.propTypes = {
//       closeModal: PropTypes.func.isRequired,
//     };
//     return (
//       <div
//         className={css.overlay}
//         onClick={this.handleOverlayClick}
//         tabIndex={0}
//       >
//         <div className={css.modal}>{this.props.children}</div>

//         <button
//           className={css.closeButton}
//           type="button"
//           onClick={this.handleClick}
//         >
//           X
//         </button>
//       </div>
//     );
//   }
// }

export default Modal;

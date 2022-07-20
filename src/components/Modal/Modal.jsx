import css from './Modal.module.css';
import { Component } from 'react/cjs/react.production.min';
import PropTypes from 'prop-types';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleClick = () => {
    this.props.closeModal();
  };

  handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    Modal.propTypes = {
      closeModal: PropTypes.func.isRequired,
    };
    return (
      <div
        className={css.overlay}
        onClick={this.handleOverlayClick}
        tabIndex={0}
      >
        <div className={css.modal}>{this.props.children}</div>

        <button
          className={css.closeButton}
          type="button"
          onClick={this.handleClick}
        >
          X
        </button>
      </div>
    );
  }
}

export default Modal;

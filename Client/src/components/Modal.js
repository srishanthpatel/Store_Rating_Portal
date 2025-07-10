import React from 'react';
import '../styles.css'
import ReactDOM from 'react-dom';

class Modal extends React.Component {
  render() {
    const { isOpen, onClose, children } = this.props;
    if (!isOpen) return null;

    return ReactDOM.createPortal(
      <>
        <div className="backdrop" onClick={onClose} />
        <div className="modal">
          <button className="close-btn" onClick={onClose}>✕</button>
          {children}
        </div>
      </>,
      document.body
    );
  }
}

export default Modal;

import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, content, modalSize }) => {
  if (!isOpen) return null;

  const getModalClass = () => {
    switch (modalSize) {
      case 'large':
        return styles.modalLarge;
      case 'small':
        return styles.modalSmall;
      case 'left':
        return styles.modalLeft;
      default:
        return styles.modalDefault;
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${getModalClass()}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className={styles.modalContent}>{content}</div>
      </div>
    </div>
  );
};

export default Modal;

import { React, useEffect } from 'react';
import styles from './Modal.module.css';
import close from '../../images/close.png';

const Modal = ({ isModalOn, handleClose, children }) => {
  return (
    <>
      <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={handleClose}
          />
          {/* ** */}
          {children}
          {/* ** */}
        </div>
      </div>
    </>
  );
};

export default Modal;

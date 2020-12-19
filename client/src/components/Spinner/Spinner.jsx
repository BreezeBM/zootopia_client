import React from 'react';
import spinnerImg from '../../images/spinner.gif';
import styles from './Spinner.module.css';

const Spinner = ({ isSpinnerOn }) => {
  return (
    <div className={`${styles.spinner} ${isSpinnerOn && styles.isOn}`}>
      <div className={styles.nowLoading}>
        <img
          className={styles.spinnerImg}
          src={spinnerImg}
          alt="loading spinner"
        />
        <div className={styles.loadingMessage}>Now Loading...</div>
      </div>
    </div>
  );
};

export default Spinner;

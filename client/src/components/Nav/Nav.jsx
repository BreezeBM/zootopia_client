import React from 'react';
import styles from './Nav.module.css';
import logoImg from '../../images/zootopiaLogo.png';

const Nav = () => {
  return (
    <div className={styles.navBar}>
      <img className={styles.logoImg} src={logoImg} alt="logo" />
      <div className={styles.rest}>
        <div className={styles.menu}>
          <div className={styles.chat}>Chat</div>
          <div className={styles.mypage}>Mypage</div>
          <div className={styles.logout}>Logout</div>
        </div>
      </div>
    </div>
  );
};
export default Nav;

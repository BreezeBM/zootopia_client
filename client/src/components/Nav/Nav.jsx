import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Nav.module.css';
import logoImg from '../../images/zootopiaLogo.png';
import MypageModal from '../MypageModal/MypageModal';

const Nav = () => {
  const [isMypageOn, setIsMypageOn] = useState(false);
  const history = useHistory();
  const viewMypage = () => {
    setIsMypageOn(!isMypageOn);
  };

  return (
    <>
      <MypageModal isModalOn={isMypageOn} handleClose={viewMypage} />
      <div className={styles.navBar}>
        <img
          className={styles.logoImg}
          src={logoImg}
          alt="logo"
          onClick={() => {
            history.push('/main');
          }}
        />
        <div className={styles.menu}>
          <div
            className={styles.chat}
            onClick={() => {
              history.push('/chat');
            }}
          >
            Chat
          </div>
          <div className={styles.mypage} onClick={viewMypage}>
            Mypage
          </div>
          <div className={styles.logout}>Logout</div>
        </div>
      </div>
    </>
  );
};
export default Nav;

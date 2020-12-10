import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Nav.module.css';
import logoImg from '../../images/zootopiaLogo.png';
import MypageModal from '../MypageModal/MypageModal';

const Nav = ({ profile, acceptPosts }) => {
  const [isMypageOn, setIsMypageOn] = useState(false);
  const history = useHistory();
  const viewMypage = () => {
    setIsMypageOn(!isMypageOn);
  };
  return (
    <>
      {Object.keys(profile).length !== 0 && (
        <MypageModal
          profile={profile}
          isModalOn={isMypageOn}
          handleClose={viewMypage}
        />
      )}

      <div className={styles.navBar}>
        <img
          className={styles.logoImg}
          src={logoImg}
          alt="logo"
          onClick={() => {
            acceptPosts(0, 0, 0, 15);
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

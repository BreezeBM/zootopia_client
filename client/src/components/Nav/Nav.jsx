import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './Nav.module.css';
import logoImg from '../../images/zootopiaLogo.png';
import MypageModal from '../MypageModal/MypageModal';

const Nav = ({
  kind,
  userProfile,
  acceptUserData,
  setUserProfile,
  profile,
  acceptPosts,
  setProfile,
}) => {
  const [isMypageOn, setIsMypageOn] = useState(false);
  const history = useHistory();
  const viewMypage = () => {
    setIsMypageOn(!isMypageOn);
  };

  const clickLogoFunc = () => {
    if (window.location.href === 'https://71f4c732e2e5.ngrok.io/main') {
      acceptPosts(0);
      acceptUserData(0);
    }
    history.push('/main');
  };

  return (
    <>
      {Object.keys(profile).length !== 0 && (
        <MypageModal
          kind={kind}
          setProfile={setProfile}
          userProfile={userProfile}
          setUserProfile={setUserProfile}
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
          onClick={clickLogoFunc}
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

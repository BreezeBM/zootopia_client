/* eslint-disable radix */
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
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
    if (isMypageOn) {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
      setIsMypageOn(!isMypageOn);
    } else {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      setIsMypageOn(!isMypageOn);
    }
  };

  const clickLogoFunc = () => {
    if (window.location.href === 'https://www.codestates-project.tk/main') {
      acceptPosts(0);
      acceptUserData(0);
    }
    history.push('/main');
  };

  const logoutFunc = async () => {
    try {
      await axios.post(
        'https://server.codestates-project.tk/auth/logout',
        {},
        {
          withCredentials: true,
        },
      );
      history.push('/');
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
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
          <div className={styles.logout} onClick={logoutFunc}>
            Logout
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;

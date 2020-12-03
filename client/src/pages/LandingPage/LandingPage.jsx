import React from 'react';
import styles from './LandingPage.module.css';
import googleImg from '../../images/google.png';
import githubImg from '../../images/github.png';
import gusetImg from '../../images/guest.png';

const LandingPage = () => {
  const githubId = 'c88e8e9bc0063cfe57df';
  const githubReURI = 'https://server.codestates-project.tk/auth/github';

  const handleLogin = async (e) => {
    if (e.target.name === 'google') {
      alert('1.2패치 이후 제공예정');
    } else if (e.target.name === 'github') {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubId}&scope=user:email&redirect_uri=${githubReURI}`;
    } else if (e.target.name === 'guest') {
      alert('1.2패치 이후 제공예정');
    }
  };

  return (
    <>
      <div className={styles.landingpage}>
        <div className={styles.login}> Select Login Option</div>
        <div className={styles.buttonBox}>
          <img
            className={styles.google}
            src={googleImg}
            alt="google_img"
            name="google"
            onClick={handleLogin}
          />
          <img
            className={styles.github}
            src={githubImg}
            alt="github_img"
            name="github"
            onClick={handleLogin}
          />
          <img
            className={styles.guest}
            src={gusetImg}
            alt="guest_img"
            name="guest"
            onClick={handleLogin}
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;

/*  <div className={styles.whitebox}>
          <div className={styles.nohuman}> </div>
          <div className={styles.catman}> </div>
          <div className={styles.huntingman}> </div>
        </div>

*/

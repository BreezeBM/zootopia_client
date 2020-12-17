import { React, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './LandingPage.module.css';
import googleImg from '../../images/google.png';
import githubImg from '../../images/github.png';
import gusetImg from '../../images/guest.png';

const LandingPage = () => {
  const githubId = 'c88e8e9bc0063cfe57df';
  const githubReURI = 'https://server.codestates-project.tk/auth/github';
  const googleId =
    '162389495757-7kkbjf2q1n5moi2kdk4i217p7qeo1umm.apps.googleusercontent.com';
  const googleReURI = 'https://server.codestates-project.tk/auth/google';
  const history = useHistory();

  const handleLogin = async (e) => {
    if (e.target.name === 'google') {
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleId}&redirect_uri=${googleReURI}&response_type=code&scope=email`;
    } else if (e.target.name === 'github') {
      window.location.href = `https://github.com/login/oauth/authorize?client_id=${githubId}&scope=user:email&redirect_uri=${githubReURI}`;
    } else if (e.target.name === 'guest') {
      const config = {
        method: 'get',
        url: 'https://server.codestates-project.tk/auth/guest',
        withCredentials: true,
      };

      axios(config)
        .then(function (response) {
          console.log(response);
          history.push('/main');
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const checkToken = async () => {
    try {
      await axios.get(`https://server.codestates-project.tk/user/0`, {
        withCredentials: true,
      });
      history.push('/main');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

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

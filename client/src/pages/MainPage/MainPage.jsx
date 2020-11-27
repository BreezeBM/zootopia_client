import React from 'react';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import profileImg from '../../images/iguana.jpeg';
import addPostImg from '../../images/bark.png';

const MainPage = () => {
  const viewProfile = () => {
    console.log('해당 프로필 유저의 posts를 렌더링');
  };

  return (
    <div className={styles.main}>
      <div className={styles.flexBox}>
        <div className={styles.profile} onClick={viewProfile}>
          <img src={profileImg} className={styles.image} alt="profile_img" />
          <div className={styles.petName}>이구아인</div>
          <div className={styles.breed}>이구아나</div>
          <div className={styles.postsCount}>Posts</div>
          <div className={styles.postsCountNumber}>22</div>
        </div>
        <Posts />
      </div>
      <div className={styles.addButton}>
        <img className={styles.addPostImg} src={addPostImg} alt="addPost" />
      </div>
    </div>
  );
};
export default MainPage;

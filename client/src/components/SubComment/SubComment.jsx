import React from 'react';
import styles from './SubComment.module.css';
import dummyImg from '../../thumbnails/post_f.png';

const SubComment = () => {
  return (
    <div className={styles.subComment}>
      <img className={styles.profile} src={dummyImg} alt="profile" />
      <div className={styles.nickname}>스눕독</div>
      <div className={styles.text}>핏불이 앨범안내냐</div>
      <div className={styles.date}>지금</div>
    </div>
  );
};

export default SubComment;

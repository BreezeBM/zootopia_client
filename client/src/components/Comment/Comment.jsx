import React from 'react';
import styles from './Comment.module.css';
import dummyImg from '../../thumbnails/post_c.png';
import SubComments from '../SubComments/SubComments';

const Comment = () => {
  return (
    <div className={styles.eachComment}>
      <div className={styles.comment}>
        <img className={styles.profile} src={dummyImg} alt="profile" />
        <div className={styles.nickname}>핏불독핏불독핏불독핏불독핏불독</div>
        <div className={styles.text}>눕도기 잘지내냐</div>
        <div className={styles.date}>지금</div>
      </div>
      <SubComments />
    </div>
  );
};

export default Comment;

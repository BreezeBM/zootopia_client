import React from 'react';
import styles from './Comment.module.css';
import dummyImg from '../../thumbnails/post_c.png';
import SubComments from '../SubComments/SubComments';

const Comment = () => {
  return (
    <div className={styles.eachComment}>
      <div className={styles.subComment}>
        <div className={styles.contentsPart}>
          <img className={styles.profile} src={dummyImg} alt="profile" />
          <div className={styles.commentPart}>
            <span className={styles.nickname}>핏불이삼촌</span>
            &nbsp;&nbsp;<span className={styles.tagName}>@스눕독고모부</span>
            &nbsp;&nbsp;정신못차리네;
          </div>
        </div>
        <div className={styles.dateAndBtnPart}>
          <span className={styles.date}>지금</span>
          <span className={styles.commentBtn}>답글 달기</span>
        </div>
      </div>
      <SubComments />
    </div>
  );
};

export default Comment;

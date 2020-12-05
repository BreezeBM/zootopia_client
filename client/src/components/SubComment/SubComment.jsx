import React from 'react';
import styles from './SubComment.module.css';
import dummyImg from '../../thumbnails/post_f.png';

const SubComment = () => {
  return (
    <div className={styles.subComment}>
      <div className={styles.contentsPart}>
        <img className={styles.profile} src={dummyImg} alt="profile" />
        <div className={styles.commentPart}>
          <span className={styles.nickname}>스눕독고모부</span>
          &nbsp;&nbsp;<span className={styles.tagName}>@핏불이삼촌</span>
          &nbsp;&nbsp;핏불이 요즘 앨범 안내냐 분발하자
        </div>
      </div>
      <div className={styles.dateAndBtnPart}>
        <span className={styles.date}>지금</span>
        <span className={styles.commentBtn}>답글 달기</span>
      </div>
    </div>
  );
};

export default SubComment;

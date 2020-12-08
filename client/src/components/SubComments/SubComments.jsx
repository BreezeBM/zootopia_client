import React from 'react';
import styles from './SubComments.module.css';
import SubComment from '../SubComment/SubComment';

const SubComments = ({ handleCommentBtn }) => {
  return (
    <div className={styles.subComments}>
      <SubComment handleCommentBtn={handleCommentBtn} />
      <SubComment handleCommentBtn={handleCommentBtn} />
      <SubComment handleCommentBtn={handleCommentBtn} />
    </div>
  );
};

export default SubComments;

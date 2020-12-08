import React from 'react';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';

const Comments = ({ handleCommentBtn }) => {
  return (
    <div className={styles.comments}>
      <Comment handleCommentBtn={handleCommentBtn} />
      <Comment handleCommentBtn={handleCommentBtn} />
    </div>
  );
};

export default Comments;

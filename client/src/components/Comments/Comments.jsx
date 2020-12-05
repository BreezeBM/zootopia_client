import React from 'react';
import styles from './Comments.module.css';
import Comment from '../Comment/Comment';

const Comments = () => {
  return (
    <div className={styles.comments}>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
};

export default Comments;

import React from 'react';
import styles from './SubComments.module.css';
import SubComment from '../SubComment/SubComment';

const SubComments = () => {
  return (
    <div className={styles.subComments}>
      <SubComment />
      <SubComment />
    </div>
  );
};

export default SubComments;

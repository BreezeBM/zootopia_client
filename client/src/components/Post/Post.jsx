import React from 'react';
import styles from './Post.module.css';
import img from '../../thumbnails/post_f.png';

const Post = ({ viewPost }) => {
  return (
    <div className={styles.grid_item} onClick={viewPost}>
      <img className={styles.thumbnail} src={img} alt="post" />
    </div>
  );
};

export default Post;

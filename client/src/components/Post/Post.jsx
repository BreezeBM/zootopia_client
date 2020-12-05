import React from 'react';
import styles from './Post.module.css';
// import img from '../../thumbnails/post_g.png';

const Post = ({ viewPost, thumbnail }) => {
  return (
    <div className={styles.grid_item} onClick={viewPost}>
      <img className={styles.thumbnail} src={thumbnail} alt="post" />
    </div>
  );
};

export default Post;

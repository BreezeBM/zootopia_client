import React from 'react';
import styles from './Post.module.css';

const Post = ({ postId, viewPost, thumbnail }) => {
  const viewPostModal = (id) => {
    viewPost(id);
  };

  return (
    <div
      className={styles.grid_item}
      onClick={() => {
        viewPostModal(postId);
      }}
    >
      <img className={styles.thumbnail} src={thumbnail} alt="post" />
    </div>
  );
};

export default Post;

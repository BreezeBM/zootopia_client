import { React, useEffect } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';

const Posts = ({ posts, addPost, viewPost }) => {
  //   infinite scroll logic with IntersectionObserver API
  const options = {
    root: document.querySelector(styles.grid_container),
    rootMargin: '0px',
    threshold: 1.0,
  };

  const callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.boundingClientRect.top >= 870)
        addPost();
    });
  };

  const observer = new IntersectionObserver(callback, options);

  useEffect(() => {
    const target = document.querySelector('.observer');
    observer.observe(target);
  }, []);

  return (
    <div className={styles.grid_border}>
      <div className={styles.grid_container}>
        {posts.map((post, idx) => (
          <Post dummyData={post.title} key={idx} viewPost={viewPost} />
        ))}
        <div className="observer" />
      </div>
    </div>
  );
};

export default Posts;

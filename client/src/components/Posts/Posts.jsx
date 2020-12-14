import { React, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import styles from './Posts.module.css';
import Post from '../Post/Post';

const Posts = ({ isDone, postsCount, posts, getMorePosts, viewPost }) => {
  // infinite scroll logic with IntersectionObserver API
  const targetRef = useRef(null);
  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      getMorePosts();
    }

    setTimeout(() => {
      observer.observe(entry.target);
    }, 4000);
  };

  const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
  useEffect(() => {
    observer.observe(targetRef.current);
  }, []);

  return (
    <>
      <div className={styles.emptySpace} />
      <div className={styles.grid_container}>
        {posts.map((post, idx) => {
          return (
            <Post
              thumbnail={post.thumbnail}
              // key={post.postId}
              key={idx}
              postId={post.postId}
              viewPost={viewPost}
            />
          );
        })}
      </div>
      <div
        ref={targetRef}
        className={`${styles.target} ${
          !isDone && postsCount >= 15 && styles.isOn
        }`}
      >
        Loading...
        <i className="fas fa-fan fa-spin" />
      </div>
    </>
  );
};

export default Posts;

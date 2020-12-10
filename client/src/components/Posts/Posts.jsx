import { React, useRef, useState, useEffect } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';

const Posts = ({
  userProfile,
  isDone,
  userId,
  isLoading,
  postsCount,
  posts,
  addPosts,
  kind,
  viewPost,
}) => {
  // infinite scroll logic with IntersectionObserver API
  const targetRef = useRef(null);

  const infiniteScroll = async () => {
    // if (kind === 'latest') {
    //   await addPosts(0, posts[0].postId, postsCount, 15);
    // } else if (kind === 'user') {
    //   await addPosts(userProfile.userId, posts[0].postId, postsCount, 15);
    // } else {
    //   await addPosts(userId, posts[0].postId, postsCount, 15);
    // }
    if (kind === 'latest') {
      await addPosts(0);
    } else if (kind === 'user') {
      await addPosts(0);
    } else {
      await addPosts(0);
    }
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      if (!isLoading) {
        infiniteScroll();
      }
      observer.observe(entry.target);
    }
  };

  const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });

  useEffect(() => {
    observer.observe(targetRef.current);
  }, []);

  return (
    <>
      <div className={styles.emptySpace} />
      <div className={styles.grid_container}>
        {posts.map((post) => {
          return (
            <Post
              thumbnail={post.thumbnail}
              key={post.postId}
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

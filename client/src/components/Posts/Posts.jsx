import { React, useRef, useState } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';
import useIntersectionObserver from '../useIntersectionObserver/useIntersectionObserver';

const Posts = ({ postsCount, isLoading, posts, addPosts, viewPost }) => {
  //   infinite scroll logic with IntersectionObserver API
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  const [renderCount, setRenderCount] = useState(0);
  useIntersectionObserver({
    root: rootRef.current,
    target: targetRef.current,
    onIntersect: ([{ isIntersecting }]) => {
      if (isIntersecting && !isLoading && postsCount >= 13) {
        if (renderCount === 0) {
          setRenderCount(renderCount + 1);
          return;
        }
        addPosts();
      }
    },
  });

  return (
    <div ref={rootRef} className={styles.grid_border}>
      <div className={styles.grid_container}>
        {posts.map((post, idx) => {
          return (
            <Post
              thumbnail={post.thumbnail}
              key={idx}
              // post.postId
              viewPost={viewPost}
            />
          );
        })}
      </div>
      <div
        ref={targetRef}
        className={`${styles.target} ${postsCount >= 13 && styles.isOn}`}
      >
        Loading..
        {/* <div className={styles.spinner}>
          <i className="fas fa-sync" />
        </div> */}
      </div>
    </div>
  );
};

export default Posts;

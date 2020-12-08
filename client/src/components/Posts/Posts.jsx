import { React, useRef, useState } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';
import useIntersectionObserver from '../useIntersectionObserver/useIntersectionObserver';

const Posts = ({
  // userId
  postsCount,
  isLoading,
  posts,
  // addPosts,
  viewPost,
}) => {
  //   infinite scroll logic with IntersectionObserver API
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  console.log(posts);
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
        console.log('hello');
        // addPosts(userId, posts[0].postId, postsCount, 15);
      }
    },
  });

  return (
    <div ref={rootRef} className={styles.grid_border}>
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

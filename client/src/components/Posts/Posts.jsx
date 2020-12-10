import { React, useRef, useState } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';
import useIntersectionObserver from '../useIntersectionObserver/useIntersectionObserver';

const Posts = ({
  userProfile,
  isDone,
  setIsLoading,
  userId,
  isLoading,
  postsCount,
  posts,
  addPosts,
  kind,
  viewPost,
}) => {
  // infinite scroll logic with IntersectionObserver API
  const rootRef = useRef(null);
  const targetRef = useRef(null);
  const [renderCount, setRenderCount] = useState(0);

  useIntersectionObserver({
    root: rootRef.current,
    target: targetRef.current,
    onIntersect: async ([{ isIntersecting }]) => {
      setIsLoading(false);
      if (isIntersecting && !isDone && postsCount >= 13 && !isLoading) {
        setIsLoading(true);
        if (renderCount === 0) {
          setRenderCount(renderCount + 1);
          return;
        }
        if (kind === 'latest') {
          await addPosts(0, posts[0].postId, postsCount, 15);
        } else if (kind === 'user') {
          await addPosts(userProfile.userId, posts[0].postId, postsCount, 15);
        } else {
          await addPosts(userId, posts[0].postId, postsCount, 15);
        }
        // setIsLoading(false);
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
        className={`${styles.target} ${postsCount >= 15 && styles.isOn}`}
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

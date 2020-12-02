import { React, useEffect, createRef } from 'react';
import styles from './Posts.module.css';
import Post from '../Post/Post';

const Posts = ({ posts, addPost, viewPost }) => {
  //   infinite scroll logic with IntersectionObserver API
  const target = createRef();
  // const [isLoaded, setIsLoaded] = useState(false);

  const fetchItems = async () => {
    // setIsLoaded(true);
    await addPost();
    // setIsLoaded(false);
  };

  const onIntersect = async ([entry], observer) => {
    if (entry.isIntersecting) {
      console.log('intersecting');
      observer.unobserve(entry.target);
      await fetchItems();
      observer.observe(entry.target);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.grid_border}>
      <div className={styles.grid_container}>
        {posts.map((post, idx) => (
          <Post dummyData={post.title} key={idx} viewPost={viewPost} />
        ))}
        <div ref={target} className={styles.observer}>
          isLoading...
        </div>
      </div>
    </div>
  );
};

export default Posts;

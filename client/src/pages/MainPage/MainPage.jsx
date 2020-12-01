import React, { useState } from 'react';
// import axios from 'axios';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import profileImg from '../../images/iguana.jpeg';
import addPostImg from '../../images/bark.png';
import PostModal from '../../components/PostModal/PostModal';
import PostNewFormModal from '../../components/PostNewFormModal/PostNewFormModal';

const MainPage = () => {
  const viewProfile = () => {
    console.log('해당 프로필 유저의 posts를 렌더링');
  };
  const fakePosts = [
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
    { title: 'a' },
  ];
  const [posts, setPosts] = useState(fakePosts);
  //   const [isLoading, setIsLoading] = useState(false);
  const addPost = async () => {
    const arr = [
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
      { title: 'a' },
    ];
    await setPosts((prev) => {
      return [...arr, ...prev];
    });
  };
  const [isAddPostOn, setIsAddPostOn] = useState(false);
  const [isPostOn, setIsPostOn] = useState(false);
  const viewAddPost = () => {
    setIsAddPostOn(!isAddPostOn);
  };
  const viewPost = () => {
    setIsPostOn(!isPostOn);
  };

  return (
    <>
      <PostNewFormModal isModalOn={isAddPostOn} handleClose={viewAddPost} />
      <PostModal isModalOn={isPostOn} handleClose={viewPost} />
      <div className={styles.main}>
        <div className={styles.flexBox}>
          <div className={styles.profile} onClick={viewProfile}>
            <img src={profileImg} className={styles.image} alt="profile_img" />
            <div className={styles.petName}>이구아인</div>
            <div className={styles.breed}>이구아나</div>
            <div className={styles.postCountPart}>
              <div className={styles.postsCount}>Posts</div>
              <div className={styles.postsCountNumber}>22</div>
            </div>
          </div>
          <Posts addPost={addPost} posts={posts} viewPost={viewPost} />
          {/* {isLoading ? <div>isLoading...</div> : null} */}
        </div>
        <div className={styles.addButton} onClick={viewAddPost}>
          <img className={styles.addPostImg} src={addPostImg} alt="addPost" />
        </div>
      </div>
    </>
  );
};
export default MainPage;

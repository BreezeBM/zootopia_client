import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import addPostImg from '../../images/bark.png';
import PostModal from '../../components/PostModal/PostModal';
import PostNewFormModal from '../../components/PostNewFormModal/PostNewFormModal';
// test용 fakedata
// import fakedata from '../../fakeData';

const MainPage = ({
  from,
  offsetCount,
  acceptUserData,
  kind,
  setProfileForDeleteAndAdd,
  userProfile,
  isDone,
  setUserProfile,
  setPosts,
  posts,
  getPosts,
  profile,
  deletePost,
  getMorePosts,
  axiosInform,
}) => {
  // 1) ComponentDidMount(첫 렌더링시에)로 유저 정보와 latest posts 정보를 받아오고 re render
  const firstOptionFunc = () => {
    getPosts(0);
    acceptUserData(0);
  };

  useEffect(() => {
    firstOptionFunc();
  }, []);

  const history = useHistory();

  // 새로운 포스트를 만드는 모달창을 끄고, 켜는 state & functions
  const [isAddPostOn, setIsAddPostOn] = useState(false);
  const viewAddPost = () => {
    setIsAddPostOn(!isAddPostOn);
  };
  // #######################################################

  // #######################################################
  // postModal창이 켜져있는지 아닌지, default : false
  // PostModal창의 내용들 refresh 하는 function
  const [postModaldata, setPostModalData] = useState({});
  const refreshPost = async (data) => {
    setPostModalData((prev) => {
      return { ...prev, comments: data };
    });
  };
  // #######################################################

  // #######################################################
  // 포스트 보기
  const [isPostOn, setIsPostOn] = useState(false);
  const viewPost = async (postId) => {
    if (isPostOn) {
      // 만약에 켜져있으면, false로 다시 끄기
      setIsPostOn(false);
    } else {
      try {
        const response = await axios.get(
          `https://server.codestates-project.tk/post/${postId}`,
          { withCredentials: true },
        );
        setPostModalData(response.data);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else {
          console.log(err);
        }
      } finally {
        setIsPostOn(true);
      }
      // setPostModalData(fakedata.post);
      // setIsPostOn(true);
    }
  };
  // #######################################################

  // #######################################################
  // 프로필 div를 눌렀을 때 해당 프로필 grid data를 불러오는 logic
  const viewProfile = () => {
    console.log('start');
    getPosts(profile.userId);
    console.log('end');
  };
  // #######################################################

  return (
    <>
      <PostNewFormModal
        setProfileForDeleteAndAdd={setProfileForDeleteAndAdd}
        setUserProfile={setUserProfile}
        postsKind={posts.kind}
        setPosts={setPosts}
        isModalOn={isAddPostOn}
        handleClose={viewAddPost}
      />
      {isPostOn ? (
        <PostModal
          axiosInform={axiosInform}
          posts={posts}
          kind={kind}
          setProfileForDeleteAndAdd={setProfileForDeleteAndAdd}
          setUserProfile={setUserProfile}
          userProfileId={userProfile.userId}
          setPostModalData={setPostModalData}
          refreshPost={refreshPost}
          setPosts={setPosts}
          getPosts={getPosts}
          getUserData={acceptUserData}
          postData={postModaldata}
          isModalOn={isPostOn}
          handleClose={viewPost}
          deletePost={deletePost}
        />
      ) : null}
      <div className={styles.gridFrame} />
      <div className={styles.profile} onClick={viewProfile}>
        <img
          src={profile.thumbnail}
          className={styles.image}
          alt="profile_img"
        />
        <div className={styles.userInform}>
          <div className={styles.petName}>{profile.petName}</div>
          <div className={styles.breed}>{profile.breed}</div>
          <div className={styles.postCountPart}>
            <div className={styles.postsCount}>Posts</div>
            <div className={styles.postsCountNumber}>{profile.postCount}</div>
          </div>
        </div>
      </div>
      <Posts
        axiosInform={axiosInform}
        getMorePosts={getMorePosts}
        from={from}
        offsetCount={offsetCount}
        setPosts={setPosts}
        userProfile={userProfile}
        isDone={isDone}
        userId={profile.userId}
        addPosts={getPosts}
        kind={posts.kind}
        posts={posts.postData}
        postsCount={posts.postsCount}
        viewPost={viewPost}
      />
      <div className={styles.addButton} onClick={viewAddPost}>
        <img className={styles.addPostImg} src={addPostImg} alt="addPost" />
      </div>
    </>
  );
};

export default MainPage;

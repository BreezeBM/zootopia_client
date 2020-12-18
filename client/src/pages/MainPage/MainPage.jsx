import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import addPostImg from '../../images/bark.png';
import PostModal from '../../components/PostModal/PostModal';
import PostNewFormModal from '../../components/PostNewFormModal/PostNewFormModal';

const MainPage = ({
  acceptUserData,
  isDone,
  setUserProfile,
  userProfile,
  setPosts,
  posts,
  kind,
  getPosts,
  getMorePosts,
  setProfileForDeleteAndAdd,
  profile,
  deletePost,
}) => {
  const history = useHistory();
  // 1) ComponentDidMount(첫 렌더링시에)로 유저 정보와 latest posts 정보를 받아오는 로직
  // ###############################################3
  const firstOptionFunc = () => {
    getPosts(0);
    acceptUserData(0);
  };

  useEffect(() => {
    firstOptionFunc();
    document.body.style.position = '';
    document.body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 8) * -1);
  }, []);
  // ###############################################3

  // 2) 새로운 포스트를 만드는 모달창을 끄고, 켜는 state & functions
  // ** 모달창 뒤로 스크롤바가 움직이는 문제 때문에 body.style.position 처리를 모달창 on off시에 조건으로 해두었음
  const [isAddPostOn, setIsAddPostOn] = useState(false);
  const viewAddPost = () => {
    if (isAddPostOn) {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0', 8) * -1);
      setIsAddPostOn(!isAddPostOn);
    } else {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      setIsAddPostOn(!isAddPostOn);
    }
  };
  // #######################################################

  // 3) PostModal창의 내용들 refresh 하는 function
  // #######################################################
  const [postModaldata, setPostModalData] = useState({});
  const refreshPost = async (data) => {
    setPostModalData((prev) => {
      return { ...prev, comments: data };
    });
  };
  // #######################################################

  // 4) 포스트 보기 : 포스트 썸네일을 grid view에서 클릭하면 해당 포스트 정보를 서버로부터 받아오고,
  // 메인페이지에서 모달창으로 띄우기 위한 함수 및 로직
  // #######################################################
  const [isPostOn, setIsPostOn] = useState(false);
  const viewPost = async (postId) => {
    if (isPostOn) {
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0', 8) * -1);
      setIsPostOn(false);
    } else {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
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
          alert('sorry server got some errors please try again');
        }
      } finally {
        setIsPostOn(true);
      }
    }
  };
  // #######################################################

  // 5) 프로필 div를 눌렀을 때 해당 프로필 grid data를 불러오는 logic
  // #######################################################
  const viewProfile = () => {
    getPosts(profile.userId);
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
          kind={kind}
          setProfileForDeleteAndAdd={setProfileForDeleteAndAdd}
          setUserProfile={setUserProfile}
          userProfileId={userProfile.userId}
          setPostModalData={setPostModalData}
          refreshPost={refreshPost}
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
        getMorePosts={getMorePosts}
        isDone={isDone}
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

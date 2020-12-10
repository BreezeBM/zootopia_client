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
  userProfile,
  isDone,
  setUserProfile,
  setPosts,
  posts,
  getPosts,
  setProfile,
  profile,
  deletePost,
}) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  // #######################################################
  // 새로운 포스트를 만드는 모달창을 끄고, 켜는 state& functions
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
        // setIsPostOn(true);
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
  // 다른 유저의 프로필 정보를 가져오는 func(click시에 해당 유저의 정보를 main에 출력)
  const acceptUserData = async (userId) => {
    try {
      const response = await axios.get(
        `https://server.codestates-project.tk/user/${userId}`,
        { withCredentials: true },
      );
      if (userId === 0) {
        setUserProfile(response.data);
      }
      setProfile(response.data);
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }

    // text용
    // if (userId === 0) {
    //   setUserProfile(fakedata.user);
    //   setProfile(fakedata.user);
    // } else {
    //   setProfile(fakedata.post.user);
    // }
  };
  // #######################################################

  // #######################################################
  // 프로필 div를 눌렀을 때 해당 프로필 grid data를 불러오는 logic
  const viewProfile = () => {
    getPosts(profile.userId, 0, 0, 15);
  };
  // #######################################################

  // #######################################################
  // ComponentDidMount(첫 렌더링시에)
  useEffect(() => {
    // 처음 렌더링될 때 getPosts로 latest 그리드를 받아서 posts에 업데이트해주고, 렌더링하도록
    getPosts(0, 0, 0, 15);
    // 처음 유저 데이터(자신)를 받아서 profile에 업데이트한 뒤에 렌더링
    acceptUserData(0);
    // 처음에 Loading자체가 true로 디폴트해놨기에, 여기까지
    // latest grid 및 유저 정보 렌더링 끝나면 로딩 false로 풀기
    // 결론적으로 들어오면 바로 스피너 돌고, 스피너 끝날 쯤에 다 렌더링 된 상태
    setIsLoading(false);
  }, []);
  // #######################################################

  return (
    <>
      <PostNewFormModal
        postsKind={posts.kind}
        setPosts={setPosts}
        isModalOn={isAddPostOn}
        handleClose={viewAddPost}
      />
      {isPostOn ? (
        <PostModal
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

      <div className={styles.main}>
        <div className={styles.flexBox}>
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
                <div className={styles.postsCountNumber}>
                  {profile.postCount}
                </div>
              </div>
            </div>
          </div>
          <Posts
            userProfile={userProfile}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
            isDone={isDone}
            userId={profile.userId}
            addPosts={getPosts}
            kind={posts.kind}
            posts={posts.postData}
            postsCount={posts.postsCount}
            viewPost={viewPost}
          />
        </div>
        <div className={styles.addButton} onClick={viewAddPost}>
          <img className={styles.addPostImg} src={addPostImg} alt="addPost" />
        </div>
      </div>
    </>
  );
};

export default MainPage;

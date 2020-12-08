import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import addPostImg from '../../images/bark.png';
import PostModal from '../../components/PostModal/PostModal';
import PostNewFormModal from '../../components/PostNewFormModal/PostNewFormModal';
import fakedata from '../../fakeData';

const MainPage = ({
  setPosts,
  posts,
  getPosts,
  setProfile,
  profile,
  deletePost,
}) => {
  // 처음 디폴트 로딩값은 true, 즉, 들어오자마자 스피너 돌아가게
  const [isLoading, setIsLoading] = useState(true);
  const [isAddPostOn, setIsAddPostOn] = useState(false);

  const [isPostOn, setIsPostOn] = useState(false);
  const [postModaldata, setPostModalData] = useState({});

  const viewAddPost = () => {
    setIsAddPostOn(!isAddPostOn);
  };

  const viewPost = async (postId) => {
    if (isPostOn) {
      setIsPostOn(false);
    } else {
      // try {
      //   const response = await axios.get(
      // `https://server.codestates-project.tk/post/${postId}`,
      //     { withCredentials: true },
      //   );
      //   setPostModalData(response.data);
      // } catch (err) {
      //   if (err.response.status === 401) {
      //     // history.push('/');
      //   } else {
      //     console.log(err);
      //   }
      // } finally {
      //   setIsPostOn(true);
      // }
      setPostModalData(fakedata.post);
      setIsPostOn(true);
    }
  };

  const acceptUserData = async (userId) => {
    // try {
    //   const response = await axios.get(
    //     `https://server.codestates-project.tk/user/${userId}`,
    //     { withCredentials: true },
    //   );
    //   setProfile(response.data);
    // } catch (err) {
    //   if (err.response.status === 401) {
    //     // history.push('/');
    //   } else {
    //     console.log(err);
    //   }
    // }

    // text용
    setProfile(fakedata.user);
  };

  const viewProfile = () => {
    getPosts(profile.userId, 0, 0, 15);
  };

  // ComponentDidMount
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
            userId={profile.userId}
            isLoading={isLoading}
            addPosts={getPosts}
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

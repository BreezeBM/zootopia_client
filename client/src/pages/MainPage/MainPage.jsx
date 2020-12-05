import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import styles from './MainPage.module.css';
import Posts from '../../components/Posts/Posts';
import profileImg from '../../images/iguana.jpeg';
import addPostImg from '../../images/bark.png';
import PostModal from '../../components/PostModal/PostModal';
import PostNewFormModal from '../../components/PostNewFormModal/PostNewFormModal';
import img from '../../thumbnails/post_g.png';
import dummyImg1 from '../../thumbnails/post_g.png';
import dummyImg2 from '../../thumbnails/post_g.png';
import dummyImg3 from '../../thumbnails/post_g.png';

const MainPage = () => {
  const viewProfile = () => {
    console.log('해당 프로필 유저의 posts를 렌더링');
  };

  const [posts, setPosts] = useState({ postData: [], postsCount: 0 });
  // 서버에 요청중일 때
  const [isLoading, setIsLoading] = useState(true);
  const [isAddPostOn, setIsAddPostOn] = useState(false);
  const [isPostOn, setIsPostOn] = useState(false);

  const [imageUrls, setImageUrls] = useState([]);
  const viewAddPost = () => {
    setIsAddPostOn(!isAddPostOn);
  };

  const viewPost = () => {
    const fakeImageUrls = [dummyImg1, dummyImg2, dummyImg3];
    setImageUrls((prev) => {
      return [...prev, ...fakeImageUrls];
    });
    setIsPostOn(!isPostOn);
  };

  // 처음에 ComponentDidMount에 쓰이는 함수
  // postCount, count
  const acceptPosts = async () => {
    setIsLoading(true);
    // 일단 로딩중을 띄우고(자료를 받는데 꽤 걸릴 수 있으니) 나중에 스피너 만들어서 container 안에 넣기
    // try {
    //   const response = await axios.post(
    //     'https://server.codestates-project.tk/post/grid/latest',
    //     { offset: postCount, count },
    //     { withCredentials: true },
    //   );
    //   const acceptedPosts = response.data;
    //   setIsLoading(false);
    //   setPosts((prev) => {
    //     acceptedPosts = acceptedPosts.concat(prev.postData);
    //     return { postData: acceptedPosts, postsCount: acceptedPosts.length };
    //   });
    // } catch(err) {
    //   console.log(err);
    // }

    // 서버에 요청을 보내고, 배열 형태의 자료를 받아서,
    // [{postId=30, thumbnail:'http://...'}] 이런 형태의 자료
    let acceptedPosts = [
      { postId: 1, thumbnail: img },
      { postId: 2, thumbnail: img },
      { postId: 3, thumbnail: img },
      { postId: 4, thumbnail: img },
      { postId: 5, thumbnail: img },
      { postId: 6, thumbnail: img },
      { postId: 7, thumbnail: img },
      { postId: 8, thumbnail: img },
      { postId: 9, thumbnail: img },
      { postId: 10, thumbnail: img },
      { postId: 11, thumbnail: img },
      { postId: 12, thumbnail: img },
      { postId: 13, thumbnail: img },
      { postId: 14, thumbnail: img },
      { postId: 15, thumbnail: img },
    ];
    // flex로 바꿨기에 배열 내 요소를 세개의 요소로 이루어진 배열로 만들어놔야함
    setIsLoading(false);
    setPosts((prev) => {
      acceptedPosts = acceptedPosts.concat(prev.postData);
      return { postData: acceptedPosts, postsCount: acceptedPosts.length };
    });
  };

  // 처음에 ComponentDidMount
  useEffect(() => {
    acceptPosts();
    // render 완료!
  }, []);

  return (
    <>
      <PostNewFormModal isModalOn={isAddPostOn} handleClose={viewAddPost} />
      <PostModal
        imageUrls={imageUrls}
        isModalOn={isPostOn}
        handleClose={viewPost}
      />
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
          <Posts
            isLoading={isLoading}
            addPosts={acceptPosts}
            posts={posts.postData}
            viewPost={viewPost}
            postsCount={posts.postsCount}
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

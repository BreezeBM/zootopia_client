import { React, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';
import Spinner from './components/Spinner/Spinner';

// 굳이 state로 만들어서 비동기처리(setState)로 쓰지 않기위해(인피니트 스크롤 무한 요청의 위험성)
// (setState가 비동기 처리이기에 그러한 위험이 있음)
// infinite scroll부분에 필요한 변수들을 따로 let으로 선언
// ############################################
let fromId = 0;
let offsetCount = 0;
let nowId = null;
let postsDatas = [];
// ############################################

function App() {
  // Unauthorized Response시에 랜딩 페이지로 보내기 위한 history 변수
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);

  // 최상위 Component에서 관리할 states
  // ############################################
  // 1) 메인 페이지의 프로필 부분에는 다른 유저의 프로필 정보도 뜰 수 있기에, 따로 로그인 유저 프로필 정보를 모아둔 state
  const [userProfile, setUserProfile] = useState({});
  // 2) 메인 페이지의 프로필 부분에 필요한 프로필 정보
  const [profile, setProfile] = useState({});
  // 3) 메인 grid view에 렌더링해줄 post 정보들
  const [posts, setPosts] = useState({
    postData: [],
    kind: 'latest',
    postsCount: 0,
  });
  // 4) infinite scroll 이 더이상 포스트가 없을 때는 멈추도록 설정하기 위한 state
  const [isDone, setIsDone] = useState(false);
  // ############################################

  // app.jsx에서 필요한 함수들
  // ############################################
  // 2) 처음 mainPage렌더링 이후에 포스트 정보를 서버로 요청하여 받아온 포스트 정보들을
  // posts state에 업데이트 해주는 함수
  const acceptPosts = async (id) => {
    setIsDone(false);
    window.scrollTo(0, 0);
    try {
      setIsLoading(true);
      const response = await axios.post(
        'https://server.codestates-project.tk/post/grid',
        {
          userId: id,
          from: 0,
          offset: 0,
          count: 15,
        },
        { withCredentials: true },
      );
      const acceptedPosts = response.data.postData;
      postsDatas.splice(0, postsDatas.length);
      postsDatas = postsDatas.concat(acceptedPosts);
      if (acceptedPosts[0]) {
        fromId = acceptedPosts[0].postId;
      }
      offsetCount = acceptedPosts.length;
      nowId = id;
      if (acceptedPosts.length < 15) {
        setIsDone(true);
      }
      if (id === 0) {
        setPosts({
          postData: acceptedPosts,
          postsCount: acceptedPosts.length,
          kind: 'latest',
        });
      } else if (id === userProfile.userId) {
        setPosts({
          postData: acceptedPosts,
          postsCount: acceptedPosts.length,
          kind: 'user',
        });
      } else {
        setPosts({
          postData: acceptedPosts,
          postsCount: acceptedPosts.length,
          kind: 'other',
        });
      }
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        alert('sorry server got some errors please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 3) infinite scroll기능에 필요한 해당 유저 혹은 latest posts를 더보고 싶을 때
  // 스크롤을 아래쪽으로 내리면 intersection observer API가 발동하여
  // 이 함수를 실행함 현재는 15개씩 더 받아오는 로직으로 되어있고, 만약 15개를 요청했는데
  // 그것보다 작은 개수의 response가 돌아오면 isDone state를 true로 해줘서 더이상 스크롤 못하게 막음
  const getMorePosts = async () => {
    try {
      const response = await axios.post(
        'https://server.codestates-project.tk/post/grid',
        {
          userId: nowId,
          from: fromId,
          offset: offsetCount,
          count: 15,
        },
        { withCredentials: true },
      );
      const acceptedPosts = response.data.postData;
      if (acceptedPosts.length < 15) {
        setIsDone(true);
      }

      setPosts((prev) => {
        return {
          kind: prev.kind,
          postData: postsDatas.concat(acceptedPosts),
          postsCount: offsetCount + acceptedPosts.length,
        };
      });

      postsDatas = postsDatas.concat(acceptedPosts);
      offsetCount += acceptedPosts.length;
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        alert('sorry server got some errors please try again');
      }
    }
  };

  // 4) 포스팅 속에 유저 프로필 혹은 메인 페이지의 유저 프로필을 누르면
  // 해당 유저의 아이디 값을 가지고 서버로 요청을 보내 해당 유저의 포스트들을 받아와서 grid view에 렌더링함
  const acceptUserData = async (userId) => {
    try {
      setIsLoading(true);
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
        alert('sorry server got some errors please try again');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // 5) 포스트를 삭제했을 때에 서버로 요청을 보내서 실제 delete 처리를 하는 함수가 '아닌'
  // 프론트 부분에서 바로 그리드에서 해당 포스트를 삭제해주기 위해서(state 단에서)
  // 만든 함수로 새로고침하면 제거된 포스팅이 적용되지만, 현재 포스팅 부분에서는 socket io를 쓰지 않고 있기 때문에
  // 새로고침을 하기전에 클라이언트 단에서 처리해주는 함수가 필요하다는 생각에 제작.
  const deletePost = (id) => {
    const copyArr = posts.postData.slice();
    for (let idx = 0; idx < copyArr.length; idx += 1) {
      if (copyArr[idx].postId === id) {
        copyArr.splice(idx, 1);
        break;
      }
    }
    setPosts({ ...posts, postData: copyArr, postsCount: posts.postsCount - 1 });
  };
  // ############################################

  return (
    <>
      <Spinner isSpinnerOn={isLoading} />
      <Switch>
        <Route path="/" exact>
          <LandingPage setIsLoading={setIsLoading} />
        </Route>
        <Route path="/main">
          <Nav
            kind={posts.kind}
            setProfile={setProfile}
            userProfile={userProfile}
            acceptUserData={acceptUserData}
            setUserProfile={setUserProfile}
            profile={userProfile}
            acceptPosts={acceptPosts}
          />
          <MainPage
            getMorePosts={getMorePosts}
            acceptUserData={acceptUserData}
            kind={posts.kind}
            userProfile={userProfile}
            isDone={isDone}
            setUserProfile={setUserProfile}
            setPosts={setPosts}
            posts={posts}
            getPosts={acceptPosts}
            setProfileForDeleteAndAdd={setProfile}
            profile={profile}
            deletePost={deletePost}
          />
        </Route>
        <Route path="/chat">
          <Nav
            kind={posts.kind}
            setProfile={setProfile}
            userProfile={userProfile}
            acceptUserData={acceptUserData}
            setUserProfile={setUserProfile}
            profile={userProfile}
            acceptPosts={acceptPosts}
          />
          <ChatPage
            setIsLoading={setIsLoading}
            myPicture={userProfile.thumbnail}
            myId={userProfile.userId}
            myNickname={userProfile.petName}
            myBreed={userProfile.breed}
            acceptUserData={acceptUserData}
          />
        </Route>
      </Switch>
    </>
  );
}

export default App;

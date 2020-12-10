import { React, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';

// test용도 fakeData
// import fakedata from './fakeData';

function App() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState({});
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState({
    postData: [],
    postsCount: 0,
    kind: 'latest',
  });
  const setProfileInform = ({
    userId,
    photo,
    thumbnail,
    petName,
    breed,
    postCount,
  }) => {
    setProfile({
      ...profile,
      userId,
      photo,
      thumbnail,
      petName,
      breed,
      postCount,
    });
  };
  // infinite scroll을 막기 위해 만약 요청 자료 숫자보다 적은 숫자의 자료가 response로 오면 isDone을 true로 해서 더이상
  // 작동하지 않도록 하기 위한 state
  const [isDone, setIsDone] = useState(false);

  // grid자료(latest, 특정 유저(자신, 다른 유저 포함))를 받아와서 이전의 grid에 더해주는 기능 func
  const acceptPosts = async (userId, from, offset, count) => {
    if (posts.postsCount > 0 && offset === 0) {
      setPosts((prev) => {
        return { ...prev, postData: [] };
      });
    }
    try {
      const response = await axios.post(
        'https://server.codestates-project.tk/post/grid',
        { userId, from, offset, count },
        { withCredentials: true },
      );

      let acceptedPosts = response.data;
      // #############################################
      // infinite scroll을 막기 위해 만약 요청 자료 숫자보다 적은 숫자의 자료가 response로 오면 isDone을 true로 해서 더이상
      // 작동하지 않도록 하기 위한 logic
      if (acceptedPosts.length < count) setIsDone(true);
      // #############################################

      setPosts((prev) => {
        acceptedPosts = acceptedPosts.concat(prev.postData);
        return { postData: acceptedPosts, postsCount: acceptedPosts.length };
      });

      // #############################################
      // latest 자료인지, 로그인 유저 자료인지, 다른 유저 자료인지를 분기해놓는 logic
      if (userId === 0) {
        setPosts((prev) => {
          return { ...prev, kind: 'latest' };
        });
      } else if (userId === userProfile.userId) {
        setPosts((prev) => {
          return { ...prev, kind: 'user' };
        });
      } else {
        setPosts((prev) => {
          return { ...prev, kind: 'other' };
        });
      }
      // #############################################
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }

    // test 용
    // setPosts((prev) => {
    //   const acceptedPosts = fakedata.posts.concat(prev.postData);
    //   return { postData: acceptedPosts, postsCount: acceptedPosts.length };
    // });
    // if (userId === 0) {
    //   setPosts((prev) => {
    //     return { ...prev, kind: 'latest' };
    //   });
    // } else if (userId === profile.userId) {
    //   setPosts((prev) => {
    //     return { ...prev, kind: 'user' };
    //   });
    // } else {
    //   setPosts((prev) => {
    //     return { ...prev, kind: 'other' };
    //   });
    // }
  };

  // #############################################
  // 포스트 제거 logic
  // PostDeleteModal에서 서버로 delete요청 보낸 뒤에 최신 화면 grid에서 해당 포스트가 제거되어야하기 때문에
  // 만들어놓은 로직(제거할 때마다 새로고침을 하면 좋겠지만 그럼 만약에 인피니트 스크롤로 자료를 많이 받아놓은 사람이 포스트를 제거하면 다시 인피니트 스크롤 해야하는 문제가 있음)
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
  // #############################################

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/main">
          <Nav profile={userProfile} acceptPosts={acceptPosts} />
          <MainPage
            userProfile={userProfile}
            isDone={isDone}
            setUserProfile={setUserProfile}
            setPosts={setPosts}
            posts={posts}
            getPosts={acceptPosts}
            setProfile={setProfileInform}
            profile={profile}
            deletePost={deletePost}
          />
        </Route>
        <Route path="/chat">
          <Nav profile={userProfile} acceptPosts={acceptPosts} />
          <ChatPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

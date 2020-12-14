import { React, useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';

function App() {
  const history = useHistory();
  const [userProfile, setUserProfile] = useState({});
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState({
    postData: [],
    kind: 'latest',
    postsCount: 0,
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
  const [spinnerIsOn, setSpinnerIsOn] = useState(false);
  const [isDone, setIsDone] = useState(false);

  let fromId = 0;
  let offsetCount = 0;
  let nowId = null;
  let postsDatas = [];

  const getMorePosts = async () => {
    console.log(posts.postData);
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

      setPosts({
        postData: postsDatas.concat(acceptedPosts),
        postsCount: offsetCount + acceptedPosts.length,
      });
      postsDatas = postsDatas.concat(acceptedPosts);
      offsetCount += acceptedPosts.length;
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };

  const acceptPosts = async (id) => {
    window.scrollTo(0, 0);
    try {
      const response = await axios.post(
        // 'https://71f44c60960a.ngrok.io/post/grid',
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
      if (acceptedPosts.length < 15) {
        setIsDone(true);
      }
      fromId = acceptedPosts[0].postId;
      offsetCount = acceptedPosts.length;
      nowId = id;
      setPosts({
        postData: acceptedPosts,
        postsCount: acceptedPosts.length,
      });
      postsDatas = acceptedPosts;
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };

  const acceptUserData = async (userId) => {
    try {
      const response = await axios.get(
        // `https://71f44c60960a.ngrok.io/user/${userId}`,
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
  };

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

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
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
            // from={from}
            getMorePosts={getMorePosts}
            acceptUserData={acceptUserData}
            kind={posts.kind}
            userProfile={userProfile}
            isDone={isDone}
            setUserProfile={setUserProfile}
            setPosts={setPosts}
            posts={posts}
            getPosts={acceptPosts}
            setProfile={setProfileInform}
            setProfileForDeleteAndAdd={setProfile}
            profile={profile}
            deletePost={deletePost}
            spinnerIsOn={spinnerIsOn}
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
          <ChatPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

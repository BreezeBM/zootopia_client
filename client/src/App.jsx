import { React, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';
import fakedata from './fakeData';

function App() {
  // const history = useHistory();
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

  // grid자료(latest, 특정 유저(자신, 다른 유저 포함))를 받아와서 이전의 grid에 더해주는 기능 func
  const acceptPosts = async (userId, from, offset, count) => {
    // try {
    //   const response = await axios.post(
    //     'https://server.codestates-project.tk/post/grid',
    //     { userId, from, offset, count },
    //     { withCredentials: true },
    //   );

    //   let acceptedPosts = response.data;
    //   setPosts((prev) => {
    //     acceptedPosts = acceptedPosts.concat(prev.postData);
    //     return { postData: acceptedPosts, postsCount: acceptedPosts.length };
    //   });
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
    // } catch (err) {
    //   if (err.response.status === 401) {
    //     // history.push('/');
    //   } else {
    //     console.log(err);
    //   }
    // }

    // test 용도
    setPosts((prev) => {
      const acceptedPosts = fakedata.posts.concat(prev.postData);
      return { postData: acceptedPosts, postsCount: acceptedPosts.length };
    });
    if (userId === 0) {
      setPosts((prev) => {
        return { ...prev, kind: 'latest' };
      });
    } else if (userId === profile.userId) {
      setPosts((prev) => {
        return { ...prev, kind: 'user' };
      });
    } else {
      setPosts((prev) => {
        return { ...prev, kind: 'other' };
      });
    }
  };

  const deletePost = (id) => {
    const copyArr = posts.postData.slice();
    console.log('gggg');
    for (let idx = 0; idx < copyArr.length; idx += 1) {
      if (copyArr[idx].postId === id) {
        copyArr.splice(idx, 1);
        break;
      }
    }
    setPosts({ ...posts, postData: copyArr });
  };

  return (
    <>
      <Switch>
        <Route path="/" exact>
          <LandingPage />
        </Route>
        <Route path="/main">
          <Nav />
          <MainPage
            setPosts={setPosts}
            posts={posts}
            getPosts={acceptPosts}
            setProfile={setProfileInform}
            profile={profile}
            deletePost={deletePost}
          />
        </Route>
        <Route path="/chat">
          <Nav />
          <ChatPage />
        </Route>
      </Switch>
    </>
  );
}

export default App;

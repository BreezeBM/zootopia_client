import { React, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from './components/Nav/Nav';
import LandingPage from './pages/LandingPage/LandingPage';
import ChatPage from './pages/Chatpage/ChatPage';
import MainPage from './pages/MainPage/MainPage';

let fromId = 0;
let offsetCount = 0;
let nowId = null;
let postsDatas = [];

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
  const [isDone, setIsDone] = useState(false);

  const acceptPosts = async (id) => {
    setIsDone(false);
    window.scrollTo(0, 0);
    try {
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
      fromId = acceptedPosts[0].postId;
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
        console.log(err);
      }
    }
  };

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
      if (nowId === 0) {
        setPosts({
          kind: 'latest',
          postData: postsDatas.concat(acceptedPosts),
          postsCount: offsetCount + acceptedPosts.length,
        });
      } else if (nowId === userProfile.userId) {
        setPosts({
          kind: 'user',
          postData: postsDatas.concat(acceptedPosts),
          postsCount: offsetCount + acceptedPosts.length,
        });
      } else {
        setPosts({
          kind: 'other',
          postData: postsDatas.concat(acceptedPosts),
          postsCount: offsetCount + acceptedPosts.length,
        });
      }

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
            setPosts={setPosts}
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
            setProfile={setProfileInform}
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
          {/* <ChatPage
            myPicture={userProfile.thumbnail} // = img src
            myId={userProfile.userId}
            myNickname={userProfile.petName}
            myBreed={userProfile.breed}
          /> */}
        </Route>
      </Switch>
    </>
  );
}

export default App;

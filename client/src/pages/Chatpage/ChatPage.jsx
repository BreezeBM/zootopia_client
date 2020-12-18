import React, { createRef, useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './ChatPage.module.css';
import backListImg from '../../images/backList.png';
import addRoomImg from '../../images/addRoom.png';
import ChatUser from '../../components/ChatUser/ChatUser';
import PrivateChat from '../../components/PrivateChat/PrivateChat';
import MyChat from '../../components/MyChat/MyChat';
import UserChat from '../../components/UserChat/UserChat';
import AddroomModal from '../../components/AddroomModal/AddroomModal';
import iguanaImg from '../../images/iguana.jpeg';

const socket = io('https://chat.codestates-project.tk', {
  withCredentials: true,
});

socket.on('connect_error', (err) => {
  console.log(err.message);
});
let roomLists = '';

const ChatPage = ({ myPicture, myId, myNickname, myBreed, acceptUserData }) => {
  const myIdData = myId;
  const username = myNickname;
  const breedname = myBreed;

  const chatScroll = useRef();
  const targetList = createRef();
  const targetChat = createRef();
  const targetButton = createRef();
  const backList = createRef();
  const inputData = useRef();

  const [targetId, targetToggle] = useState('');
  const [roomState, setRooms] = useState([]);
  const [messageState, setMessages] = useState([]);
  const [addRoomOn, setaddRoomOn] = useState(false);
  const [youProfile, setYou] = useState({ userId: -1 });

  const history = useHistory();
  const viewAddRoompage = () => {
    setaddRoomOn(!addRoomOn);
  };

  const mapFunction = function (el) {
    if (el.user === myIdData) {
      return <MyChat textData={el.text} dateData={el.createdAt} />;
    } else {
      return (
        <UserChat
          textData={el.text}
          dateData={el.createdAt}
          userId={el.user}
          img={youProfile}
        />
      );
    }
  };

  const getRooms = async function () {
    try {
      const res = await axios.get(
        `https://chat.codestates-project.tk/room/${myIdData}`,
        { withCredentials: true },
      );
      console.log(res.data);
      setRooms(res.data);
      console.log(roomState);
    } catch (err) {
      throw err;
    } finally {
      console.log('룸 정보 GET 함수 실행');
    }
  };

  const getMessages = async function (id) {
    try {
      const res = await axios.get(
        `https://chat.codestates-project.tk/chat/${id}`,
        { withCredentials: true },
      );
      setMessages(res.data);
    } catch (err) {
      throw err;
    } finally {
      console.log('메시지 GET 실행');
    }
  };

  const getUserData = (id) => {
    const config = {
      method: 'get',
      url: `https://server.codestates-project.tk/user/${id}`,
      withCredentials: true,
    };

    axios(config)
      .then(function (response) {
        console.log(response.data);
        setYou(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const mapingFunc = async () => {
    if (roomState.length > 0) {
      roomLists = roomState.map((el) => {
        if (el.type === '공개 채팅방') {
          const userNum = `${el.users.length}명`;
          return (
            <ChatUser
              idValue={el._id}
              unread=""
              targetId={targetId}
              targetToggle={targetToggle}
              roomTitle={el.title}
              userImg={iguanaImg}
              roomPeople={userNum}
              dataFunc={getMessages}
              Myid={myIdData}
            />
          );
        } else {
          let you = el.users.filter((dl) => dl.id !== myIdData)[0];
          let me = el.users.filter((dl) => dl.id === myIdData)[0];
          if (!you) {
            you = { isOnline: undefined };
          }
          if (!me) {
            me = { unRead: false };
          }

          return (
            <PrivateChat
              idValue={el._id}
              unread={me.unRead}
              targetId={targetId}
              targetToggle={targetToggle}
              connection={you.isOnline ? 'online' : 'offline'}
              setYou={setYou}
              getUserData={getUserData}
              dataFunc={getMessages}
              Myid={myIdData}
              Youid={you.id}
            />
          );
        }
      });
    }
  };

  const sendMessage = function (e) {
    if (e.keyCode !== 8) {
      targetButton.current.style.backgroundColor = 'rgba(255,198,0)';
      targetButton.current.style.color = 'black';
    } else if (e.keyCode === 8 && inputData.current.value.length < 2) {
      targetButton.current.style.backgroundColor = 'rgba(248,248,248)';
      targetButton.current.style.color = '';
    }

    if (e.keyCode === 13) {
      const message = JSON.stringify({
        user: myIdData,
        text: `${e.target.value}`,
      });
      const config = {
        method: 'post',
        url: `https://chat.codestates-project.tk/chat/${targetId}`,
        headers: { 'Content-Type': 'application/json' },
        data: message,
        withCredentials: true,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          inputData.current.value = null;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const sendClick = function () {
    const message = JSON.stringify({
      user: myIdData,
      text: inputData.current.value,
    });
    const config = {
      method: 'post',
      url: `https://chat.codestates-project.tk/chat/${targetId}`,
      headers: { 'Content-Type': 'application/json' },
      data: message,
      withCredentials: true,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        inputData.current.value = null;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    // acceptUserData(0);
    getRooms();
  }, []);

  useEffect(() => {
    socket.on('newPublic', function (room) {
      console.log(room);
      setRooms([...roomState, room]);
    });

    return () => socket.off('newPublic');
  }, [roomState]);

  useEffect(() => {
    socket.on('newPrivate', (room, myid, id) => {
      console.log(room);
      if (myid === myIdData || id === myIdData) {
        setRooms([...roomState, room]);
      }
    });

    return () => socket.off('newPrivate');
  }, [roomState]);

  useEffect(() => {
    socket.on('newMessage', function (chat) {
      console.log(chat);
      setMessages([...messageState, chat]);
    });
    console.log(messageState);
    return () => socket.off('newMessage');
  }, [messageState]);

  useEffect(() => {
    socket.on('roomUpdate', function (room) {
      const arry = roomState.filter((el) => {
        return el._id === room._id;
      });
      if (arry.length > 0) {
        console.log('@@@@@@@룸업데이트 실행@@@@@@@@');
        const num = roomState.indexOf(arry[0]);
        const result = roomState.slice(undefined);
        result.splice(num, 1, room);
        setRooms(result);
      }
    });
    return () => socket.off('roomUpdate');
  }, []);

  // 모바일 기종에선 전용 UI로 나올 수 있도록
  useEffect(() => {
    const arr = [
      'Win16',
      'Win32',
      'Win64',
      'Mac',
      'MacIntel',
      'Linux x86_64',
      'Linux x86_32',
    ];
    if (!arr.includes(navigator.platform)) {
      targetChat.current.style.display = 'none';
      if (targetId.length > 5) {
        targetChat.current.style.display = '';
        targetList.current.style.display = 'none';
      }
    }
  }, [targetId]);

  mapingFunc();
  console.log('랜더링');
  return (
    <>
      <AddroomModal
        isModalOn={addRoomOn}
        handleClose={viewAddRoompage}
        myId={myIdData}
      />
      <div className={styles.main}>
        <div className={styles.main}> </div>
        <div className={styles.flexBox}>
          <div className={styles.listBox} ref={targetList}>
            <div className={styles.profile}>
              <img className={styles.image} src={myPicture} alt="profile" />
              <div className={styles.name}>{username}</div>
              <div className={styles.breed}>{breedname}</div>
            </div>
            <div className={styles.userlist}>
              <div className={styles.profileBlock}>모바일 버전용</div>
              {roomLists}
              <img
                className={styles.addRoom}
                src={addRoomImg}
                alt="addRoom"
                onClick={viewAddRoompage}
              />
            </div>
          </div>
          <div className={styles.chatBox} ref={targetChat}>
            <div className={styles.chatonBoard} ref={chatScroll}>
              <div className={styles.block}> </div>
              {targetId.length < 5
                ? ''
                : messageState.map((el) => mapFunction(el))}
            </div>
            <img
              className={styles.backList}
              src={backListImg}
              ref={backList}
              alt="backList"
              onClick={() => {
                history.go();
              }}
            />
            <input
              className={styles.chatPost}
              type="text"
              placeholder="메시지 입력..."
              onKeyDown={sendMessage}
              ref={inputData}
            />
            <div className={styles.send} onClick={sendClick} ref={targetButton}>
              전송
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

import React, { createRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './ChatPage.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import backListImg from '../../images/backList.png';
import addRoomImg from '../../images/addRoom.png';
import ChatUser from '../../components/ChatUser/ChatUser';
import MyChat from '../../components/MyChat/MyChat';
import UserChat from '../../components/UserChat/UserChat';
import AddroomModal from '../../components/AddroomModal/AddroomModal';

const username = '내 이름이 나오는 곳';
const breedname = '품종명을 쓰거나 상태메시지처럼 활용';
const socket = io('http://d608b4f1a2ae.ngrok.io', { withCredentials: true });

const ChatPage = () => {
  let roomLists = '';

  const chatScroll = createRef();
  const targetList = createRef();
  const targetChat = createRef();
  const targetButton = createRef();
  const backList = createRef();

  const [targetId, targetToggle] = useState('');
  const [testState, setTest] = useState([]);
  const [messageState, setMessages] = useState([]);
  const [onLine, setonLine] = useState(5);
  const [addRoomOn, setaddRoomOn] = useState(false);

  const history = useHistory();
  const viewAddRoompage = () => {
    setaddRoomOn(!addRoomOn);
  };

  const mapFunction = function (el) {
    if (el.user === '5') {
      return <MyChat textData={el.text} dateData={el.createdAt} />;
    } else {
      console.log(el.user);
      return <UserChat textData={el.text} dateData={el.createdAt} />;
    }
  };

  const getRooms = async function () {
    try {
      const res = await axios.get('http://d608b4f1a2ae.ngrok.io/room');
      setTest(res.data);
    } catch (err) {
      throw err;
    } finally {
      console.log('룸 정보 GET 함수 실행');
    }
  };

  const getMessages = function (id) {
    try {
      socket.emit('joinRoom', id);
      socket.on('renderChat', function (chat) {
        setMessages(chat);
      });
    } catch (err) {
      throw err;
    } finally {
      console.log(messageState);
    }
    // chatLists = messageState.map((el) => {
    //   return <UserChat textData={el.title} dateData={el.createdAt} />;
    // });
  };

  if (testState.length > 0) {
    roomLists = testState.map((el) => {
      return (
        <ChatUser
          idValue={el._id}
          targetId={targetId}
          targetToggle={targetToggle}
          roomTitle={el.title}
          roomPeople={el.people}
          dataFunc={getMessages}
        />
      );
    });
  }

  const sendMessage = function (e) {
    if (e.target.value.length > 1) {
      targetButton.current.style.backgroundColor = 'rgba(255,198,0)';
      targetButton.current.style.color = 'black';
    } else if (e.target.value.length <= 1) {
      targetButton.current.style.backgroundColor = 'rgba(248,248,248)';
      targetButton.current.style.color = '';
    }

    if (e.keyCode === 13) {
      const message = JSON.stringify({
        user: onLine,
        text: `${e.target.value}`,
      });
      const config = {
        method: 'post',
        url: `http://d608b4f1a2ae.ngrok.io/chat/${targetId}`,
        headers: { 'Content-Type': 'application/json' },
        data: message,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      socket.on('newMessage', function (chat) {
        console.log(chat);
        setMessages([...messageState, chat]);
      });
    }
  };

  const userChange = function () {
    setonLine(6);
    console.log(onLine);
  };
  useEffect(() => {
    getRooms();
  }, []);

  useEffect(() => {
    console.log(targetId);
  }, [messageState]);

  // 모바일 기종에선 전용 UI로 나올 수 있도록
  useEffect(() => {
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    if (!arr.includes(navigator.platform)) {
      targetChat.current.style.display = 'none';
      if (targetId.length > 5) {
        targetChat.current.style.display = '';
        targetList.current.style.display = 'none';
      }
    }
  }, [targetId]);

  return (
    <>
      <AddroomModal
        isModalOn={addRoomOn}
        handleClose={viewAddRoompage}
        roomState={testState}
        setRoom={setTest}
      />
      <div className={styles.main}>
        <div className={styles.main}> </div>
        <div className={styles.flexBox}>
          <div className={styles.listBox} ref={targetList}>
            <div className={styles.profile}>
              <img className={styles.image} src={iguanaImg} alt="profile" />
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
            <img
              className={styles.backList}
              src={backListImg}
              ref={backList}
              alt="backList"
              onClick={() => {
                history.push('/chat');
              }}
            />
            <div className={styles.chatonBoard} ref={chatScroll}>
              <div className={styles.block}> </div>
              {messageState.map((el) => mapFunction(el))}
            </div>
            <input
              className={styles.chatPost}
              type="text"
              placeholder="메시지 입력..."
              onKeyDown={sendMessage}
            />
            <div
              className={styles.send}
              onClick={userChange}
              ref={targetButton}
            >
              전송
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;

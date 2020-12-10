import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './ChatPage.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import ChatUser from '../../components/ChatUser/ChatUser';
import MyChat from '../../components/MyChat/MyChat';
import UserChat from '../../components/UserChat/UserChat';

const socket = io('http://5b7116e297db.ngrok.io', { withCredentials: true });
let roomLists = '';
// let chatLists = '';
const username = '내 이름이 나오는 곳';
const breedname = '품종명을 쓰거나 상태메시지처럼 활용';

const ChatPage = () => {
  const chatScroll = createRef();
  const targetList = createRef();
  const [targetId, targetToggle] = useState('');
  const [testState, setTest] = useState([]);
  const [messageState, setMessages] = useState([
    {
      user: '4',
      text: '메시지 못 받음',
      createdAt: 2020 - 12 - 23,
    },
  ]);

  const [onLine, setonLine] = useState(5);
  const [messageMap, setMap] = useState('');

  const testFunc = async function () {
    try {
      const res = await axios.get('http://5b7116e297db.ngrok.io/room');
      setTest(res.data);
      targetToggle(res.data[0]._id);
    } catch (err) {
      throw err;
    } finally {
      console.log('룸 정보 GET 함수 실행');
    }
  };

  const messageFunc = function (id) {
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
          dataFunc={messageFunc}
        />
      );
    });
  }

  const myFunction = function (e) {
    if (e.keyCode === 13) {
      const message = JSON.stringify({
        user: onLine,
        text: `${e.target.value}`,
      });
      const config = {
        method: 'post',
        url: `http://5b7116e297db.ngrok.io/chat/${targetId}`,
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
    testFunc();
  }, []);

  useEffect(() => {
    console.log(targetId);
  }, [messageState]);

  useEffect(() => {
    if (targetId === -1) {
      console.log('스테이트 올리기 작동합니다.');
    }
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    if (!arr.includes(navigator.platform)) {
      if (targetId.length > 5) {
        targetList.current.style.display = 'none';
      }
    }
  }, [targetId]);

  return (
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
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatonBoard} ref={chatScroll}>
            <div className={styles.block}> </div>
            {messageState.map((el) => {
              return <UserChat textData={el.text} dateData={el.createdAt} />;
            })}
          </div>
          <input
            className={styles.chatPost}
            type="text"
            placeholder="메시지 입력..."
            onKeyDown={myFunction}
          />
          <div className={styles.send} onClick={userChange} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

import React, { createRef, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './ChatPage.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import ChatUser from '../../components/ChatUser/ChatUser';
import MyChat from '../../components/MyChat/MyChat';
import UserChat from '../../components/UserChat/UserChat';

let roomLists = '';
let chatLists = '';
const username = '내 이름이 나오는 곳';
const breedname = '품종명을 쓰거나 상태메시지처럼 활용';

const ChatPage = () => {
  const targetUser = createRef();
  const targetList = createRef();

  const [testState, setTest] = useState([]);
  const [messageState, setMessages] = useState([]);
  const [targetId, targetToggle] = useState(-1);
  const [onLine, setonLine] = useState(false);

  const testFunc = async function () {
    try {
      const res = await axios.get('http://e77f8aa1364b.ngrok.io/room');
      console.log(res.data);
      setTest(res.data);
    } catch (err) {
      throw err;
    } finally {
      console.log('룸 정보 GET 함수 실행');
    }
  };

  const messageFunc = async function () {
    try {
      socket.emit('joinRoom', '5fd056a52d621b1b044454a5');
      const res2 = '';
      const res = await axios.get('http://52.78.206.149:3000/messages');
      setMessages(res.data.results);
    } catch (err) {
      throw err;
    } finally {
      console.log('메시지 정보 GET 함수 실행');
    }
  };

  if (testState.length > 0) {
    roomLists = testState.map((el) => {
      return (
        <ChatUser
          idValue={el._id}
          state={targetId}
          stateFunc={targetToggle}
          roomTitle={el.title}
          roomPeople={el.people}
        />
      );
    });
  }

  if (messageState.length > 0) {
    chatLists = testState.map((el) => {
      if (el.username === '28') {
        return <MyChat textData={el.text} dateData={el.date} />;
      } else {
        return <UserChat textData={el.text} dateData={el.date} />;
      }
    });
  }

  const myFunction = function (e) {
    if (e.keyCode === 13) {
      setonLine(true);
      console.log(onLine);
    }
  };

  useEffect(() => {
    testFunc();
    messageFunc();
  }, []);

  useEffect(() => {
    testFunc();
    messageFunc();
    console.log('온라인 이펙트 실행!');
  }, [onLine]);

  useEffect(() => {
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    if (!arr.includes(navigator.platform)) {
      if (targetId > 0) {
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
          <div className={styles.chatonBoard}>
            <div className={styles.block}> </div>
            {chatLists}
          </div>
          <input
            className={styles.chatPost}
            type="text"
            placeholder="메시지 입력.."
            onKeyDown={myFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;

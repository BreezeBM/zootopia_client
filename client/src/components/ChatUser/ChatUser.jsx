import React, { createRef, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import OutImg from '../../images/roomOut.png';

const socket = io('https://zootopia-chat.herokuapp.com/', {
  withCredentials: true,
});

const ChatUser = ({
  idValue,
  targetId,
  targetToggle,
  roomTitle,
  userImg,
  roomPeople,
  dataFunc,
  clearFunc,
  Myid,
}) => {
  const Card = createRef();

  useEffect(() => {
    if (targetId !== idValue) {
      Card.current.style.backgroundColor = 'white';
    }
  });

  const handleCard = function () {
    Card.current.style.backgroundColor = 'rgba(255,198,0)';
    targetToggle(idValue);
    console.log(idValue);
    dataFunc(idValue);
  };

  const roomBye = function () {
    const goobyeData = JSON.stringify({
      id: `${Myid}`,
    });
    const config = {
      method: 'post',
      url: `https://zootopia-chat.herokuapp.com/room/:${idValue}`,
      headers: { 'Content-Type': 'application/json' },
      data: goobyeData,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
    clearFunc();
    console.log('방삭제');
    Card.current.style.display = 'none';
  };

  return (
    <>
      <div className={styles.usercard} ref={Card} onClick={handleCard}>
        <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
        <div className={styles.username}>{roomTitle + userImg}</div>
        <div className={styles.userbreed}>{roomPeople}</div>
        <div className={styles.status}>안 읽은 메시지가 있습니다.</div>
        <img
          className={styles.outButton}
          src={OutImg}
          alt="roomOut"
          onClick={roomBye}
        />
      </div>
    </>
  );
};
export default ChatUser;

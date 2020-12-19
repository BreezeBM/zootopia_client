import React, { createRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './ChatUser.module.css';
import OutImg from '../../images/roomOut.png';

const socket = io('https://chat.codestates-project.tk/', {
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
  Myid,
  setRoomType,
  setMessages,
}) => {
  const Card = createRef();
  const history = useHistory();

  useEffect(() => {
    if (targetId !== idValue) {
      Card.current.style.backgroundColor = 'white';
      disconnect();
    }
  }, [targetId]);

  const handleCard = function () {
    setRoomType('public');
    setMessages([]);
    Card.current.style.backgroundColor = 'rgba(255,198,0)';
    targetToggle(idValue);
    console.log(idValue);
    setTimeout(dataFunc(idValue), 150);
  };

  const roomBye = function () {
    const goobyeData = { id: Myid };
    const config = {
      method: 'post',
      url: `https://chat.codestates-project.tk/room/${idValue}`,
      headers: { 'Content-Type': 'application/json' },
      data: goobyeData,
      withCredentials: true,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
        history.push('/main');
        history.push('/chat');
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const disconnect = function () {
    const connectData = { id: Myid };
    const config = {
      method: 'post',
      url: `https://chat.codestates-project.tk/chat/leave/${idValue}`,
      headers: { 'Content-Type': 'application/json' },
      data: connectData,
      withCredentials: true,
    };
    axios(config, { withCredentials: true })
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <>
      <div className={styles.usercard} ref={Card} onClick={handleCard}>
        <img className={styles.userProfile} src={userImg} alt="userprofile" />
        <div className={styles.username}>{roomTitle}</div>
        <div className={styles.userbreed}>{roomPeople}</div>
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

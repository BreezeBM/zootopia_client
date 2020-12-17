import React, { createRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import OutImg from '../../images/roomOut.png';

const socket = io('https://chat.codestates-project.tk/', {
  withCredentials: true,
});

const ChatUser = ({
  idValue,
  unread,
  targetId,
  targetToggle,
  roomTitle,
  userImg,
  roomPeople,
  dataFunc,
  Myid,
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
    Card.current.style.backgroundColor = 'rgba(255,198,0)';
    targetToggle(idValue);
    console.log(idValue);
    dataFunc(idValue);
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
        history.go();
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
        <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
        <div className={styles.username}>{roomTitle + userImg}</div>
        <div className={styles.userbreed}>{roomPeople}</div>
        <div className={styles.status}>
          {unread ? '안 읽은 메시지가 있습니다.' : ''}
        </div>
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

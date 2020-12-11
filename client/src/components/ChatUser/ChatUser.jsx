import React, { createRef, useEffect } from 'react';
import io from 'socket.io-client';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import OutImg from '../../images/roomOut.png';

const socket = io('http://36e9d320985c.ngrok.io', { withCredentials: true });

const ChatUser = ({
  idValue,
  targetId,
  targetToggle,
  roomTitle,
  roomPeople,
  dataFunc,
  clearFunc,
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

  const roomBye = async function () {
    socket.emit('leaveRoom', idValue, '5');
    clearFunc();
    console.log('방삭제');
    Card.current.style.display = 'none';
  };

  return (
    <>
      <div className={styles.usercard} ref={Card} onClick={handleCard}>
        <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
        <div className={styles.username}>{roomTitle}</div>
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

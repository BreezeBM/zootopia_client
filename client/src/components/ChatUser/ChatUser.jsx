import React, { createRef, useEffect } from 'react';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import OutImg from '../../images/roomOut.png';

const ChatUser = ({
  idValue,
  targetId,
  targetToggle,
  roomTitle,
  roomPeople,
  dataFunc,
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
    targetToggle(-1);
    console.log(targetId);
    Card.current.style.display = 'none';
  };

  return (
    <>
      <div className={styles.usercard} ref={Card} onClick={handleCard}>
        <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
        <div className={styles.username}>{roomTitle}</div>
        <div className={styles.userbreed}>{roomPeople}</div>
        <div className={styles.status}>안 읽은 메시지가 있습니다.</div>
      </div>
      <img
        className={styles.outButton}
        src={OutImg}
        alt="roomOut"
        onClick={roomBye}
      />
    </>
  );
};
export default ChatUser;

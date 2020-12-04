import React, { createRef, useEffect, useState } from 'react';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';

const ChatUser = ({ idValue, state, stateFunc }) => {
  const Card = createRef();
  console.log(idValue);

  const [changes, changeToggle] = useState(state);

  useEffect(() => {
    if (state !== idValue) {
      Card.current.style.backgroundColor = 'white';
      console.log(changes);
      console.log(changeToggle);
    }
  });

  const handleCard = function () {
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    stateFunc(idValue);
    Card.current.style.backgroundColor = 'rgba(255,198,0)';
    if (arr.includes(navigator.platform)) {
      if (state === 1) {
        stateFunc(2);
      } else {
        stateFunc(idValue);
        console.log(state);
      }
    }
  };

  return (
    <div className={styles.usercard} ref={Card} onClick={handleCard}>
      <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
      <div className={styles.username}>닉네임은팔글자요</div>
      <div className={styles.userbreed}>글자수는열다섯으로기준을잡겠다</div>
      <div className={styles.status}>안 읽은 메시지가 있습니다.</div>
    </div>
  );
};
export default ChatUser;

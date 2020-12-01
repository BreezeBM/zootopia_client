import React from 'react';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';

const ChatUser = () => {
  return (
    <div className={styles.usercard}>
      <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
      <div className={styles.username}>닉네임은팔글자요</div>
      <div className={styles.userbreed}>글자수는열다섯으로기준을잡겠다</div>
      <div className={styles.status}>안 읽은 메시지가 있습니다.</div>
    </div>
  );
};
export default ChatUser;

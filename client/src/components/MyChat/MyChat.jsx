import React from 'react';
import styles from './MyChat.module.css';

const MyChat = () => {
  const messageContent =
    '나의 메시지 위치 테스트0000000000000000000000sdasdasdasd';
  return (
    <div className={styles.talkBox}>
      <div className={styles.message}>{messageContent}</div>
      <div className={styles.dates}>2020-12-01-TUE</div>
    </div>
  );
};

export default MyChat;

import React from 'react';
import styles from './MyChat.module.css';

const MyChat = ({ textData }) => {
  const messageContent = textData;
  return (
    <div className={styles.talkBox}>
      <div className={styles.message}>{messageContent}</div>
      <div className={styles.dates}>2020-12-01-TUE</div>
    </div>
  );
};

export default MyChat;

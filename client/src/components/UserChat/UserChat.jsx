import React from 'react';
import styles from './UserChat.module.css';
import iguanaImg from '../../images/iguana.jpeg';

const UserChat = ({ textData, dateData }) => {
  const messageContent = textData;

  return (
    <div className={styles.talkBox}>
      <img
        className={styles.chatProfile}
        src={iguanaImg}
        alt="chatprofile_img"
      />
      <div className={styles.message}>{messageContent}</div>
      <div className={styles.dates}>{dateData}</div>
    </div>
  );
};

export default UserChat;

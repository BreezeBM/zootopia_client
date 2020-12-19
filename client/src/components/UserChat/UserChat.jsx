import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './UserChat.module.css';

const UserChat = ({ textData, dateData, userId, img }) => {
  const messageContent = textData;
  const [userData, setData] = useState(false);

  const kakao = async (id) => {
    const res = await axios.get(
      `https://server.codestates-project.tk/user/${id}`,
      { withCredentials: true },
    );

    setData(res.data);
    console.log(userData);
  };

  useEffect(() => {
    kakao(userId);
    setData(false);
  }, []);

  console.log('스몰메시지 랜딩');
  console.log(img === 'false');

  return (
    <div className={styles.talkBox}>
      <img
        className={styles.chatProfile}
        src={userData.thumbnail}
        alt="chatprofile_img"
      />
      <div className={styles.message}>{messageContent}</div>
      <div className={styles.dates}>{dateData}</div>
    </div>
  );
};

export default UserChat;

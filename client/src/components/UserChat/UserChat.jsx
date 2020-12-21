import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import styles from './UserChat.module.css';

const UserChat = ({ textData, dateData, userId, img }) => {
  const messageContent = textData;
  const [userData, setData] = useState(false);

  let size = '15%';
  if (textData.length > 4 && textData.length < 12) {
    size = '35%';
  } else if (textData.length > 12) {
    size = '45%';
  }

  const Message = styled.div`
    position: relative;
    display: flex;
    padding: 2%;
    border: 2px solid #e7e7e7;
    border-radius: 1rem;
    width: ${(props) => props.size};
    left: 3rem;
    font-family: MaplestoryOTFLight;
    font-size: 0.8rem;
    transition: all 250ms ease-in-out;
    word-break: break-all;
    text-align: center;
    flex-direction: column;
  `;

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
      <Message size={size}>{messageContent}</Message>
      <div className={styles.dates}>{dateData}</div>
    </div>
  );
};

export default UserChat;

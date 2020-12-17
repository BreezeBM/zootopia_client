import React, { createRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';
import axios from 'axios';
import styles from './PrivateChat.module.css';
import OutImg from '../../images/roomOut.png';

const socket = io('https://chat.codestates-project.tk/', {
  withCredentials: true,
});

const PrivateChat = ({
  idValue,
  unread,
  targetId,
  targetToggle,
  connection,
  roomPeople,
  dataFunc,
  youProfile,
  getUserData,
  Myid,
  Youid,
}) => {
  const Card = createRef();
  const history = useHistory();

  const [userData, setData] = useState(false);

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
    getUserData(Youid);
    setTimeout(dataFunc(idValue), 200);
  };

  const kakao = async (id) => {
    const res = await axios.get(
      `https://server.codestates-project.tk/user/${id}`,
      { withCredentials: true },
    );
    if (!userData) {
      setData(res.data);
    }
  };

  kakao(Youid);

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
        history.push('/main');
        history.push('/chat');
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

  console.log('스몰 렌더링');

  return (
    <>
      <div className={styles.usercard} ref={Card} onClick={handleCard}>
        <img
          className={styles.userProfile}
          src={userData.thumbnail}
          alt="userprofile"
        />
        <div className={styles.username}>{userData.petName}</div>
        <div className={styles.userbreed}>{connection}</div>
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
export default PrivateChat;

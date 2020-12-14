import React, { useState } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import styles from './AddroomModal.module.css';
import close from '../../images/close.png';
import submitImg from '../../images/create.png';
import backImg from '../../images/cloud.gif';

const socket = io('https://zootopia-chat.herokuapp.com/', {
  withCredentials: true,
});

const AddroomModal = ({
  isModalOn,
  handleClose,
  roomState,
  setRoom,
  children,
}) => {
  const [titleInfo, setTitleInfo] = useState('');
  const [checked, setChecked] = useState({ title: true });

  const checkTitle = (e) => {
    setChecked({ title: true });
    if (e.target.value.length > 18 || e.target.value.length === 0) {
      setChecked({ title: false });
    }
    setTitleInfo(e.target.value);
    console.log(titleInfo);
  };

  const sendRoom = () => {
    console.log('보내기 실행!');
    if (checked.title) {
      const titleData = JSON.stringify({
        title: `${titleInfo}`,
      });
      const config = {
        method: 'post',
        url: `https://zootopia-chat.herokuapp.com/room/public/:5`,
        headers: { 'Content-Type': 'application/json' },
        data: titleData,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
      socket.on('newRoom', function (room) {
        console.log(room);
        setRoom([...roomState, room]);
      });
    }
  };

  return (
    <>
      <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
        <div className={styles.box}>
          <img
            className={styles.close}
            src={close}
            alt="close"
            onClick={handleClose}
          />
          {/* ** */}
          {children}
          <img className={styles.backGround} src={backImg} alt="movingBack" />
          <input
            className={styles.roomInput}
            type="text"
            placeholder="채팅방의 제목을 정해주세요.."
            onChange={checkTitle}
          />
          <img
            className={styles.submit}
            src={submitImg}
            onClick={sendRoom}
            alt="submit"
          />
          {/* ** */}
        </div>
      </div>
    </>
  );
};

export default AddroomModal;

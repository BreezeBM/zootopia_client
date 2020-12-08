import React from 'react';
import styled from 'styled-components';
import styles from './MyChat.module.css';

const MyChat = ({ textData, dateData }) => {
  let sizes = '20%';
  if (textData.length > 10) {
    sizes = '35%';
  }
  const messageContent = textData;
  const Message = styled.div`
    position: relative;
    display: flex;
    padding: 2%;
    border: 2px solid #e7e7e7;
    border-radius: 1rem;
    width: ${(props) => props.size};
    margin-left: 60%;
    margin-right: 2%;
    font-family: MaplestoryOTFLight;
    font-size: 0.8rem;
    transition: all 180ms ease-in-out;
    word-break: break-all;
    flex-direction: column;
  `;

  return (
    <div className={styles.talkBox}>
      <Message size={sizes}>{messageContent}</Message>
      <div className={styles.dates}>{dateData}</div>
    </div>
  );
};

export default MyChat;

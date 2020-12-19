import React from 'react';
import styled from 'styled-components';
import styles from './MyChat.module.css';

const MyChat = ({ textData, dateData }) => {
  let sizes = '15%';
  let sizes2 = '82%';
  if (textData.length > 4 && textData.length < 12) {
    sizes = '25%';
    sizes2 = '72%';
  } else if (textData.length >= 12) {
    sizes = '40%';
    sizes2 = '57%';
  }
  const messageContent = textData;
  const Message = styled.div`
    position: relative;
    display: flex;
    padding: 2%;
    border: 2px solid #e7e7e7;
    border-radius: 1rem;
    width: ${(props) => props.size};
    margin-left: ${(props) => props.sizes2};
    margin-right: 2%;
    font-family: MaplestoryOTFLight;
    font-size: 0.8rem;
    text-align: center;
    transition: all 180ms ease-in-out;
    word-break: break-all;
    flex-direction: column;
  `;

  return (
    <div className={styles.talkBox}>
      <Message size={sizes} sizes2={sizes2}>
        {messageContent}
      </Message>
      <div className={styles.dates}>{dateData}</div>
    </div>
  );
};

export default MyChat;

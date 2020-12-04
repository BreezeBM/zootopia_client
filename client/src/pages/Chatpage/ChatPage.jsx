import React, { createRef, useEffect, useState } from 'react';
import styles from './ChatPage.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import ChatUser from '../../components/ChatUser/ChatUser';
import MyChat from '../../components/MyChat/MyChat';

const username = '닉네임은팔글자요';
const breedname = '글자수는열다섯으로기준을잡겠다';
const messageContent =
  '본사는 소규모창업아이템으로 성공한 사례와 실패 사례에관한 경험을 바탕으로 외식업 창업 성공에 관한 전문지식을 갖춘 창업 전문가들이 상권분석, 매장계약, 오픈 전까지의 모든 과정을 컨설팅하여 진행 중”이라며 “한식도시락배달 창업 또는 샵인샵배달창업을 고려하고 있는 예비 가맹점주들은 전문 상담을 통해 문의 해보길 바란다”고 전했다.';

const ChatPage = () => {
  const test = createRef();
  const test2 = createRef();

  const myFunction = function (e) {
    if (e.keyCode === 13) {
      console.log(isOn);
      alert('엔터치셨네요. 채팅치는 기능은 곧 나옵니다!');
    }
  };
  const [isOn, isOntoggle] = useState(1);

  useEffect(() => {
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    if (arr.includes(navigator.platform)) {
      console.log(test.current.style);
      if (isOn > 2) {
        test.current.style.display = 'none';
      }
    }
  });

  return (
    <div className={styles.main}>
      <div className={styles.main}> </div>
      <div className={styles.flexBox}>
        <div className={styles.listBox} ref={test}>
          <div className={styles.profile}>
            <img className={styles.image} src={iguanaImg} alt="profile" />
            <div className={styles.name}>{username}</div>
            <div className={styles.breed}>{breedname}</div>
          </div>
          <div className={styles.userlist}>
            <div className={styles.profileBlock}>모바일 버전용</div>
            <ChatUser
              idValue={3}
              state={isOn}
              stateFunc={isOntoggle}
              ref={test}
            />
            <ChatUser
              idValue={5}
              state={isOn}
              stateFunc={isOntoggle}
              ref={test}
            />
            <ChatUser
              idValue={20}
              state={isOn}
              stateFunc={isOntoggle}
              ref={test}
            />
          </div>
        </div>
        <div className={styles.chatBox}>
          <div className={styles.chatonBoard}>
            <div className={styles.block}> </div>
            <div className={styles.talkBox}>
              <img
                className={styles.chatProfile}
                src={iguanaImg}
                alt="chatprofile_img"
              />
              <div className={styles.message}>{messageContent}</div>
              <div className={styles.dates}>2020-11-30-MON</div>
            </div>
            <div className={styles.talkBox} ref={test2}>
              <img
                className={styles.chatProfile}
                src={iguanaImg}
                alt="chatprofile_img"
              />
              <div className={styles.message}>{messageContent}</div>
              <div className={styles.dates}>2020-11-30-MON</div>
            </div>

            <div className={styles.talkBox}>
              <img
                className={styles.chatProfile}
                src={iguanaImg}
                alt="chatprofile_img"
              />
              <div className={styles.message}>{messageContent}</div>
              <div className={styles.dates}>2020-11-30-MON</div>
            </div>
            <MyChat />
          </div>
          <input
            className={styles.chatPost}
            type="text"
            placeholder="메시지 입력.."
            onKeyDown={myFunction}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
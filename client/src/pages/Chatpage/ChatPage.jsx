import React, { createRef, useEffect, useState } from 'react';
import styles from './ChatPage.module.css';
import iguanaImg from '../../images/iguana.jpeg';
import ChatUser from '../../components/ChatUser/ChatUser';
import MyChat from '../../components/MyChat/MyChat';
import UserChat from '../../components/UserChat/UserChat';

const username = '깽순이가먹다버린빵은슬펐다';
const breedname = '블라블라블라블라블라블라블라블라블블라블라블라';
let messageContent = '치즈모짜렐라체다고다치즈페이젝카마렐 ';

const fakeData = [
  {
    userId: 2,
    time: '2020-12-08 22:30',
    text: '안녕하세요 저는 김코딩입니다.',
  },
  { userId: 1, time: '2020-12-08 22:31', text: '누구시죠? 안사요' },
  {
    userId: 2,
    time: '2020-12-08 22:40',
    text: '아뇨 그게 아니고요 코딩 한수를 배우기 위해서 연락을 드렸습니다.',
  },
  {
    userId: 1,
    time: '2020-12-08 22:50',
    text:
      '입금먼저 하시죠 제가 바로 코딩계 이구아인입니다. 한번 코딩 썻다하면 바로 스트라이크 들어갑니다.',
  },
  {
    userId: 2,
    time: '2020-12-08 23:30',
    text: '.......?   @#$@^%^*^&( English test',
  },
];

let testContent = fakeData.map((el) => {
  if (el.userId === 1) {
    return <MyChat textData={el.text} dateData={el.time} />;
  } else {
    return <UserChat textData={el.text} dateData={el.time} />;
  }
});

const ChatPage = () => {
  const targetUser = createRef();
  const targetList = createRef();

  const myFunction = function (e) {
    if (e.keyCode === 13) {
      messageContent = e.target.value;
    }
  };
  const [targetId, targetToggle] = useState(-1);

  useEffect(() => {
    const arr = ['Win16', 'Win32', 'Win64', 'Mac', 'MacIntel'];
    if (!arr.includes(navigator.platform)) {
      if (targetId > 0) {
        targetList.current.style.display = 'none';
      }
    }
  });

  return (
    <div className={styles.main}>
      <div className={styles.main}> </div>
      <div className={styles.flexBox}>
        <div className={styles.listBox} ref={targetList}>
          <div className={styles.profile}>
            <img className={styles.image} src={iguanaImg} alt="profile" />
            <div className={styles.name}>{username}</div>
            <div className={styles.breed}>{breedname}</div>
          </div>
          <div className={styles.userlist}>
            <div className={styles.profileBlock}>모바일 버전용</div>
            <ChatUser
              idValue={1}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={2}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={3}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={4}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={5}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={6}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={7}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={511}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={225}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={533}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={544}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={566}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={588}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
            />
            <ChatUser
              idValue={599}
              state={targetId}
              stateFunc={targetToggle}
              ref={targetUser}
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
            <div className={styles.talkBox}>
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
            <MyChat textData={messageContent} />
            <MyChat textData={messageContent} />
            <MyChat textData={messageContent} />
            {testContent}
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

import React, { createRef, useEffect, useState } from 'react';
import styles from './ChatUser.module.css';
import iguanaImg from '../../images/iguana.jpeg';

const ChatUser = ({ idValue, state, stateFunc }) => {
  const Card = createRef();

  const [changes, changeToggle] = useState(state);

  useEffect(() => {
    if (state !== idValue && changeToggle) {
      Card.current.style.backgroundColor = 'white';
    }
  });

  const handleCard = function () {
    stateFunc(idValue);
    console.log(changes);
    Card.current.style.backgroundColor = 'rgba(255,198,0)';
  };

  return (
    <div className={styles.usercard} ref={Card} onClick={handleCard}>
      <img className={styles.userProfile} src={iguanaImg} alt="userprofile" />
      <div className={styles.username}>
        크리스마스에는눈이내릴까요?왔음좋겠어
      </div>
      <div className={styles.userbreed}>
        모두가행복한나늘들을보낼수있길바랍니다20자넘는다
      </div>
      <div className={styles.status}>안 읽은 메시지가 있습니다.</div>
    </div>
  );
};
export default ChatUser;

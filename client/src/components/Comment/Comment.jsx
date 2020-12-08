import { React, useState, useRef } from 'react';
import styles from './Comment.module.css';
import dummyImg from '../../thumbnails/post_c.png';
import SubComments from '../SubComments/SubComments';
import updateBtn from '../../images/commentUpdateBtn.jpg';

const Comment = ({ handleCommentBtn }) => {
  const textRef = useRef(null);
  const [updateToggled, setUpdateToggled] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [textInput, setTextInput] = useState('  정신못차리네;');

  return (
    <>
      <div className={styles.eachComment}>
        <div className={styles.subComment}>
          <div className={styles.contentsPart}>
            <img className={styles.profile} src={dummyImg} alt="profile" />
            <div className={styles.commentPart}>
              <span className={styles.nickname}>핏불이삼촌</span>
              {textUpdateToggled ? (
                <input
                  spellCheck={false}
                  ref={textRef}
                  className={styles.textInput}
                  type="text"
                  value={textInput}
                  onChange={(e) => {
                    setTextInput(e.target.value);
                  }}
                />
              ) : (
                <span className={styles.textPart}>정신못차리네;</span>
              )}
            </div>
          </div>
          <div className={styles.dateAndBtnPart}>
            <span className={styles.date}>지금</span>
            <span className={styles.commentBtn} onClick={handleCommentBtn}>
              답글 달기
            </span>
            {updateToggled ? (
              <div className={styles.updateBtns}>
                <img
                  className={styles.closeUpdateBtn}
                  src={updateBtn}
                  alt="updateBtn"
                  onClick={() => {
                    setUpdateToggled(false);
                  }}
                />
                <i
                  id={styles.goToInputBtn}
                  className="far fa-edit"
                  onClick={async () => {
                    if (textUpdateToggled === true) {
                      textRef.current.blur();
                      setTextUpdateToggled(false);
                      setUpdateToggled(false);
                    } else {
                      await setTextUpdateToggled(true);
                      textRef.current.focus();
                    }
                  }}
                />
                <i
                  id={styles.commentDeleteBtn}
                  className="fas fa-trash-alt"
                  onClick={() => {
                    console.log('제거 로직');
                    setUpdateToggled(false);
                  }}
                />
              </div>
            ) : (
              <img
                className={styles.updateBtn}
                src={updateBtn}
                alt="updateBtn"
                onClick={() => {
                  setUpdateToggled(true);
                }}
              />
            )}
          </div>
        </div>
        <SubComments handleCommentBtn={handleCommentBtn} />
      </div>
    </>
  );
};

export default Comment;

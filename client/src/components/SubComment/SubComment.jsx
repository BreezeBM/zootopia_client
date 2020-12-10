import { React, useRef, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import styles from './SubComment.module.css';
import updateBtn from '../../images/commentUpdateBtn.jpg';

const SubComment = ({
  getSpecificUser,
  postId,
  refreshPost,
  replyId,
  userId,
  commentId,
  setCommentId,
  setCommentToWhom,
  thumbnail,
  petName,
  text,
  time,
  handleCommentBtn,
}) => {
  const textRef = useRef(null);
  const [updateToggled, setUpdateToggled] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [textInput, setTextInput] = useState(null);

  // 대댓글 삭제
  const deleteSubComment = async () => {
    try {
      const response = await axios.delete(
        `https://server.codestates-project.tk/post/reply`,
        {
          postId,
          replyId,
        },
        { withCredentials: true },
      );
      refreshPost(response.data.comments);
      setUpdateToggled(false);
    } catch (err) {
      if (err.response.status === 401) {
        history.push('/');
      } else {
        console.log(err);
      }
    }
  };

  // 대댓글 수정
  const updateSubComment = async () => {
    if (textUpdateToggled === true) {
      try {
        const response = await axios.patch(
          `https://server.codestates-project.tk/post/reply`,
          {
            postId,
            replyId,
            text: textInput,
          },
          { withCredentials: true },
        );
        refreshPost(response.data.comments);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else {
          console.log(err);
        }
      }
      setTextUpdateToggled(false);
      setUpdateToggled(false);
    } else {
      await setTextInput(text);
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  return (
    <div className={styles.subComment}>
      <div
        className={styles.contentsPart}
        onClick={() => {
          getSpecificUser(userId);
        }}
      >
        <img className={styles.profile} src={thumbnail} alt="profile" />
        <div className={styles.commentPart}>
          <span className={styles.nickname}>{petName}</span>
          {textUpdateToggled ? (
            <input
              onBlur={updateSubComment}
              onKeyDown={checkEnterPress}
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
            <span className={styles.textPart}>{text}</span>
          )}
        </div>
      </div>
      <div className={styles.dateAndBtnPart}>
        <span className={styles.date}>{time}</span>
        <span
          className={styles.commentBtn}
          onClick={async () => {
            await setCommentId(commentId);
            await setCommentToWhom(petName);
            handleCommentBtn();
          }}
        >
          답글 달기
        </span>
        {updateToggled ? (
          <div className={styles.updateBtns}>
            <img
              className={styles.closeUpdateBtn}
              src={updateBtn}
              alt="updateBtn"
              onClick={() => {
                setTextUpdateToggled(false);
                setTextInput(text);
                setUpdateToggled(false);
              }}
            />
            <i
              id={styles.goToInputBtn}
              className="far fa-edit"
              onClick={updateSubComment}
            />
            <i
              id={styles.commentDeleteBtn}
              className="fas fa-trash-alt"
              onClick={deleteSubComment}
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
  );
};

export default SubComment;

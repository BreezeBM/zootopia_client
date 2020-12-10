/* eslint-disable no-nested-ternary */
import { React, useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import styles from './Comment.module.css';
import SubComments from '../SubComments/SubComments';
import updateBtn from '../../images/commentUpdateBtn.jpg';

const Comment = ({
  userProfileId,
  userId,
  getSpecificUser,
  setCommentId,
  setCommentToWhom,
  refreshPost,
  postId,
  replies,
  deleteComment,
  commentId,
  thumbnail,
  petName,
  text,
  time,
  handleCommentBtn,
}) => {
  // 수정권한이 있는지에 관한 처리
  const [hasRights, setHasRights] = useState(false);
  const textRef = useRef(null);
  const [updateToggled, setUpdateToggled] = useState(false);
  const [textUpdateToggled, setTextUpdateToggled] = useState(false);
  const [textInput, setTextInput] = useState(null);

  // 댓글 수정
  const updateComment = async () => {
    console.log(commentId);
    if (textUpdateToggled === true) {
      try {
        const response = await axios.patch(
          'https://server.codestates-project.tk/post/comment',
          {
            postId,
            commentId,
            text: textInput,
          },
          {
            withCredentials: true,
          },
        );
        refreshPost(response.data.comments);
        setTextUpdateToggled(false);
        setUpdateToggled(false);
      } catch (err) {
        if (err.response.status === 401) {
          history.push('/');
        } else {
          console.log(err);
        }
      }
    } else {
      setTextInput(text);
      await setTextUpdateToggled(true);
      textRef.current.focus();
    }
  };

  const checkEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.target.blur();
    }
  };

  // 수정권한이 있는지에 관한 처리
  useEffect(() => {
    if (userProfileId === userId) {
      setHasRights(true);
    }
  }, [userProfileId, userId]);

  return (
    <>
      <div className={styles.eachComment}>
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
                  onBlur={updateComment}
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
            {hasRights ? (
              updateToggled ? (
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
                    onClick={updateComment}
                  />
                  <i
                    id={styles.commentDeleteBtn}
                    className="fas fa-trash-alt"
                    onClick={() => {
                      deleteComment(commentId);
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
              )
            ) : null}
          </div>
        </div>
        <SubComments
          userProfileId={userProfileId}
          getSpecificUser={getSpecificUser}
          commentId={commentId}
          setCommentId={setCommentId}
          setCommentToWhom={setCommentToWhom}
          postId={postId}
          refreshPost={refreshPost}
          replies={replies}
          handleCommentBtn={handleCommentBtn}
        />
      </div>
    </>
  );
};

export default Comment;

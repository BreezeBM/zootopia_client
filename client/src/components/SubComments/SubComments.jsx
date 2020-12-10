import React from 'react';
import styles from './SubComments.module.css';
import SubComment from '../SubComment/SubComment';

const SubComments = ({
  userProfileId,
  setCommentToWhom,
  getSpecificUser,
  postId,
  commentId,
  refreshPost,
  setCommentId,
  replies,
  handleCommentBtn,
}) => {
  return (
    <div className={styles.subComments}>
      {replies.map((reply) => {
        return (
          <SubComment
            userProfileId={userProfileId}
            getSpecificUser={getSpecificUser}
            commentId={commentId}
            setCommentId={setCommentId}
            setCommentToWhom={setCommentToWhom}
            postId={postId}
            refreshPost={refreshPost}
            key={reply.replyId}
            replyId={reply.replyId}
            userId={reply.userId}
            thumbnail={reply.thumbnail}
            petName={reply.petName}
            text={reply.text}
            time={reply.time}
            handleCommentBtn={handleCommentBtn}
          />
        );
      })}
    </div>
  );
};

export default SubComments;

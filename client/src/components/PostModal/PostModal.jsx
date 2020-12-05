import React, { useState } from 'react';
import styles from './PostModal.module.css';
import ImageSlide from '../ImageSlide/ImageSlide';
import close from '../../images/close.png';
import Comments from '../Comments/Comments';
import dummyImg from '../../thumbnails/post_f.png';
import likeImg from '../../images/fulfilledHeart.png';
import unLikeImg from '../../images/unfulfilledHeart.png';
import chatImg from '../../images/chat.png';
import goBackBtn from '../../images/goBackBtn.png';

const PostModal = ({ imageUrls, isModalOn, handleClose }) => {
  const [like, setLike] = useState(false);
  const [commentToggle, setCommentToggle] = useState(false);
  const [webCommentFolder, setWebCommentFolder] = useState(false);

  const handleCommentFolder = () => {
    const mediaQuery = window.matchMedia('(max-width: 65rem)');
    if (!mediaQuery.matches) {
      setWebCommentFolder(!webCommentFolder);
      setCommentToggle(false);
    } else {
      setCommentToggle(true);
      setWebCommentFolder(false);
    }
  };

  const handleLike = () => {
    setLike(!like);
  };

  return (
    <div className={`${styles.modal} ${isModalOn && styles.isOn}`}>
      <div className={styles.box}>
        <img
          className={styles.close}
          src={close}
          alt="close"
          onClick={handleClose}
        />
        {webCommentFolder ? (
          <div className={styles.commentsScreen}>
            <img
              className={styles.goBackBtn}
              src={goBackBtn}
              alt="goBackButton"
              onClick={handleCommentFolder}
            />
            <div className={styles.commentsPart}>
              <Comments />
            </div>
          </div>
        ) : (
          <div className={styles.postModal}>
            <ImageSlide imageUrls={imageUrls} />
            <div className={styles.contents}>
              <div className={styles.userArea}>
                <div className={styles.profile_imgage}>
                  <img
                    className={styles.profile_image_img}
                    src={dummyImg}
                    alt="profile"
                  />
                </div>
                <div
                  className={styles.profile_inform}
                  onClick={() => {
                    console.log('해당 유저 grid 정보 요청');
                  }}
                >
                  <div className={styles.nickname}>아..그거 뭐더라.. 그..</div>
                  <div className={styles.breed}>낚시꾼</div>
                </div>
              </div>
              <div className={styles.textArea}>
                미안하다 이거 보여주려고 어그로끌었다.. 나루토 사스케 싸움수준
                ㄹㅇ실화냐? 진짜 세계관최강자들의 싸움이다.. 그찐따같던 나루토가
                맞나? 진짜 나루토는 전설이다..진짜옛날에 맨날나루토봘는데
                왕같은존재인 호카게 되서 세계최강 전설적인 영웅이된나루토보면
                진짜내가다 감격스럽고 나루토 노래부터 명장면까지
                가슴울리는장면들이 뇌리에 스치면서 가슴이 웅장해진다.. 그리고
                극장판 에 카카시앞에 운석날라오는 거대한 걸 사스케가 갑자기
                순식간에 나타나서 부숴버리곤 개간지나게 나루토가 없다면 마을을
                지킬 자는 나밖에 없다 라며 바람처럼 사라진장면은 진짜
                나루토처음부터 본사람이면 안울수가없더라 진짜 너무 감격스럽고
                보루토를 최근에 알았는데 미안하다.. 지금20화보는데 진짜
                나루토세대나와서 너무 감격스럽고 모두어엿하게 큰거보니 내가 다
                뭔가 알수없는 추억이라해야되나 그런감정이 이상하게 얽혀있다..
                시노는 말이많아진거같다 좋은선생이고..그리고 보루토왜욕하냐
                귀여운데 나루토를보는것같다 성격도 닮았어 그리고버루토에
                나루토사스케 둘이싸워도 이기는 신같은존재 나온다는게 사실임??
                그리고인터닛에 쳐봣는디 이거 ㄹㅇㄹㅇ 진짜팩트냐?? 저적이
                보루토에 나오는 신급괴물임?ㅡ 나루토사스케 합체한거봐라 진짜
                ㅆㅂ 이거보고 개충격먹어가지고 와 소리 저절로 나오더라 ;; 진짜
                저건 개오지는데.. 저게 ㄹㅇ이면 진짜 꼭봐야돼 진짜 세계도
                파괴시키는거아니야 .. 와 진짜 나루토사스케가 저렇게 되다니 진짜
                눈물나려고했다.. 버루토그라서 계속보는중인데 저거 ㄹㅇ이냐..?
                하.. ㅆㅂ 사스케 보고싶다.. 진짜언제 이렇게 신급 최강들이
                되었을까 옛날생각나고 나 중딩때생각나고 뭔가 슬프기도하고
                좋기도하고 감격도하고 여러가지감정이 복잡하네.. 아무튼 나루토는
                진짜 애니중최거명작임.
              </div>
              <div className={styles.date}>2020/12/04 20:23 (금)</div>
              <div className={styles.buttonArea}>
                {like ? (
                  <img
                    className={styles.like}
                    src={likeImg}
                    alt="like"
                    onClick={handleLike}
                  />
                ) : (
                  <img
                    className={styles.unLike}
                    src={unLikeImg}
                    alt="unlike"
                    onClick={handleLike}
                  />
                )}
                <img className={styles.chatImg} src={chatImg} alt="chat" />
                <div className={styles.likeCount}>좋아요 12개</div>
              </div>
              {commentToggle ? (
                <>
                  <div
                    className={styles.commentFolder}
                    onClick={() => {
                      setCommentToggle(false);
                    }}
                  >
                    댓글 접기
                  </div>
                  <Comments />
                </>
              ) : (
                <div
                  className={styles.commentFolder}
                  onClick={handleCommentFolder}
                >
                  댓글 펼치기..(10)
                </div>
              )}
              <div className={styles.inputPart}>
                <input
                  className={styles.commentInput}
                  spellCheck="false"
                  type="text"
                  placeholder="댓글 달기.."
                />
                <div
                  className={styles.commentButton}
                  onClick={() => {
                    console.log('hi');
                  }}
                >
                  게시
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostModal;

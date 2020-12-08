import img from './thumbnails/post_f.png';
import img1 from './thumbnails/post_g.png';
import img2 from './thumbnails/post_e.png';
import img3 from './thumbnails/post_a.png';
import img4 from './thumbnails/post_b.png';
import img5 from './thumbnails/post_c.png';
import img6 from './thumbnails/post_d.png';

export default {
    posts: [{ postId: 0, thumbnail: img }, { postId: 1, thumbnail: img1 }, { postId: 2, thumbnail: img2 }, { postId: 3, thumbnail: img3 }, { postId: 4, thumbnail: img4 }, { postId: 5, thumbnail: img5 }, { postId: 6, thumbnail: img6 },],
    user: { userId: 2, thumbnail: img6, petName: '곤잘로 이구아인', breed: '이구아나', postCount: 22 },
    post: {
        user: {
            userId: 3, thumbnail: img3, petName: '시바견 산체스', breed: '시바견',
            postCount: 24
        },
        post: {
            text: '한번에 가자 제발', postId: 0, picture_1: img1, picture_2: img2, picture_3: img3, likeCount: 11, likeChecked: true, time: '2020/12/07 (월)'
        },
    },
    comments: [
        {
            commentId: 0, userId: 3, thumbnail: img3, petName: '시바견 산체스', breed: '시바견', text: '제발 한번에 갑시다...', time: '지금',
            replies: [
                { replyId: 0, userId: 2, thumbnail: img6, petName: '곤잘로 이구아인', breed: '이구아나', text: '그래 한번에 가자..', time: '지금' },
                { replyId: 1, userId: 3, thumbnail: img3, petName: '시바견 산체스', breed: '시바견', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ오키', time: '지금' },
                { replyId: 2, userId: 2, thumbnail: img6, petName: '곤잘로 이구아인', breed: '이구아나', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ', time: '지금' },
            ]
        },
        {
            commentId: 1, userId: 4, thumbnail: img1, petName: '스눕독맘', breed: '눕독', text: '뭐함 너네', time: '지금',
            replies: [
                { replyId: 0, userId: 2, thumbnail: img6, petName: '곤잘로 이구아인', breed: '이구아나', text: 'ㅎㅎㅎㅗ', time: '지금' },
                { replyId: 1, userId: 3, thumbnail: img3, petName: '시바견 산체스', breed: '시바견', text: 'ㅋㅋㅋㅋㅋㅋㅋㅋㅋ', time: '지금' },
                { replyId: 2, userId: 4, thumbnail: img1, petName: '스눕독맘', breed: '눕독', text: '어이가 없네;', time: '지금' },
            ]
        },
    ]
}


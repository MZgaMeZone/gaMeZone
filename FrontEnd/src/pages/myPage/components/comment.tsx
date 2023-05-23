import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gomaImg from '../../../images/gomao.png';
import axios from 'axios';
import moment from 'moment';
import Pagination from './pagination';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function Comment() {
  useEffect(() => {
    console.log('Check effect');
    const fetchData = async () => {
      const {
        data: { email },
      } = await axios.get(url + '/api/users', config);
      const { data: commentList } = await axios.get(
        url + `/api/comments/${email}`
      );
      const formattedData = commentList.map((item: any) => ({
        ...item,
        createdAt: moment(item.createdAt).format('YYYY-MM-DD HH:mm:ss'),
      }));
      setCommentList(formattedData);
    };
    fetchData();
  }, []);

  //   const comment = [
  //     {
  //       id: 1,
  //       nickname: 'gomao',
  //       date: '2023-05-19',
  //       content:
  //         '오 진짜 유익하네요 감사합니다 이 댓글은 있잖아요 정말로 엄청나게 길어요 왜냐하면 제가 더보기 기능을 구현해보고싶거든요 그래서 정말이지 무지무지길답니다 정말 길죠?오 진짜 유익하네요 감사합니다 이 댓글은 있잖아요 정말로 엄청나게 길어요 왜냐하면 제가 더보기 기능을 구현해보고싶거든요 그래서 정말이지 무지무지길답니다 정말 길죠?오 진짜 유익하네요 감사합니다 이 댓글은 있잖아요 정말로 엄청나게 길어요 왜냐하면 제가 더보기 기능을 구현해보고싶거든요 그래서 정말이지 무지무지길답니다 정말 길죠?',
  //       category: '자유게시판',
  //     },
  //     {
  //       id: 2,
  //       nickname: 'cute',
  //       date: '2023-05-20',
  //       content: '재밌어여',
  //       category: '인증게시판',
  //     },
  //     {
  //       id: 3,
  //       nickname: 'cute',
  //       date: '2023-05-21',
  //       content: '엥 나보다 못함 ㅋ',
  //       category: '인증게시판',
  //     },
  //     {
  //       id: 4,
  //       nickname: 'cute',
  //       date: '2023-05-22',
  //       content: 'ㅎ ㅏ 벌써 한시사십분이여',
  //       category: '인증게시판',
  //     },
  //   ];

  interface Comment {
    _id: string;
    content: string;
    author: { nickname: string };
    post: string;
    createdAt: string;
  }

  const [commentList, setCommentList] = useState<Comment[]>([]);
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = commentList.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [isShowMore, setIsShowMore] = useState<boolean>(false); //더보기 열고(긴글) 닫기(짧은글)
  const textLimit = 170; //글자수 제한 선언

  return (
    <>
      <Wrapper>
        {currentComments.length === 0 ? (
          <h1>내가 쓴 댓글이 없습니다.</h1>
        ) : (
          currentComments.map((comment) => {
            const shortComment = comment.content.slice(0, textLimit); //보여줄 짧은 글
            const isLongComment = comment.content.length > textLimit; //긴글인지 확인
            return (
              <>
                <Link to={`/community/${comment.post}`}>
                  <CommentInfo key={comment._id}>
                    <ProfileBox>
                      <img src={gomaImg} alt="프로필" />
                      <h1>{comment.author.nickname}</h1>
                      <Date>
                        <h1>{comment.createdAt}</h1>
                      </Date>
                    </ProfileBox>
                    <CommentContent>
                      {' '}
                      {isLongComment && !isShowMore
                        ? shortComment
                        : comment.content}
                    </CommentContent>
                    <div
                      onClick={() => setIsShowMore(!isShowMore)}
                      style={{
                        fontSize: '1.7rem',
                        marginLeft: '2.1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {comment.content.length > textLimit &&
                        (isShowMore ? '[닫기]' : '...[더보기]')}
                    </div>
                    {/* <h2>{comment.category}</h2> */}
                  </CommentInfo>
                </Link>
              </>
            );
          })
        )}
      </Wrapper>
      <PagenationBox>
        <Pagination
          postsPerPage={commentsPerPage}
          totalPosts={commentList.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </PagenationBox>
    </>
  );
}

const Wrapper = styled.div`
  margin: 3rem auto;
  width: 90%;
  height: 45rem;

  //스크롤
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    height: 30%;
    width: 16px;
    background: #b3b5b5;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: #ebeded;
  }
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  background-color: white;

  img {
    width: 50px;
    border-radius: 50%;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
    margin-right: 2rem;
  }

  h1 {
    margin-top: 1rem;
    margin-right: 3rem;
  }

  h2 {
    margin-top: 1rem;
    margin-left: 2.7rem;
  }
`;

const ProfileBox = styled.div`
  margin-left: 3rem;
  display: flex;
  align-items: center;
`;

const Date = styled.div`
  margin-left: 70rem;
`;

const CommentContent = styled.div`
  margin-top: 2.5rem;
  margin-left: 3rem;
  font-size: 2rem;
  font-weight: 500;
`;

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

export default Comment;

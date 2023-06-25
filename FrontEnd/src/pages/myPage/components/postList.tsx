import React, { useState, useEffect } from 'react';

import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gomaImg from '../../../images/gomao.png';
import axios from 'axios';
import { dateFormatter } from '../../../utils/dateUtil';
import Pagination from './pagination';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

function PostList() {
  interface Post {
    _id: string;
    content: string;
    author: { nickname: string };
    title: string;
    createdAt: string;
    category: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { email, userIcon },
      } = await axios.get(url + '/api/users', config);
      setUserIcon(userIcon);
      const { data: postList } = await axios.get(url + `/api/posts/${email}`);
      const formattedData = postList.map((item: any, index: any) => ({
        ...item,
        createdAt: dateFormatter(item.createdAt, 'YYYY-MM-DD HH:mm:ss'),
        key: index,
      }));
      setPostList(formattedData);
    };
    fetchData();
  }, []);

  const [postList, setPostList] = useState<Post[]>([]);
  const [userIcon, setUserIcon] = useState<string>('');
  //페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentPosts = postList.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [isShowMore, setIsShowMore] = useState<boolean>(false); //더보기 열고(긴글) 닫기(짧은글)
  const textLimit = 170; //글자수 제한 선언

  return (
    <>
      <Wrapper>
        {currentPosts.length === 0 ? (
          <h1>내가 쓴 댓글이 없습니다.</h1>
        ) : (
          currentPosts.map((post) => {
            const shortComment = post.content.slice(0, textLimit); //보여줄 짧은 글
            const isLongComment = post.content.length > textLimit; //긴글인지 확인
            return (
              <>
                <Link to={`/community/${post._id}`}>
                  <CommentInfo key={post._id}>
                    <ProfileBox>
                      <img src={url + '/' + userIcon} alt="프로필" />
                      <h1>{post.author.nickname}</h1>
                      <Date>
                        <h1>{post.createdAt}</h1>
                      </Date>
                    </ProfileBox>
                    <Line />
                    <CommentContent>
                      <h3>{post.title}</h3>
                      {isLongComment && !isShowMore
                        ? shortComment
                        : post.content}
                    </CommentContent>
                    <div
                      onClick={() => setIsShowMore(!isShowMore)}
                      style={{
                        fontSize: '1.7rem',
                        marginLeft: '2.1rem',
                        cursor: 'pointer',
                      }}
                    >
                      {post.content.length > textLimit &&
                        (isShowMore ? '[닫기]' : '...[더보기]')}
                    </div>
                    <Category>
                      {post.category === 'free' ? (
                        <h3>자유게시판</h3>
                      ) : (
                        <h3>인증게시판</h3>
                      )}
                    </Category>
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
          totalPosts={postList.length}
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

const Line = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  width: 95%;
  margin: 2rem auto;
`;

const CommentInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2rem;
  margin-top: 1.5rem;
  box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.3);
  background-color: white;

  img {
    width: 50px;
    height: 50px;
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
  margin-left: 3rem;
  font-size: 2rem;
  font-weight: 500;
`;

const PagenationBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const Category = styled.div`
  margin-left: 2.7rem;
  margin-top: 1rem;
`;
export default PostList;

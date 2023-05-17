import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import moment from "moment";
import axios from "axios";
import styled from "styled-components";

import Pagination from "./Pagination";
import PostData from "./PostData";


interface postType {
  _id: string,
  title: string,
  author: string,
  createdAt: string
}

const NoticeComponent = () => {
  const nav = useNavigate();
  const [posts, setPosts] = useState<postType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  // useEffect(() => {
  //   const fetchPosts = async () => {
  //     let res = await axios('/api/post/noticeList');
  //     setPosts(res.data);
  //   };

  //   fetchPosts();
  // }, []);

  // 일단 local 환경에서 test
  //데이터 가져오기
  useEffect(() => {
    const storedCurrentPage = localStorage.getItem('currentPage');

    // 저장된 데이터가 있을 경우에만 가져와서 설정
    if (storedCurrentPage) {
      setCurrentPage(JSON.parse(storedCurrentPage));
    }

    setPosts(PostData); // 더미 데이터를 설정
  }, []);
  

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <NoticeSection>
        <TopContainer>
          <WriteButton onClick={() => {nav("/community/write")}}>글쓰기</WriteButton>
        </TopContainer>
        <PostContainer>
          {currentPosts.map((post:postType, index:number) => (
            <PostItem key={post._id} onClick={() => nav(`/community/${post._id}`)}>
              <PostItemHeader>
                <PostItemNumber>{posts.length - index}</PostItemNumber>
                <PostItemTitle>
                    {post.title}
                </PostItemTitle>
                <PostItemInfo>
                  <PostDate>{moment(post.createdAt).format('YYYY-MM-DD')}</PostDate>
                  <PostUser>{post.author}</PostUser>
                </PostItemInfo>
              </PostItemHeader>
            </PostItem>
          ))}
        </PostContainer>
        <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} currentPage={currentPage} paginate={paginate}></Pagination>
    </NoticeSection>
  );
};

export default NoticeComponent;

const NoticeSection = styled.div`
  font-family: 'Noto Sans Korean,Malgun Gothic,sans-serif';
  display: flex;
  flex-direction: column;
  box-sizing: border-box; 
`

const TopContainer = styled.div`
  display: flex;
  justify-content: end;
`

const WriteButton = styled.button`
  margin: 0 3rem;
  height: 3rem;
  background-color: var(--background--gray);
  border: none;
  border-radius: 4px;
  cursor: pointer;
`

const PostContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  margin: 1rem; 
`

const PostItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  border-bottom: 1px solid var(--background--gray);
  font-size: 1.4rem;
  cursor: pointer;
`

const PostItemHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 1rem auto;
`

const PostItemTitle = styled.div`
  margin: 0 20rem 0 21rem;
`

const PostItemInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PostItemNumber = styled.p`
  margin: 0 10rem 0 0;
  width: 20rem;
`

const PostDate = styled.p`
  margin: 0 3rem;
`

const PostUser = styled.p`
  margin: 0 6rem 0 1rem;
`

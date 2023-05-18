import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components'

import Pagination from './Pagination';
import CreateComment from './CreateComment';

interface Comment {
  _id: string,
  comment: string,
  author: string,
  createdAt: string,
}

interface CommentProps {
  comments: Comment[];
  postId: string | undefined,
}

const CommentComponent =({ comments, postId }:CommentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);
  const [modal, setModal] = useState(false);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <CommentSection>
      <CommentContainer>
      {currentComments.map(comment => (
        <Comments key={comment._id}>
          <Comment>{comment.comment}</Comment>
          <div style={{display:"flex"}}>
            <Author>{comment.author}</Author>
            <Date>{comment.createdAt}</Date>
          </div>
        </Comments>
      ))}
    </CommentContainer>
    <Footer>
      <BackLink to="/community">뒤로가기</BackLink>
      <Pagination 
      postsPerPage={commentsPerPage}
      totalPosts={comments.length}
      paginate={paginate}
      currentPage={currentPage}
      />
      <div>
      {modal ? (
        <CreateComment postId={postId} closeModal={toggleModal} />
      ) : (
        <CommentButton onClick={toggleModal}>댓글 쓰기</CommentButton>
      )}
    </div>
    </Footer>
    </CommentSection>
  );
};

export default CommentComponent;

const CommentSection = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  font-size: 1.7rem;
`

const CommentContainer = styled.div`
  height: 7rem;
`

const Comments = styled.div`
  display: flex;
  justify-content: space-between;
`

const Comment = styled.p`
  margin: 1rem;
`

const Author = styled.p`
  margin: 1rem 3rem;
`

const Date = styled.p`
  margin: 1rem;
`

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 3rem;
  margin-top: 6rem;
`

const BackLink = styled(Link)`
  font-size: 1.6rem;
  margin-right: 1rem;

  &:hover {
    color: blue;
  }
`

const CommentButton = styled.button`
  margin-bottom: 0.7rem;
  height: 2.5rem; 
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;

  &:hover{
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`
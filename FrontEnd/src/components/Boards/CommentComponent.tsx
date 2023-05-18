import React, {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import moment from 'moment';
import styled from 'styled-components'

import Pagination from './Pagination';

interface Comment {
  _id: string,
  comment: string,
  author: string,
  createdAt: string,
}

interface CommentProps {
  comments: Comment[];
}

const CommentComponent =({ comments }:CommentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const paginate = (pageNumber:number) => {
    setCurrentPage(pageNumber);
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
    <Pagination
    postsPerPage={commentsPerPage}
    totalPosts={comments.length}
    paginate={paginate}
    currentPage={currentPage}
    />
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
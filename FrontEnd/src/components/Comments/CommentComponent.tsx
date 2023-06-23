import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { get } from '../../api/api';
import Pagination from '../../utils/Pagination';
import {
  CommentDataType,
  CommentListType,
  CommentProps,
} from '../../types/CommentType';
import CreateComment from './CreateComment';
import CommentList from './CommentList';

const CommentComponent = ({ postId, category }: CommentProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [commentsPerPage] = useState(3);
  const [postModal, setPostModal] = useState(false);
  const [comments, setComments] = useState<CommentListType>([]);

  useEffect(() => {
    const fetchData = async () => {
      const responseData = await get<any>(`/api/comments/post/${postId}`);
      setComments(responseData);
    };
    fetchData();
  }, []);

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments
    ? comments.slice(indexOfFirstComment, indexOfLastComment)
    : '';

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const togglePostModal = () => {
    setPostModal(!postModal);
  };

  return (
    <CommentSection>
      <CommentContainer>
        {currentComments &&
          currentComments.map((comment: CommentDataType) => (
            <CommentList comment={comment} postId={postId} key={comment._id} />
          ))}
      </CommentContainer>
      <Footer>
        {category === 'free' ? (
          <BackLink to="/community">뒤로가기</BackLink>
        ) : (
          <BackLink to="/community/certified">뒤로가기</BackLink>
        )}
        <Pagination
          postsPerPage={commentsPerPage}
          totalPosts={comments.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        {
          <div>
            {postModal ? (
              <CreateComment postId={postId} closeModal={togglePostModal} />
            ) : (
              <CommentButton onClick={togglePostModal}>댓글 쓰기</CommentButton>
            )}
          </div>
        }
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
`;

const CommentContainer = styled.div`
  height: 7rem;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: center;
  height: 3rem;
  margin-top: 6rem;
`;

const BackLink = styled(Link)`
  font-size: 1.6rem;
  margin-right: 1rem;

  &:hover {
    color: blue;
  }
`;

const CommentButton = styled.button`
  margin-bottom: 0.7rem;
  height: 2.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { CommentListProps } from '../../types/CommentType';
import ModifiedComment from './PatchComment';
import DeleteComment from './DeleteComment';

const url = process.env.REACT_APP_API_URL;
const userToken: string | null = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `Bearer ${userToken}`,
  },
};

const CommentList = ({ comment, postId }: CommentListProps) => {
  const [patchModal, setPatchModal] = useState(false);
  const [userEmail, setUserEmail] = useState<string>('');

  if (userToken) {
    axios.get(url + '/api/users', config).then((res) => {
      setUserEmail(res.data.email);
    });
  }

  const togglePatchModal = () => {
    setPatchModal(!patchModal);
  };

  const handleCommentClick = () => {
    togglePatchModal();
  };

  return (
    <Comments>
      <Comment>{comment.content}</Comment>
      <div style={{ display: 'flex' }}>
        <Author>{comment.author.nickname}</Author>
        <Date>{comment.createdAt}</Date>
        {userEmail === comment.author.email && (
          <ButtonContainer>
            {patchModal ? (
              <ModifiedComment
                postId={postId}
                closeModal={togglePatchModal}
                commentId={comment._id}
              />
            ) : (
              <ModifiedButton onClick={handleCommentClick}>수정</ModifiedButton>
            )}
            <DeleteComment commentId={comment._id} />
          </ButtonContainer>
        )}
      </div>
    </Comments>
  );
};

export default CommentList;

const Comments = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Comment = styled.p`
  margin: 1rem;
`;

const Author = styled.p`
  margin: 1rem 3rem;
`;

const Date = styled.p`
  margin: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;

const ModifiedButton = styled.button`
  margin: 0.7rem 0;
  font-size: 1.7rem;
  height: 2.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { del } from '../../api/api';
import { PostDataProps } from '../../types/communityType';

const DeletePost = ({ postId, boardcategory }: PostDataProps) => {
  const navigate = useNavigate();

  const clickHandler = async () => {
    try {
      await del(`/api/posts/${postId}`);
      alert('게시물이 삭제되었습니다.');
      if (boardcategory === 'freeboard') {
        navigate('/community');
      } else {
        navigate('/community/certified');
      }
    } catch (err) {
      alert('게시물 삭제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      <DeleteButton onClick={clickHandler}>삭제하기</DeleteButton>
    </div>
  );
};

export default DeletePost;

const DeleteButton = styled.button`
  margin: auto 1rem;
  height: 3rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;

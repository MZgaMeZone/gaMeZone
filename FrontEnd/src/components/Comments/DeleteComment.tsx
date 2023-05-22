import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

const DeleteComment = ({commentId, postId}:any) => {
    const navigate = useNavigate();

    const clickHandler = async () => {
        try {
            axios.delete(`${process.env.REACT_APP_API_URL}/api/comments/${commentId}`);
            alert("댓글이 삭제되었습니다.");
            navigate(`/community/${postId}`);
        } catch(err) {
            alert('댓글 삭제 중 오류가 발생했습니다.');
        }
    };

    

    return (
        <div>
            <DeleteButton onClick={clickHandler}>삭제</DeleteButton>
        </div>
    )
};

export default DeleteComment;

const DeleteButton = styled.button`
  margin: 0.7rem 0.3rem 0;
  font-size: 1.7rem;
  height: 2.5rem;
  background: #d9d9d9;
  box-shadow: inset -0.1rem -0.1rem 0.3rem 0rem #000000,
    inset 0.2rem 0.2rem 0.3rem 0rem #ffffffcc;
  cursor: pointer;

  &:active {
    box-shadow: inset 4px 4px 4px rgba(0, 0, 0, 0.6);
  }
`;
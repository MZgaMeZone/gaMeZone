import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from 'axios';

const DeletePost = ({postId}:any) => {
    const navigate = useNavigate();

    const clickHandler = async () => {
        try {
            axios.delete(`http://localhost:8080/api/posts/${postId}`);
            alert("게시물이 삭제되었습니다.");
            navigate('/community');
        } catch(err) {
            alert('게시물 삭제 중 오류가 발생했습니다.');
        }
    };

    

    return (
        <div>
            <button onClick={clickHandler}>삭제하기</button>
        </div>
    )
};

export default DeletePost;
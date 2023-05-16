import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const GameLoading = () => {
    return (
        <Container>
            <Header>
                <p>로딩 중</p>
                <button></button>
            </Header>
            <body>
                <div>
                    <div>
                        <div>
                            <img src="" alt="" />
                            <img src="" alt="" />
                            <img src="" alt="" />
                        </div>
                        <div>
                            <p>Speedlimit</p>
                            <img src="" alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <p>
                        Estimated time left: 39years (Joke) <br />
                        Transfer rate: 4.61 KB/Sec
                    </p>
                    <div>
                        <div></div>
                    </div>
                    <div>
                        <p>게임을 로딩 중입니다.</p>
                        <button></button>
                    </div>
                </div>
            </body>
        </Container>
    );
};

export default GameLoading;

const Container = styled.div`
    box-sizing: border-box;

    width: 35rem;
    height: 20rem;
    margin: 10rem auto auto auto;
    background: #c0c0c0;
    border: 1px solid #000000;
    box-shadow: 3px 3px 4px #1c1c1c;
`;

const Header = styled.div`
    width: 34rem;
    height: 2rem;
    display
    background: #000080;
`;

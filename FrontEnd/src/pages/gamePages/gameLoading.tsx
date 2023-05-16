import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import "../../style/gameLoading.module.css";

const GameLoading = () => {
    return (
        <div className="container">
            <div className="header">
                <p>로딩 중</p>
                <button></button>
            </div>
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
        </div>
    );
};

export default GameLoading;

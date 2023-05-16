import MainFooter from "./main-footer";
import MainPage from "./main-page";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";

const Main = () => {
  return (
    <div
      style={{
        backgroundColor: "#008080",
        height: "97vh",
        width: "100vw",
        minHeight: "480px",
        minWidth: "640px",
      }}
    >
      <MainPage></MainPage>
      <MainFooter></MainFooter>
    </div>
  );
};
export default Main;

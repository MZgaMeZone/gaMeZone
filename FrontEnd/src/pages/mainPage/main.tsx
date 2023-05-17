import MainFooter from "./main-footer";
import MainHeader from "./main-header";
import MainBody from "./main-body";
import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import TimeStopGame from "../../components/Games/StopWatch/timeStop";

const Main = () => {
  const [mainModal, setMainModal] = React.useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: "#008080",
        height: "100vh",
        width: "100vw",
        minHeight: "88rem",
        minWidth: "900px",
      }}
    >
      <MainHeader></MainHeader>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};
export default Main;

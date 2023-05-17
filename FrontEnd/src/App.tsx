import * as React from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TimeStopGame from "./components/Games/StopWatch/timeStop";
import GameStarter from "./components/gameStart";
import Admin from "./pages/adminPage/admin";
import GameLoading from "./pages/gamePages/gameLoading";
import MyPage from "./pages/myPage/mypage";
import Main from "./pages/mainPage/main";
import Rootpage from "./pages/rootPage";
import PasswordChange from "./pages/myPage/password-change";
import NicknameChange from "./pages/myPage/nickname-change";
import MyArticle from "./pages/myPage/myArticle";
import MyComment from "./pages/myPage/myComment";
import AvartarChange from "./pages/myPage/avartar-change";
import Community from "./pages/communityPage/community";
import Login from "./pages/userPages/login";
import Signup from "./pages/userPages/signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Rootpage />} />
        <Route path="/main" element={<Main />} />
        <Route path="/game1" element={<TimeStopGame />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/community" element={<Community />} />
        <Route path="/gameLoading" element={<GameLoading />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/password" element={<PasswordChange />} />
        <Route path="/mypage/nickname" element={<NicknameChange />} />
        <Route path="/mypage/mycomment" element={<MyComment />} />
        <Route path="/mypage/myarticle" element={<MyArticle />} />
        <Route path="/mypage/avartar" element={<AvartarChange />} />
        <Route path="/community/*" element={<Community />} />
        <Route path="/gameLoading" element={<GameLoading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

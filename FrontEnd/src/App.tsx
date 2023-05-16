import * as React from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TimeStopGame from "./components/Games/StopWatch/timeStop";
import GameStarter from "./components/gameStart";
import Admin from "./pages/adminPage/admin";
import Community from "./pages/communityPage/community";
import MyPage from "./pages/myPage/mypage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TimeStopGame />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/community" element={<Community />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

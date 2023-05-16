import * as React from "react";
import logo from "./logo.svg";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TimeStopGame from "./components/Games/StopWatch/timeStop";
import GameStarter from "./components/gameStart";
import Admin from "./pages/adminPage/admin";
import Community from "./pages/communityPage/community";
import GameLoading from "./pages/gamePages/gameLoading";
import MyPage from "./pages/myPage/mypage";
import Main from "./pages/mainPage/main";
import Rootpage from "./pages/rootPage";

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;

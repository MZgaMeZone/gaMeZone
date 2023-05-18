import * as React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TimeStopGame from './components/Games/StopWatch/timeStop';
import GameStarter from './components/gameStart';
import Admin from './pages/adminPage/admin';
import GameLoading from './pages/gamePages/gameLoading';
import GameLayout from './pages/gamePages/gameLayout';
import Main from './pages/mainPage/main';
import Rootpage from './pages/rootPage';
import AdminInfomation from './pages/adminPage/info/adminInformation';
import AdminRecord from './pages/adminPage/record/adminRecord';
import AdminUser from './pages/adminPage/adminUser';
import Community from './pages/communityPage/community';
import Login from './pages/userPages/login';
import Signup from './pages/userPages/signup';
import MyPage from './pages/myPage/mypage';
import PasswordChange from './pages/myPage/password-change';
import NicknameChange from './pages/myPage/nickname-change';
import MyComment from './pages/myPage/myComment';
import MyArticle from './pages/myPage/myArticle';
import AvartarChange from './pages/myPage/avartar-change';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/game1" element={<TimeStopGame />} /> */}
        <Route path="/game/:id" element={<GameLayout />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypage/password" element={<PasswordChange />} />
        <Route path="/mypage/nickname" element={<NicknameChange />} />
        <Route path="/mypage/mycomment" element={<MyComment />} />
        <Route path="/mypage/myarticle" element={<MyArticle />} />
        <Route path="/mypage/avartar" element={<AvartarChange />} />
        <Route path="/admin/information" element={<AdminInfomation />} />
        <Route path="/admin/record" element={<AdminRecord />} />
        <Route path="/admin/user" element={<AdminUser />} />
        <Route path="/community/*" element={<Community />} />
        <Route path="/gameLoading" element={<GameLoading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

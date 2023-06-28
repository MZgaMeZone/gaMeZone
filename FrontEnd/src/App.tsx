import * as React from 'react';
import logo from './logo.svg';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import TimeStopGame from './components/Games/StopWatch/timeStop';
import Admin from './pages/adminPage/admin';
import GameLoading from './pages/gamePages/GameLoading';
import GameLayout from './pages/gamePages/GameLayout';
import GameOver from './pages/gamePages/GameOver';
import Ranking from './pages/rankingPage/Ranking';
import Main from './pages/mainPage/main';
import Rootpage from './pages/rootPage';
import AdminInfomation from './pages/adminPage/info/adminInformation';
import AdminRecord from './pages/adminPage/record/adminRecord';
import AdminUser from './pages/adminPage/user/adminUser';
import Community from './pages/communityPage/Community';
import Login from './pages/userPages/login';
import Signup from './pages/userPages/signup';
import Users from './pages/userPages/users';
import MyPage from './pages/myPage/mypage';
import PasswordChange from './pages/myPage/password-change';
import NicknameChange from './pages/myPage/nickname-change';
import MyComment from './pages/myPage/myComment';
import MyArticle from './pages/myPage/myArticle';
import AvartarChange from './pages/myPage/avartar-change';
import PostWithComment from './pages/myPage/postWithComment';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/password" element={<PasswordChange />} />
          <Route path="/mypage/nickname" element={<NicknameChange />} />
          <Route path="/mypage/mycomment" element={<MyComment />} />
          <Route path="/mypage/myarticle" element={<MyArticle />} />
          <Route path="/mypage/avartar" element={<AvartarChange />} />
          <Route path="/mypage/mycomment-post" element={<PostWithComment />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/information" element={<AdminInfomation />} />
          <Route path="/admin/record" element={<AdminRecord />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/community/*" element={<Community />} />
          <Route path="/game/:id" element={<GameLayout />} />
          {/* <Route path="/game1" element={<TimeStopGame />} /> */}
          <Route path="/game/gameover" element={<GameOver />} />
          <Route path="/gameLoading" element={<GameLoading />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import CommunityPage from './communityPage';
import CreatePost from '../../components/Boards/CreatePost';
import PostPage from '../../components/Boards/PostPage';
import ModifiedPost from './patchPage';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';
import MainHeader from '../mainPage/main-header';

const Community = () => {
  const [mainModal, setMainModal] = React.useState<boolean>(false);
  return (
    <div
      style={{
        backgroundColor: '#008080',
        height: '100vh',
        width: '100vw',
        // minHeight: '880px',
        // minWidth: '900px',
        overflow: 'hidden',
      }}
    >
      <Routes>
        <Route path="/" element={<CommunityPage />} />
        <Route path="/:postId" element={<PostPage />} />
        <Route path="/write" element={<CreatePost />} />
        <Route path="/:postId/modified" element={<ModifiedPost />} />
      </Routes>
      <MainBody mainModal={mainModal} setMainModal={setMainModal}></MainBody>
      <MainFooter
        mainModal={mainModal}
        setMainModal={setMainModal}
      ></MainFooter>
    </div>
  );
};

export default Community;

import React from 'react';
import { Routes, Route } from 'react-router-dom';

import FreeBoard from './freeBoard/FreeBoard';
import CertifyBoard from './certBoard/CertificationBoard';
import CreateFreePost from './freeBoard/CreateFreePost';
import CreateCertPost from './certBoard/CreateCertPost';
import FreePost from './freeBoard/FreePost';
import CertPost from './certBoard/CertPost';
import ModifiedPost from './PatchPage';
import MainBody from '../mainPage/mainBody';
import MainFooter from '../mainPage/mainFooter';
import FreeBoard from './freeBoard';
import CertifyBoard from './certificationBoard';
import CreateFreePost from '../../components/FreeBoards/CreateFreePost';
import CreateCertPost from '../../components/CertBoards/CreateCertPost';
import PostPage from '../../components/FreeBoards/PostPage';
import CertPostPage from '../../components/CertBoards/CertPostPage';
import ModifiedPost from './patchPage';
import MainBody from '../mainPage/main-body';
import MainFooter from '../mainPage/main-footer';

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
        <Route path="/" element={<FreeBoard />} />
        <Route path="/write" element={<CreateFreePost />} />
        <Route path="/certified" element={<CertifyBoard />} />
        <Route path="/certified/write" element={<CreateCertPost />} />
        <Route path="/:postId" element={<PostPage />} />
        <Route path="/certified/:postId" element={<CertPostPage />} />
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

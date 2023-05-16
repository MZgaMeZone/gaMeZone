import React from "react";
import { Routes, Route } from "react-router-dom";

import CommunityPage from "./communityPage";
import CreatePost from "../../components/Boards/CreatePost";
import PostPage from "../../components/Boards/PostPage";

const Community = () => {
  return (
      <Routes>
        <Route path="/" element={<CommunityPage />} />
        <Route path="/:postId" element={<PostPage />} />
        <Route path="/write" element={<CreatePost />} />
      </Routes>
  )
};

export default Community;
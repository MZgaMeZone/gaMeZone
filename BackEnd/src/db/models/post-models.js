import mongoose from "mongoose";
import PostSchema from "../schemas/post-schema.js";
import UserSchema from "../schemas/user-schema.js";

const Post = mongoose.model("Post", PostSchema);
const User = mongoose.model("User", UserSchema);

export class PostModel {
  async createNewPost(data) {
    const user = await User.findOne({email: data.author});
    //새 게시글 등록
    const newPost = new Post ({
      title: data.title,
      content: data.content,
      author: user._id,
      category: data.category,
    });

    await newPost.save();
  };

  async findAllFreePost() {
    // 자유게시판의 모든 게시물 조회
    const findPosts = await Post.find({category: "free"}).populate("author", "nickname email").lean();
    if (findPosts.length < 1) {
      console.log(`등록된 게시물이 없습니다.`);
    }
    return findPosts;
  };

  async findAllCertPost() {
    // 인증게시판의 모든 게시물 조회
    const findPosts = await Post.find({category: "cert"}).populate("author", "nickname email").lean();
    if (findPosts.length < 1) {
      console.log(`등록된 게시물이 없습니다.`);
    }
    return findPosts;
  };

  async findPost(id) {
    //특정 게시물 조회
    const findPost = await Post.findOne({_id: id}).populate("author", "nickname email").lean();
    if (findPost.length !== 1) {
      console.log("등록된 게시물이 없습니다.");
    }
    return findPost;
  }

  async findUserPosts(email) {
    // 특정 유저의 게시물 조회
    const user = await User.findOne({email});
    console.log(userId);
    const findPosts = await Post.find({author: user._id}).populate("author", "-password").lean();
    if (findPosts.length < 1) {
      console.log("등록된 게시물이 없습니다.");
    }
    return findPosts;
  }

  async deletePost(id) {
    // 게시물 삭제
    try {
      const deletePost = await Post.deleteOne({_id: id});
      return deletePost;
    } catch(err) {
      console.log(`[게시물 삭제 실패] 해당 id에 일치하는 게시물이 없습니다.`);
      throw new Error(err);
    }
  };

  async updatePost(id, data) {
    //게시물 수정
    const updatePost = await Post.findOneAndUpdate(
      {_id: id},
      { $set: data },
      { new: true } // 이 옵션은 업데이트 이후에 업데이트된 문서를 반환합니다. 
    );
    return updatePost;
  }
};

const postModel = new PostModel();

export {postModel};
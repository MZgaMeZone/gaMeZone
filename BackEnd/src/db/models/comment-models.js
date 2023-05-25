import mongoose from "mongoose";
import CommentSchema from "../schemas/comment-schema.js";
import UserSchema from "../schemas/user-schema.js";

const Comment = mongoose.model("Comment", CommentSchema);
const User = mongoose.model("User", UserSchema);

export class CommentModel {
  async createNewComment(data) {
    const user = await User.findOne({email: data.author});
    //새 댓글 등록
    console.log(data);
    const newComment = new Comment ({
      author: user._id,
      content: data.content,
      post: data.post,
    });
    console.log(newComment);
    await newComment.save();
  };

  async findComment(id) {
    //특정 댓글 조회
    const findComment = await Comment.find({_id: id});
    if (!findComment) {
      console.log("등록된 댓글이 없습니다.");
    }
    return findComment;
  }

  async findAllComments(id) {
    // 특정 게시물의 댓글 조회
    const findComments = await Comment.find({post: id}).populate("author", "nickname email");
    if (findComments.length < 1) {
      console.log(`등록된 댓글이 없습니다.`);
    }
    return findComments;
  };

  async findUserComments(email) {
    const findUserId = await User.find({email});
    console.log(findUserId[0]._id);

    // 특정 유저의 댓글 조회
    const findComments = await Comment.find({author: findUserId[0]._id}).populate("author", "-password");
    if (findComments.length < 1) {
      console.log("등록된 댓글이 없습니다.");
    }
    return findComments;
  }

  async deleteComment(id) {
    // 댓글 삭제
    try {
      const deleteComment = await Comment.deleteOne({_id: id});
      return deleteComment;
    } catch(err) {
      console.log(`[댓글 삭제 실패] 해당 id에 일치하는 댓글이 없습니다.`);
      throw new Error(err);
    }
  };

  async updateComment(commentId, data) {
    //댓글 수정
    console.log(commentId);
    const updateComment = await Comment.updateOne(
      {_id: commentId},
      { $set: data },
      { new: true } // 이 옵션은 업데이트 이후에 업데이트된 문서를 반환합니다. 
    );
    return updateComment;
  }
};

const commentModel = new CommentModel();

export {commentModel};
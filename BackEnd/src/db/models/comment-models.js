import mongoose from "mongoose";
import CommentSchema from "../schemas/comment-schema.js";

const Comment = mongoose.model("Comment", CommentSchema);

export class CommentModel {
  async createNewComment(data) {
    //새 댓글 등록
    const newComment = await Comment.create(data);
    return newComment;
  };

  async findAllComments(id) {
    // 특정 게시물의 댓글 조회
    const findComments = await Comment.find({post: id});
    if (findComments.length < 1) {
      console.log(`등록된 댓글이 없습니다.`);
    }
    return findComments;
  };

  async findUserComments(id) {
    // 특정 유저의 댓글 조회
    const findComments = await Comment.find({author: id});
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

  async updateComment(id, data) {
    //댓글 수정
    const updateComment = await Comment.findOneAndUpdate(
      {_id: id},
      { $set: data },
      { new: true } // 이 옵션은 업데이트 이후에 업데이트된 문서를 반환합니다. 
    );
    return updateComment;
  }
};

const commentModel = new CommentModel();

export {commentModel};
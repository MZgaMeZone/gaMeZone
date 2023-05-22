import { Router } from "express";
import { commentService } from "../services/comment-service.js";

const commentRouter = Router();

//게시물의 모든 댓글을 가져오는 GET요청
commentRouter.get("/post/:id", async(req, res, next) => {
  try {
    const postId = req.params.id;
    console.log("모든 댓글을 출력합니다.");
    const commentList = await commentService.findAllComments(postId);
    console.log("게시물 출력이 완료되었습니다.");
    res.status(201).json(commentList);
  } catch(err) {
    console.log(`${err}`);
    next(err);
  }
});

//특정 유저의 댓글 가져오는 GET요청
commentRouter.get("/:email", async(req, res, next) => {
  try {
    const userEmail = req.params.email;
    console.log("해당 유저의 댓글을 출력합니다.");
    const commentList = await commentService.findUserComments(userEmail);
    console.log("해당 유저의 댓글 출력이 완료되었습니다.");
    res.status(201).json(commentList);
  } catch(err) {
    console.log(`${err}`);
    next(err);
  }
})

//새 댓글을 생성하는 POST 요청
commentRouter.post("/", async(req, res, next) => {
  try{
    const data = req.body;
    console.log("새 댓글을 등록합니다.");
    const newComment = await commentService.createNewComment(data);
    console.log("댓글 등록이 완료되었습니다.");
    res.status(201).json(newComment);
  } catch(err) {
    console.log(`${err}`);
    next(err);
  }
});

//게시물을 수정하는 PATCH 요청
commentRouter.patch("/:postId", async(req, res, next) => {
  try {
    const data = req.body;
    const commentId = data._id
    console.log("댓글을 수정합니다.");
    const updateComment = await commentService.updateComment(commentId, data);
    console.log("댓글 수정이 완료되었습니다.");
    res.status(201).json(updateComment);
  } catch(err) {
    console.log(`${err}`);
    next(err);
  }
});

//게시물을 삭제하는 DELETE 요청
commentRouter.delete("/:id", async(req, res, next) => {
  try {
    const commentId = req.params.id;
    console.log("댓글을 삭제합니다.");
    await commentService.deleteComment(commentId);
    console.log("댓글 삭제가 완료되었습니다.");
    res.status(201).send("댓글 삭제 완료");
  } catch(err) {
    console.log(`${err}`);
    next(err);
  }
});

export {commentRouter};
import { commentModel } from "../db/index.js";

class CommentService {
  constructor() {
    this.commentModel = commentModel;
  }

  //GET post's comments
  async findAllComments(id) {
    return await commentModel.findAllComments(id);
  }

  //GET user's posts
  async findUserComments(email) {
    return await commentModel.findUserComments(email);
  }

  //GET comment
  async findComment(id) {
    return await commentModel.findComment(id);
  }

  //POST
  async createNewComment(data) {
    return await commentModel.createNewComment(data);
  }

  //DELETE
  async deleteComment(id) {
    return await commentModel.deleteComment(id);
  }

  //UPDATE
  async updateComment(id, data) {
    return await commentModel.updateComment(id, data);
  }
}

const commentService = new CommentService(commentModel);

export { commentService };

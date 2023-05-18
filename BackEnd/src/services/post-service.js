import { postModel } from "../db/index.js";

class PostService {
  constructor() {
    this.postModel = postModel;
  }

  //GET
  async findAllPosts() {
    return await postModel.findAllPost();
  };

  //POST
  async createNewPost(data) {
    return await postModel.createNewPost(data);
  };

  //DELETE
  async deletePost(id) {
    return await postModel.deletePost(id);
  }

  //UPDATE
  async updatePost(id, data) {
    return await postModel.updatePost(id, data);
  }
}

const postService = new PostService(postModel);

export {postService};
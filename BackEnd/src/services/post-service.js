import { postModel } from "../db/index.js";

class PostService {
  constructor() {
    this.postModel = postModel;
  }

  //GET all posts
  async findAllPosts() {
    return await postModel.findAllPost();
  };

  //GET one post
  async findPost(id) {
    return await postModel.findPost(id);
  }

  //GET user's posts
  async findUserPosts(id) {
    return await postModel.findUserPosts(id);
  }

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
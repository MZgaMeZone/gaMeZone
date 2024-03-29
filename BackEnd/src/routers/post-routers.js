import { Router } from 'express';
import { postService } from '../services/post-service.js';
import { imageUploadHelper } from '../middlewares/multer.js';

const postRouter = Router();

//자유게시판의 모든 게시물 가져오는 GET요청
postRouter.get('/', async (req, res, next) => {
  try {
    // console.log("모든 게시물을 출력합니다.");
    const postList = await postService.findAllFreePosts();
    // console.log("게시물 출력이 완료되었습니다.");
    res.status(201).json(postList);
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

//인증게시판의 모든 게시물 가져오는 GET요청
postRouter.get('/cert', async (req, res, next) => {
  try {
    // console.log("모든 게시물을 출력합니다.");
    const postList = await postService.findAllCertPosts();
    // console.log("게시물 출력이 완료되었습니다.");
    res.status(201).json(postList);
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

//특정 게시물을 가져오는 GET요청
postRouter.get('/post/:postId', async (req, res, next) => {
  try {
    const id = req.params.postId;
    // console.log("게시물을 출력합니다.");
    const post = await postService.findPost(id);
    // console.log("해당 게시물의 출력이 완료되었습니다.");
    res.status(201).json(post);
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

//특정 유저의 게시물 가져오는 GET요청
postRouter.get('/:email', async (req, res, next) => {
  try {
    const email = req.params.email;
    // console.log("해당 유저의 게시물을 출력합니다.");
    const postList = await postService.findUserPosts(email);
    // console.log("해당 유저의 게시물 출력이 완료되었습니다.");
    res.status(201).json(postList);
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

//새 게시물을 생성하는 POST 요청
postRouter.post(
  '/',
  imageUploadHelper.single('img'),
  async (req, res, next) => {
    try {
      const data = req.body;
      if (req.file) {
        data.img = req.file.path.replace(/\\/g, '/');
      }
      // console.log("새 게시물을 등록합니다.");
      const newPost = await postService.createNewPost(data);
      // console.log("게시물 등록이 완료되었습니다.");
      res.status(201).json(newPost);
    } catch (err) {
      console.log(`${err}`);
      next(err);
    }
  }
);

//게시물을 수정하는 PATCH 요청
postRouter.patch('/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;
    const data = req.body;
    // console.log("게시물을 수정합니다.");
    const updatePost = await postService.updatePost(postId, data);
    // console.log("게시물 수정이 완료되었습니다.");
    res.status(201).json(updatePost);
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

//게시물을 삭제하는 DELETE 요청
postRouter.delete('/:id', async (req, res, next) => {
  try {
    const postId = req.params.id;
    console.log('게시물을 삭제합니다.');
    await postService.deletePost(postId);
    console.log('게시물 삭제가 완료되었습니다.');
    res.status(201).send('게시물 삭제 완료');
  } catch (err) {
    console.log(`${err}`);
    next(err);
  }
});

export { postRouter };

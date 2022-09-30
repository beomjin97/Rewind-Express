import { Router } from 'express';
import {
  getPosts,
  getPostByPostId,
  createPost,
  commentPost,
  likePost,
  getPostsByuserId,
  deletePost,
  updatePost,
  getPostTags,
} from '@src/controller/post';

import auth from '@src/middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/tags', getPostTags);
router.get('/:postId', getPostByPostId);
// router.get('/:userId', auth, getPostsByuserId);

router.post('/', auth, createPost);
router.post('/:postId/comment', auth, commentPost);
router.post('/:postId/like', auth, likePost);

router.patch('/:postId', updatePost);

router.delete('/:postId', deletePost);

export default router;

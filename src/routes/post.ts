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
} from '../controller/post';

import auth from '../middleware/auth';

const router = Router();

router.get('/', getPosts);
router.get('/tags', getPostTags);
router.get('/:postId', getPostByPostId);

router.post('/', auth, createPost);
router.post('/:postId/comment', auth, commentPost);
router.post('/:postId/like', auth, likePost);

router.patch('/:postId', auth, updatePost);

router.delete('/:postId', auth, deletePost);

export default router;

import { Request, Response } from 'express';

import Post from '../schema/post';
import Comment from '../schema/comment';
import User from '../schema/user';
import Tag from '../schema/tag';
import { Schema } from 'mongoose';

export const getPosts = async (req: Request, res: Response) => {
  const { tag, page } = req.query;
  try {
    // const posts = await Post.find().skip(Number(page) - 1).limit(10)
    if (tag) {
      const posts = await Post.find({ tags: { $in: [tag] } })
        .populate({ path: 'comment', populate: { path: 'author', select: ['userName', '_id'] } })
        .populate({ path: 'author', select: ['userName', '_id'] });
      res.status(200).json(posts);
    } else {
      const posts = await Post.find()
        .skip((Number(page) - 1) * 5)
        .limit(5)
        .sort({ _id: -1 })
        .populate({ path: 'comment', populate: { path: 'author', select: ['userName', '_id'] } })
        .populate({ path: 'author', select: ['userName', '_id'] });
      res.status(200).json(posts);
    }
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params;
  try {
    const post = await Post.findById(postId)
      .populate({ path: 'comment', populate: { path: 'author', select: ['userName', '_id'] } })
      .populate({ path: 'author', select: ['userName', '_id'] });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const getPostsByuserId = () => {};

export const getPostTags = async (req: Request, res: Response) => {
  const tags = await Tag.find().limit(10).sort({ count: -1 });
  const tagName = tags.map((tag) => tag.name);
  res.json(tagName);
};

export const createPost = async (req: Request, res: Response) => {
  const { content, tags } = req.body;
  //@ts-ignore
  const author = req.userId as Schema.Types.ObjectId;
  const files = req.files as Express.Multer.File[];
  try {
    const newPost = await Post.create({
      author,
      content,
      imgUrl: files === undefined ? [] : files.map((file) => file.filename),
      tags: JSON.parse(tags),
    });

    JSON.parse(tags).forEach(async (tag: string) => {
      const prevTag = await Tag.findOne({ name: tag });
      if (prevTag) {
        await Tag.findOneAndUpdate(
          { name: tag },
          {
            $inc: {
              count: 1,
            },
          }
        );
      } else {
        await Tag.create({ name: tag });
      }
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};

export const updatePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  const { content, tags } = req.body;
  const files = req.files as Express.Multer.File[];
  try {
    const post = await Post.findByIdAndUpdate(postId, {
      $set: { content, imgUrl: files === undefined ? [] : files.map((file) => file.filename), tags: JSON.parse(tags) },
    });
    post?.tags.forEach(async (tag) => {
      await Tag.findOneAndUpdate(
        { name: tag },
        {
          $inc: { count: -1 },
        }
      );
    });
    JSON.parse(tags).forEach(async (tag: string) => {
      const prevTag = await Tag.findOne({ name: tag });
      if (prevTag) {
        await Tag.findOneAndUpdate(
          { name: tag },
          {
            $inc: {
              count: 1,
            },
          }
        );
      } else {
        await Tag.create({ name: tag });
      }
    });
    res.json({ message: 'Post updated successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const postId = req.params.postId;
  try {
    const post = await Post.findByIdAndDelete(postId);
    post?.comment.forEach(async (id) => {
      await Comment.findByIdAndRemove(id);
    });
    post?.tags.forEach(async (tag) => {
      await Tag.findOneAndUpdate(
        { name: tag },
        {
          $inc: { count: -1 },
        }
      );
    });

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const postId: any = req.params.postId;
  try {
    const post = await Post.findById(postId);
    const user = await User.findById(userId);
    if (user && post && !post.like.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $set: { like: [...post.like, userId] } });
      await User.findByIdAndUpdate(userId, { $set: { likes: [...user.likes, postId] } });
      res.status(201).json({ message: 'like' });
    } else if (user && post && post.like.includes(userId)) {
      await Post.findByIdAndUpdate(postId, { $set: { like: post.like.filter((user) => user !== userId) } });
      await User.findByIdAndUpdate(userId, { $set: { likes: user.likes.filter((post) => post != postId) } });
      res.status(201).json({ message: 'like cancel' });
    }
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};

export const commentPost = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const { postId } = req.params;
  const { comment } = req.body;
  try {
    console.log('comment', req.body);
    const newComment = await Comment.create({
      author: userId,
      post: postId,
      content: comment,
    });
    console.log(newComment);
    const post = await Post.findById(postId);
    if (post) {
      await Post.findByIdAndUpdate(postId, { $set: { comment: [...post.comment, newComment._id] } });
    }
    res.status(201).json(newComment);
  } catch (error) {
    res.status(409).json(error);
    console.log(error);
  }
};

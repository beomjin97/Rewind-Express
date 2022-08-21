import { Schema } from 'mongoose';

export interface post {
  author: Schema.Types.ObjectId;
  content: string;
  imgUrl: string[];
  tags: string[];
  like: Schema.Types.ObjectId[];
  comment: string[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface comment {
  author: Schema.Types.ObjectId;
  post: Schema.Types.ObjectId;
  content: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface user {
  name: string;
  userName: string;
  email: string;
  password: string;
  following: Schema.Types.ObjectId[];
  followedBy: Schema.Types.ObjectId[];
  likes: Schema.Types.ObjectId[];
}

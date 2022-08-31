import { model, Schema } from 'mongoose';
import { post } from '../../type';

const postSchema = new Schema<post>({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  imgUrl: String,
  like: {
    type: [String],
    default: [],
  },
  tags: {
    type: [String],
    default: [],
  },
  comment: {
    type: [Schema.Types.ObjectId],
    ref: 'Comment',
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Post = model('Post', postSchema);
export default Post;

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
  },
  imgUrl: [String],
  like: {
    type: [String],
    required: true,
  },
  tags: [String],
  comment: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: Date,
});

const Post = model('Post', postSchema);
export default Post;

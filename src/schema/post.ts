import { model, Schema } from 'mongoose';
import { post } from '../../type';

const postSchema = new Schema<post>(
  {
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    imgUrl: {
      type: [String],
      default: [],
    },
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
  },
  {
    timestamps: true,
  }
);

const Post = model('Post', postSchema);
export default Post;

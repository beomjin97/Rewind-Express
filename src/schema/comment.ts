import { model, Schema } from 'mongoose';
import { comment } from 'type';

const commentSchema = new Schema<comment>(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Comment = model('Comment', commentSchema);
export default Comment;

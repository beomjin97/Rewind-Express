import { model, Schema, Types } from 'mongoose';
import { user } from '../../type';

const userSchema = new Schema<user>({
  name: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  following: {
    type: [Types.ObjectId],
    default: [],
    ref: 'User',
  },
  followedBy: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'User',
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
    ref: 'Post',
  },
});

const User = model('User', userSchema);
export default User;

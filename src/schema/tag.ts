import { model, Schema } from 'mongoose';
import { tag } from '../../type';

const tagSchema = new Schema<tag>({
  name: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

const Tag = model('Tag', tagSchema);
export default Tag;

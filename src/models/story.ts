import {Document, Model, model, Schema, Types} from 'mongoose';

export interface StoryInterface extends Document {
  name: string;
  user: Types.ObjectId;
}

const StorySchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
});

StorySchema.index({user: 1, name: 1});

export const StoryModel: Model<StoryInterface> =
    model<StoryInterface>('Story', StorySchema);

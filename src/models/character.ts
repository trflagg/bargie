import {Document, Model, model, Schema, Types} from 'mongoose';

export interface CharacterInterface extends Document {
  name: string;
  gender: string;
  description?: string;
  user: Types.ObjectId;
  story: Types.ObjectId;
}

const CharacterSchema: Schema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 255,
    required: true,
  },
  gender: {
    type: String,
  },
  description: {
    type: String,
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  story: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Story',
  },
});

export const CharacterModel: Model<CharacterInterface> =
    model<CharacterInterface>('Character', CharacterSchema);

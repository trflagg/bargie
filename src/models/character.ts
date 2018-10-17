import {Document, Model, model, Schema, Types} from 'mongoose';

export interface CharacterPrimitives {
  name: string;
  gender?: string;
  description?: string;
}

export interface CharacterInterface extends CharacterPrimitives, Document {
  user: Types.ObjectId;
  story: Types.ObjectId;
  location: Types.ObjectId;
}

const CharacterSchema: Schema = new Schema(
    {
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
      location: {
        type: Schema.Types.ObjectId,
        ref: 'Location',
      },
    },
    {timestamps: true});

export const CharacterModel: Model<CharacterInterface> =
    model<CharacterInterface>('Character', CharacterSchema);

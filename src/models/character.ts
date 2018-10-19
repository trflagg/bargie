import { Document, Model, model, Schema, Types } from "mongoose";

import {
  MessageHolderInterface,
  MessageHolderSchema,
  MessageRecordInterface,
  MessageRecordSchema
} from "./messageHolder";

export interface CharacterProps {
  name: string;
  owner: Types.ObjectId;
  story: Types.ObjectId;
  gender?: string;
  description?: string;
  location?: Types.ObjectId;
}

export interface CharacterInterface
  extends CharacterProps,
    MessageHolderInterface,
    Document {}

const CharacterSchema: Schema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    gender: {
      type: String
    },
    description: {
      type: String
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true
    },
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story"
    },
    location: {
      type: Schema.Types.ObjectId,
      ref: "Location"
    },
    messages: {
      type: [MessageRecordSchema],
      default: []
    },
    children: {
      type: [MessageHolderSchema],
      default: []
    }
  },
  { timestamps: true }
);

export const CharacterModel: Model<CharacterInterface> = model<
  CharacterInterface
>("Character", CharacterSchema);

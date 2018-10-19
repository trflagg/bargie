import { Document, Model, model, Schema, Types } from "mongoose";

export interface StoryProps {
  owner: Types.ObjectId;
  name: string;
  description?: string;
}

export interface StoryInterface extends StoryProps, Document {}

const StorySchema: Schema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    owner: {
      type: Schema.Types.ObjectId,
      required: true
    },
    description: {
      type: String
    }
  },
  { timestamps: true }
);

StorySchema.index({ owner: 1, name: 1 });

export const StoryModel: Model<StoryInterface> = model<StoryInterface>(
  "Story",
  StorySchema
);

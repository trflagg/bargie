import { Document, Model, model, Schema, Types } from "mongoose";

export interface LocationInterface extends Document {
  name: string;
  title: string;
  description?: string;
  story: Types.ObjectId;
}

const LocationSchema: Schema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    title: {
      type: String,
      minlength: 3,
      maxlength: 255,
      required: true
    },
    description: {
      type: String
    },
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story"
    }
  },
  { timestamps: true }
);

export const LocationModel: Model<LocationInterface> = model<LocationInterface>(
  "Location",
  LocationSchema
);

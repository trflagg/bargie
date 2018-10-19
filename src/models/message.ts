import * as _ from "lodash";
import { Document, Model, model, Schema, Types } from "mongoose";

export interface MessageInterface extends Document {
  name: string;
  text: string;
  story: Types.ObjectId;
  compiledSource: string;
  messagesLoaded: Types.ObjectId[];
}

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 3,
      maxlength: 255,
      uppercase: true,
      required: true
    },
    text: String,
    story: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Story"
    },
    compiledSource: String,
    messagesLoaded: [Schema.Types.ObjectId]
  },
  { timestamps: true }
);

MessageSchema.index({ story: 1, name: 1 }, { unique: true });

export const MessageModel: Model<MessageInterface> = model<MessageInterface>(
  "Message",
  MessageSchema
);

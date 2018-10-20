import * as mongoose from "mongoose";

import {
  MessageProps,
  MessageInterface,
  MessageModel
} from "../models/message";

export function createMessage(props: MessageProps): MessageInterface {
  return new MessageModel(props);
}

export async function updateMessage(
  _id,
  props: MessageProps
): Promise<MessageInterface> {
  const message = (await MessageModel.findOneAndUpdate(
    {
      _id
    },
    props,
    { upsert: true, new: true }
  ).exec()) as MessageInterface;
  return message;
}

export async function messages(
  story: mongoose.Types.ObjectId
): Promise<MessageInterface[]> {
  return await MessageModel.find({ story }).exec();
}

import {Schema} from 'mongoose';

export interface MessageRecordInterface {
  messageName: string;
  commandText: string;
}

export interface MessageHolderInterface {
  name: string;
  messages?: MessageRecordInterface[];
  children?: MessageHolderInterface[];
}

export const MessageRecordSchema = new Schema({
  messageName: String,
  commandText: String,
});
export const MessageHolderSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messages: [MessageRecordSchema],
});
MessageHolderSchema.add({children: [MessageHolderSchema]});

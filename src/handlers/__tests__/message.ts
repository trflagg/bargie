import * as mongoose from "mongoose";

import {
  connectToTestDB,
  disconnectToTestDB
} from "../../../test/mongoose-utils.js";
import * as messageHandler from "../message";
import { MessageModel, MessageInterface } from "../../models/message";

function buildMessage(): MessageInterface {
  const story = new mongoose.Types.ObjectId();
  const owner = new mongoose.Types.ObjectId();
  return messageHandler.createMessage({
    story,
    name: "TEST_MESSAGE",
    text: "This is a test message."
  });
}

describe("MessageHandler", () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it("creates a message", (): void => {
    const story = new mongoose.Types.ObjectId();
    const newMessage = messageHandler.createMessage({
      story,
      name: "TEST_MESSAGE",
      text: "This is a test message."
    });
    expect(newMessage.story).toEqual(story);
    expect(newMessage.name).toEqual("TEST_MESSAGE");
    expect(newMessage.text).toEqual("This is a test message.");
  });

  it("gets all message for a story", async (): Promise<void> => {
    // save 2 message
    const story = new mongoose.Types.ObjectId();
    const newMessage1 = messageHandler.createMessage({
      story,
      name: "TEST_MESSAGE",
      text: "This is a test message."
    });
    await newMessage1.save();
    const newMessage2 = messageHandler.createMessage({
      story,
      name: "TEST_MESSAGE2",
      text: "This is a test message."
    });
    await newMessage2.save();

    // look for them by story
    const message = await messageHandler.messages(story);
    expect(message.length).toEqual(2);
    expect(message[0].name).toEqual("TEST_MESSAGE");
    expect(message[1].name).toEqual("TEST_MESSAGE2");
  });

  describe("updateMessage", () => {
    it("saves a new message", async (): Promise<void> => {
      let message = buildMessage();
      const messageId = message._id;

      // make sure it doesn't exist already
      const notFoundMessage: MessageInterface | null = await MessageModel.findOne(
        {
          _id: messageId
        }
      );
      expect(notFoundMessage).toBe(null);

      // save
      message = await messageHandler.updateMessage(messageId, message);

      // look for it again
      const foundMessage = await MessageModel.findOne({
        _id: messageId
      });
      if (!foundMessage) {
        throw new Error();
      }
      expect(foundMessage.name).toEqual("TEST_MESSAGE");
      expect(foundMessage.text).toEqual("This is a test message.");
      expect(foundMessage._id).toEqual(messageId);
    });

    it("updates an existing message", async (): Promise<void> => {
      const message = buildMessage();
      await message.save();

      // check that it is there
      let foundMessage = (await MessageModel.findOne({
        _id: message._id
      }).exec()) as MessageInterface;
      expect(foundMessage).not.toBe(null);
      expect(foundMessage.name).toEqual("TEST_MESSAGE");
      expect(foundMessage.text).toEqual("This is a test message.");

      // update it
      message.text = "A new message";
      message.name = "NEW_MESSAGE_NAME";
      await messageHandler.updateMessage(message._id, message);

      // look for it and make sure it is updated
      foundMessage = (await MessageModel.findOne({
        _id: message._id
      }).exec()) as MessageInterface;
      expect(foundMessage.name).toEqual("NEW_MESSAGE_NAME");
      expect(foundMessage.text).toEqual("A new message");
    });
  });
});

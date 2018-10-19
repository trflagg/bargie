import * as _ from "lodash";
import { MessageModel } from "../message";
import { StoryModel } from "../story";

describe("MessageModel", () => {
  it("can make a new instance", async () => {
    const story = new StoryModel();
    const message = new MessageModel();
    message.name = "TESTMESSAGE";
    message.text = "This is the text of our message";
    message.story = story._id;
    message.compiledSource = _.template(message.text).source;
    message.messagesLoaded = [];
    await message.validate();
  });
});

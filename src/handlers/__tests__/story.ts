import * as mongoose from "mongoose";

import {
  connectToTestDB,
  disconnectToTestDB
} from "../../../test/mongoose-utils.js";
import * as storyHandler from "../story";

describe("StoryHandler", () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it("can create a new story", () => {
    const owner = new mongoose.Types.ObjectId();
    const story = storyHandler.createStory({
      owner,
      name: "Test Story"
    });
    expect(story).not.toBe(null);
    expect(story.name).toEqual("Test Story");
    expect(story.owner).toEqual(owner);
  });
});

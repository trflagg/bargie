import * as mongoose from "mongoose";

import {
  connectToTestDB,
  disconnectToTestDB
} from "../../../test/mongoose-utils.js";
import { StoryModel, StoryInterface } from "../../models/story";
import * as storyHandler from "../story";

function buildStory(): StoryInterface {
  const owner = new mongoose.Types.ObjectId();
  return storyHandler.createStory({
    owner,
    name: "Test Story"
  });
}

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

  describe("updateStory", () => {
    it("saves a story", async (): Promise<void> => {
      let story = buildStory();
      const storyId = story._id;

      // make sure it doesn't exist already
      const notFoundStory: StoryInterface | null = await StoryModel.findOne({
        _id: storyId
      });
      expect(notFoundStory).toBe(null);

      // save
      story = await storyHandler.updateStory(storyId, {
        owner: story.owner,
        name: "A new name",
        description: "A test story"
      });
      expect(story.name).toEqual("A new name");
      expect(story.description).toEqual("A test story");
      expect(story._id).toEqual(storyId);

      // look for it again
      const foundStory = await StoryModel.findOne({
        _id: storyId
      });
      if (!foundStory) {
        throw new Error();
      }
      expect(foundStory.name).toEqual("A new name");
      expect(foundStory.description).toEqual("A test story");
      expect(foundStory._id).toEqual(storyId);
    });

    it("throws an error if story is not owned by owner", async (): Promise<
      void
    > => {
      const story = buildStory();
      const otherOwner = new mongoose.Types.ObjectId();

      // save it
      await story.save();

      // change the owner
      story.owner = otherOwner;

      // try and update it
      await expect(storyHandler.updateStory(story._id, story)).rejects.toThrow(
        "Story not found."
      );
    });

    it("updates an existing story", async (): Promise<void> => {
      const story = buildStory();
      await story.save();

      // check that it is there
      let foundStory = (await StoryModel.findOne({
        _id: story._id
      }).exec()) as StoryInterface;
      expect(foundStory).not.toBe(null);
      expect(foundStory.description).toEqual(undefined);

      // update it
      story.description = "A test description";
      await storyHandler.updateStory(story._id, story);

      // look for it and make sure it is updated
      foundStory = (await StoryModel.findOne({
        _id: story._id
      }).exec()) as StoryInterface;
      expect(foundStory.description).toEqual("A test description");
    });
  });
});

import * as mongoose from "mongoose";

import { StoryModel } from "../story";

describe("StoryModel", () => {
  it("can make a new instance", () => {
    const owner = new mongoose.Types.ObjectId();
    const story = new StoryModel();
    story.name = "teststory";
    story.owner = owner;
    return story.validate();
  });
});

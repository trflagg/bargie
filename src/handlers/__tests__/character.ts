import * as mongoose from "mongoose";

import {
  connectToTestDB,
  disconnectToTestDB
} from "../../../test/mongoose-utils.js";
import { StoryModel } from "../../models/story";
import * as characterHandler from "../character";

describe("CharacterHandler", () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it("can create a new character", () => {
    const story = new StoryModel();
    const owner = new mongoose.Types.ObjectId();

    const character = characterHandler.createCharacter({
      owner,
      name: "Test character",
      description: "She is tall",
      gender: "Female",
      story: story._id
    });

    expect(character).not.toBe(null);
    expect(character.name).toEqual("Test character");
    expect(character.description).toEqual("She is tall");
    expect(character.gender).toEqual("Female");
    expect(character.owner).toEqual(owner);
    expect(character.story).toEqual(story._id);
  });
});

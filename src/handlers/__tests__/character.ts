import * as mongoose from "mongoose";

import {
  connectToTestDB,
  disconnectToTestDB
} from "../../../test/mongoose-utils.js";
import { StoryModel } from "../../models/story";
import { CharacterModel, CharacterInterface } from "../../models/character";
import * as characterHandler from "../character";

function buildCharacter(): CharacterInterface {
  const story = new mongoose.Types.ObjectId();
  const owner = new mongoose.Types.ObjectId();
  return characterHandler.createCharacter({
    owner,
    story,
    name: "Test character"
  });
}

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
    expect(character._id).not.toBe(null);
    expect(character.name).toEqual("Test character");
    expect(character.description).toEqual("She is tall");
    expect(character.gender).toEqual("Female");
    expect(character.owner).toEqual(owner);
    expect(character.story).toEqual(story._id);
  });

  describe("updateCharacter", () => {
    it("saves a new character", async (): Promise<void> => {
      let character = buildCharacter();
      const characterId = character._id;

      // make sure it doesn't exist already
      const notFoundCharacter: CharacterInterface | null = await CharacterModel.findOne(
        {
          _id: characterId
        }
      );
      expect(notFoundCharacter).toBe(null);

      // save
      character = await characterHandler.updateCharacter(characterId, {
        owner: character.owner,
        story: character.story,
        name: "A new name",
        description: "A test character"
      });
      expect(character.name).toEqual("A new name");
      expect(character.description).toEqual("A test character");
      expect(character._id).toEqual(characterId);

      // look for it again
      const foundCharacter = await CharacterModel.findOne({
        _id: characterId
      });
      if (!foundCharacter) {
        throw new Error();
      }
      expect(foundCharacter.name).toEqual("A new name");
      expect(foundCharacter.description).toEqual("A test character");
      expect(foundCharacter._id).toEqual(characterId);
    });

    it("throws an error if character is not owned by owner", async (): Promise<
      void
    > => {
      const character = buildCharacter();
      const otherOwner = new mongoose.Types.ObjectId();

      // save it
      await character.save();

      // change the owner
      character.owner = otherOwner;

      // try and update it
      await expect(
        characterHandler.updateCharacter(character._id, character)
      ).rejects.toThrow("Character not found.");
    });

    it("updates an existing character", async (): Promise<void> => {
      const character = buildCharacter();
      await character.save();

      // check that it is there
      let foundCharacter = (await CharacterModel.findOne({
        _id: character._id
      }).exec()) as CharacterInterface;
      expect(foundCharacter).not.toBe(null);
      expect(foundCharacter.description).toEqual(undefined);

      // update it
      character.description = "A test description";
      await characterHandler.updateCharacter(character._id, character);

      // look for it and make sure it is updated
      foundCharacter = (await CharacterModel.findOne({
        _id: character._id
      }).exec()) as CharacterInterface;
      expect(foundCharacter.description).toEqual("A test description");
    });
  });

  describe("getCharacter", () => {
    it("returns character for _id and owner", async () => {
      const character = buildCharacter();
      character.name = "GetCharacter Test Character";
      await character.save();
      const owner = character.owner;
      const _id = character._id;

      const foundCharacter = (await characterHandler.getCharacter(
        _id,
        owner
      )) as CharacterInterface;
      expect(foundCharacter.name).toEqual("GetCharacter Test Character");
    });

    it("returns null if character with _id does not exist", async () => {
      const character = buildCharacter();
      character.name = "GetCharacter Test Character";
      await character.save();
      const owner = character.owner;
      const differentId = new mongoose.Types.ObjectId();
      expect((await characterHandler.getCharacter(
        differentId,
        owner
      )) as null).toEqual(null);
    });

    it("returns null if character with owner does not exist", async () => {
      const character = buildCharacter();
      character.name = "GetCharacter Test Character";
      await character.save();
      const differentOwner = new mongoose.Types.ObjectId();
      const _id = character._id;
      expect((await characterHandler.getCharacter(
        _id,
        differentOwner
      )) as null).toEqual(null);
    });
  });

  describe("characters", () => {
    it("gets all characters for an owner", async () => {
      const owner = new mongoose.Types.ObjectId();
      const character1 = buildCharacter();
      character1.owner = owner;
      await character1.save();
      const character2 = buildCharacter();
      character2.owner = owner;
      character2.name = "Test Character2";
      await character2.save();

      const characters = await characterHandler.characters(owner);
      expect(characters.length).toEqual(2);
    });

    it("returns empty array if no characters for owner", async () => {
      const character = buildCharacter();
      await character.save();
      const differentOwner = new mongoose.Types.ObjectId();

      const characters = await characterHandler.characters(differentOwner);
      expect(characters.length).toEqual(0);
    });
  });
});

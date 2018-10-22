import * as mongoose from "mongoose";

import {
  CharacterProps,
  CharacterInterface,
  CharacterModel
} from "../models/character";
import { StoryInterface } from "../models/story";

export async function characters(
  owner: mongoose.Types.ObjectId
): Promise<CharacterInterface[]> {
  return await CharacterModel.find({ owner });
}

export async function getCharacter(
  _id: mongoose.Types.ObjectId,
  owner: mongoose.Types.ObjectId
): Promise<CharacterInterface | null> {
  return await CharacterModel.findOne({ _id, owner }).exec();
}

export function createCharacter(props: CharacterProps): CharacterInterface {
  return new CharacterModel(props);
}

export async function updateCharacter(
  _id: mongoose.Types.ObjectId,
  props: CharacterProps
): Promise<CharacterInterface> {
  try {
    const character = await CharacterModel.findOneAndUpdate(
      {
        _id,
        owner: props.owner
      },
      props,
      { upsert: true, new: true }
    ).exec();

    // if block should never run.
    // Should throw error instead of returning null
    /* istanbul ignore if */
    if (!character) {
      throw new Error("Character not found.");
    }
    return character;
  } catch (e) {
    console.log(`Caught error in updateCharacter src/handlers/character: ${e}`);
    throw new Error("Character not found.");
  }
}

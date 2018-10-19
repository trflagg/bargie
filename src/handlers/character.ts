import * as mongoose from 'mongoose';

import {CharacterInterface, CharacterModel, CharacterPrimitives} from '../models/character';
import {StoryInterface} from '../models/story';

export async function createCharacter(props: {
  name: string,
  description?: string,
  gender?: string,
        story: mongoose.Types.ObjectId,
        owner: mongoose.Types.ObjectId,
}): Promise<CharacterInterface> {
  const character = new CharacterModel(props);
  await character.save();
  return character;
}

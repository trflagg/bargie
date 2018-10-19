import * as mongoose from 'mongoose';

import {CharacterInterface, CharacterModel} from '../models/character';
import {StoryInterface} from '../models/story';

export function createCharacter(props: {
  name: string,
  story: mongoose.Types.ObjectId,
  owner: mongoose.Types.ObjectId,
  description?: string,
  gender?: string,
}): CharacterInterface {
  return new CharacterModel(props);
}

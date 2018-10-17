import {CharacterInterface, CharacterModel, CharacterPrimitives} from '../models/character';
import {StoryInterface} from '../models/story';
import {UserInterface} from '../models/user';

export async function createCharacter(
    props: CharacterPrimitives, user: UserInterface,
    story: StoryInterface): Promise<CharacterInterface> {
  const character = new CharacterModel(props);
  character.user = user._id;
  character.story = story._id;

  await character.save();

  return character;
}

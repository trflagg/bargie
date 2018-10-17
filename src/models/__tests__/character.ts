import {CharacterModel} from '../character';
import {LocationModel} from '../location';
import {StoryModel} from '../story';
import {UserModel} from '../user';

describe('CharacterModel', () => {
  it('can make a new instance', () => {
    const character = new CharacterModel();
    const user = new UserModel();
    const story = new StoryModel();
    const location = new LocationModel();
    character.name = 'testcharacter';
    character.description = 'This is a test character';
    character.user = user._id;
    character.story = story._id;
    character.location = location._id;
    return character.validate();
  });
});

import {CharacterModel} from '../character';
import {StoryModel} from '../story';
import {UserModel} from '../user';

describe('CharacterModel', () => {
  it('can make a new instance', () => {
    const character = new CharacterModel();
    const user = new UserModel();
    const story = new StoryModel();
    character.name = 'testcharacter';
    character.description = 'This is a test character';
    character.user = user._id;
    character.story = story._id;
    return character.validate();
  });

  it('validates required fields', () => {
    const character = new CharacterModel();
    return character.validate()
        .then(
            resolve => {
              throw new Error('test should not resolve');
            },
            error => {
              expect(error.name).toEqual('ValidationError');
              character.name = 'teststory';
              return character.validate();
            })
        .then(
            resolve => {
              throw new Error('test should not resolve');
            },
            error => {
              expect(error.name).toEqual('ValidationError');
              const user = new UserModel();
              character.user = user._id;
              return character.validate();
            })
        .then(
            resolve => {
              throw new Error('test should not resolve');
            },
            error => {
              expect(error.name).toEqual('ValidationError');
              const story = new StoryModel();
              character.story = story._id;
              console.log('taylor');
              return character.validate();
            });
  });
});

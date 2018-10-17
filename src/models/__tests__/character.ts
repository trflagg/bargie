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
    character.messages = [
      {
        messageName: 'MESSAGE1',
        commandText: 'Message 1',
      },
      {
        messageName: 'MESSAGE2',
        commandText: 'Message 2',
      }
    ];
    character.children = [{
      name: 'Child 1',
      messages: [
        {
          messageName: 'CHILD1_MESSAGE1',
          commandText: 'Child Messaage 1',
        },
        {
          messageName: 'CHILD2_MERSSAGE2',
          commandText: 'Child Message 2',
        }
      ]
    }];
    return character.validate();
  });
});

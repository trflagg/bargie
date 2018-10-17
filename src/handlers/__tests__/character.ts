import {connectToTestDB, disconnectToTestDB} from '../../../test/mongoose-utils.js';
import {StoryModel} from '../../models/story';
import {UserModel} from '../../models/user';
import * as characterHandler from '../character';

describe('CharacterHandler', () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it('can create a new character', async () => {
    const user = new UserModel();
    const story = new StoryModel();

    const character = await characterHandler.createCharacter(
        {
          name: 'Test character',
          description: 'She is tall',
          gender: 'Female',
        },
        user,
        story,
    );

    expect(character).not.toBe(null);
    expect(character.name).toEqual('Test character');
    expect(character.description).toEqual('She is tall');
    expect(character.gender).toEqual('Female');
    expect(character.user).toEqual(user._id);
    expect(character.story).toEqual(story._id);
  });
});

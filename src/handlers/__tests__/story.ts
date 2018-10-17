import {connectToTestDB, disconnectToTestDB} from '../../../test/mongoose-utils.js';
import {UserModel} from '../../models/user';
import * as storyHandler from '../story';

describe('StoryHandler', () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it('can create a new story', async () => {
    const user = new UserModel();
    const story = await storyHandler.createStory(
        {
          name: 'Test Story',
        },
        user);
    expect(story).not.toBe(null);
    expect(story.name).toEqual('Test Story');
    expect(story.user).toEqual(user._id);
  });
});

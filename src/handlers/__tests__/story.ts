import * as mongoose from 'mongoose';

import {connectToTestDB, disconnectToTestDB} from '../../../test/mongoose-utils.js';
import * as storyHandler from '../story';

describe('StoryHandler', () => {
  beforeAll(async () => {
    await connectToTestDB();
  });

  afterAll(async () => {
    await disconnectToTestDB();
  });

  it('can create a new story', async () => {
    const owner = new mongoose.Types.ObjectId();
    const story = await storyHandler.createStory(
        {
          name: 'Test Story',
          owner,
        },
    );
    expect(story).not.toBe(null);
    expect(story.name).toEqual('Test Story');
    expect(story.owner).toEqual(owner);
  });
});

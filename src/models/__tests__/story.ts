import {StoryModel} from '../story';
import {UserModel} from '../user';

describe('StoryModel', () => {
  it('can make a new instance', () => {
    const user = new UserModel();
    const story = new StoryModel();
    story.name = 'teststory';
    story.user = user._id;
    return story.validate();
  });
});

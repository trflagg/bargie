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

  it('validates required fields', () => {
    const story = new StoryModel();
    return story.validate()
        .then(
            resolve => {
              throw new Error('test should not resolve');
            },
            error => {
              expect(error.name).toEqual('ValidationError');
              story.name = 'teststory';
              return story.validate();
            })
        .then(
            resolve => {
              throw new Error('test should not resolve');
            },
            error => {
              expect(error.name).toEqual('ValidationError');
              const user = new UserModel();
              story.user = user._id;
              return story.validate();
            });
  });
});

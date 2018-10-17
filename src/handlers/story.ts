import {StoryInterface, StoryModel} from '../models/story';
import {UserInterface} from '../models/user';

export async function createStory(
    props: {
      name: string,
    },
    user: UserInterface): Promise<StoryInterface> {
  const story = new StoryModel(props);
  story.user = user._id;

  await story.save();

  return story;
}

import * as mongoose from 'mongoose';

import {StoryInterface, StoryModel} from '../models/story';

export async function createStory(props: {
  name: string, owner: mongoose.Types.ObjectId;
}): Promise<StoryInterface> {
  const story = new StoryModel(props);

  await story.save();

  return story;
}

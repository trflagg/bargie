import * as mongoose from 'mongoose';

import {StoryInterface, StoryModel} from '../models/story';

export function createStory(
    props: {name: string, owner: mongoose.Types.ObjectId;}): StoryInterface {
  return new StoryModel(props);
}

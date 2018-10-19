import * as mongoose from "mongoose";

import { StoryProps, StoryInterface, StoryModel } from "../models/story";

export function createStory(props: StoryProps): StoryInterface {
  return new StoryModel(props);
}

export async function updateStory(
  _id: mongoose.Types.ObjectId,
  props: StoryProps
): Promise<StoryInterface> {
  try {
    const story = await StoryModel.findOneAndUpdate(
      {
        _id,
        owner: props.owner
      },
      props,
      { upsert: true, new: true }
    ).exec();

    // if block should never run.
    // Should throw error instead of returning null
    /* istanbul ignore if */
    if (!story) {
      throw new Error("Story not found.");
    }
    return story;
  } catch (e) {
    console.log(`Caught error in updateStory src/handlers/story: ${e}`);
    throw new Error("Story not found.");
  }
}

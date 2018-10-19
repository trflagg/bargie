import { LocationModel } from "../location";
import { StoryModel } from "../story";

describe("LocationModel", () => {
  it("can make new instance", () => {
    const location = new LocationModel();
    const story = new StoryModel();
    location.name = "TEST_LOCATION";
    location.title = "Test Location";
    location.description = "This is a test location";
    location.story = story._id;
    return location.validate();
  });
});

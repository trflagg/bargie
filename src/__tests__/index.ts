import { hello } from "../index";

it("should be true", () => {
  expect(true).toBe(true);
  expect(hello("test")).toEqual("Hello test! ");
});

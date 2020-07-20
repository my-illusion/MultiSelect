import { add } from "../src";

describe("test index.ts", () => {
  test("add", () => {
    expect(add(1, 2)).toBe(3);
  });
});

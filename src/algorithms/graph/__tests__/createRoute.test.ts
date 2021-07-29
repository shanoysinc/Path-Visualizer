import { createRoute } from "../";
import { Path } from "../types";

test("find the route from startNode to endNode", () => {
  const previous: Path = {
    "10-20": "2-4",
    "2-4": "3-5",
    "3-5": "10-10",
  };

  const route = createRoute(previous, "10-10", "10-20");

  expect(route).toEqual(expect.arrayContaining(["10-10", "10-20"]));
});

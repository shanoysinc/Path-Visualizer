import { Path } from "./types";

export function createRoute(
  previous: Path,
  source: string,
  distination: string
) {
  const route = [distination];

  let path = previous[distination];
  while (path && path !== source) {
    route.push(path);
    path = previous[path];
  }

  route.push(source);
  return route;
}

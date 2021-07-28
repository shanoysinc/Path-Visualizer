/* eslint-disable @typescript-eslint/no-empty-function */
import React, { ReactElement } from "react";
import {
  render as rtlRender,
  // screen,
  queryByAttribute,
  Matcher,
  MatcherOptions,
} from "@testing-library/react";
import { Grid } from "../../../Grid";
import { RecoilRoot } from "recoil";
import userEvent from "@testing-library/user-event";

let getById: (
  container: HTMLElement,
  id: Matcher,
  options?: MatcherOptions | undefined
) => HTMLElement | null;

beforeAll(() => {
  jest.spyOn(console, "debug").mockImplementation(() => {});
  jest.spyOn(console, "warn").mockImplementation(() => {});
  jest.spyOn(console, "groupCollapsed").mockImplementation(() => {});

  getById = queryByAttribute.bind(null, "id");
});

function render(UI: ReactElement) {
  return rtlRender(<RecoilRoot>{UI}</RecoilRoot>);
}

test("find node in grid component", () => {
  const { container } = render(<Grid />);

  const node = getById(container, "0-10");
  expect(node).toBeTruthy();
});

test("add wall on node", () => {
  const { container } = render(<Grid />);

  const node = getById(container, "0-10");
  if (node) {
    userEvent.click(node);
  }

  const hasWalls = node?.classList.contains("wall");
  expect(hasWalls).toBeTruthy();
});

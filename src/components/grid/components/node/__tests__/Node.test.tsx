import React, { ReactElement } from "react";
import { render as rtlRender } from "@testing-library/react";
import { Grid } from "../../../Grid";
import { RecoilRoot } from "recoil";

function render(UI: ReactElement) {
  return rtlRender(<RecoilRoot>{UI}</RecoilRoot>);
}

test("test component render", () => {
  render(<Grid />);
});

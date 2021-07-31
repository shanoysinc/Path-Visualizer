import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { RecoilRoot } from "recoil";
import { ChakraProvider } from "@chakra-ui/react";
import { Drawer } from "./components";

ReactDOM.render(
  <React.StrictMode>
    <RecoilRoot>
      <ChakraProvider>
        <Drawer />
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>,
  document.getElementById("root")
);

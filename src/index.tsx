import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "jotai";
import ReactDOM from "react-dom";
import { App } from "./app";
import { theme } from "./theme";

const mountPosition = document.createElement("div");
mountPosition.id = "app";
document.querySelector("body")!.appendChild(mountPosition);

ReactDOM.render(
  <Provider>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </Provider>,
  mountPosition
);

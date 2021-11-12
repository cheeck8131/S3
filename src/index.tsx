import { render } from "react-dom";
import { StrictMode } from "react";

import Main from "./views/main/main";
import { Provider } from "react-redux";
import { store } from "store";

render(
  <StrictMode>
    <Provider store={store}>
      <Main />
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

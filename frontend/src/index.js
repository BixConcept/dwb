import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";
import * as serviceWorker from "./serviceWorker";
import store from "./store";
import { Provider } from "react-redux";

import { I18nextProvider } from "react-i18next";
import i18n from "./internatiolization/internationalization.jsx";

export const API_HOST = "http://localhost:8000";

ReactDOM.render(
  <Provider store={store}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </Provider>,
  document.getElementById("app")
);
serviceWorker.register();

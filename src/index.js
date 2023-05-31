// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ToastProvider } from "react-toast-notifications";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import React from "react";
import "bootstrap/dist/css/bootstrap.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  // <StrictMode>
  <Provider store={store}>
    <ToastProvider autoDismiss autoDismissTimeout={5000} placement="top-right">
      <App />
    </ToastProvider>
  </Provider>
  // </StrictMode>
);

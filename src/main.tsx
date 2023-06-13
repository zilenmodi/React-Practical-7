import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import App from "./App";
import "./index.css";
import store from "./store/store";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <ToastContainer />
    <Provider store={store}>
      <App />
    </Provider>
  </>
);

/* eslint-disable no-unused-vars */
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { store } from "./app/store";
import { Provider } from "react-redux";
import './constants/i18n.js'; 



const root =createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);


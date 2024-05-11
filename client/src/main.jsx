import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createContext } from "react";
import UserStore from "./store/UserStore.js";
import DeviceSrore from "./store/DeviceStore.js";
import BasketStore from "./store/BusketStiore.js";

export const Context = createContext(null);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Context.Provider
    value={{
      user: new UserStore(),
      deviceStore: new DeviceSrore(),
      basket: new BasketStore(),
    }}
  >
    <App />
  </Context.Provider>
);

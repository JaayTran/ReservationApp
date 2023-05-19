import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { DateContextProvider } from "./context/DateContext";
import { ViewProvider } from "./context/ViewContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ViewProvider>
    <DateContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </DateContextProvider>
  </ViewProvider>
);

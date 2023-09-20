import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import ScrollToTop from "./components/ScrollToTop";
import TokenRefresh from "./components/TokenRefresh";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <BrowserRouter basename="">
    <ScrollToTop />
    <TokenRefresh />
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);

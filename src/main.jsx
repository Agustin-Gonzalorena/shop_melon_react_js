import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ApiContextProvider from "./context/apiContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ApiContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </ApiContextProvider>
  </BrowserRouter>
);

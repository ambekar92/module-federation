import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import "bootstrap-icons/font/bootstrap-icons.css";
import RouterNav from "./Router";

function App() {
  return (
    <>
      <BrowserRouter>
        <RouterNav />
      </BrowserRouter>
    </>
  );
}
export default App;

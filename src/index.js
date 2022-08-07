import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import "./styles/fonts/Mars/Mars Bold.ttf";
import "./styles/fonts/reno-mono/RenoMono/Web-PS/RenoMono.woff2";

const root = document.getElementById("root");
render(<App />, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

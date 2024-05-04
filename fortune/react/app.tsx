import "vite/modulepreload-polyfill"; // required for vite entrypoints

import { Root, createRoot } from "react-dom/client";
import React from "react";

import {Wheel} from "./components/wheel"

declare global {
  interface Window { reactRoot: Root; }
}

const domNode = document.getElementById("react-root");

if (domNode) {
  const reactRoot = window.reactRoot || createRoot(domNode);
  window.reactRoot = reactRoot;
  reactRoot.render(<Wheel></Wheel>);
}

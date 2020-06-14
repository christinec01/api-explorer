import React from "react";
import ExplorerComponent from "./ExplorerComponent";
import * as data from "./data.json";
import "./App.css";

function App() {
  return (
    <ExplorerComponent
      title={data.title}
      url={data.url}
      method={data.method}
      body={data.body}
    />
  );
}

export default App;

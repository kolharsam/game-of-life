import React from "react";
import ReactDOM from "react-dom";

import Conway from "./components/Conway";
import "./styles/styles.css";

const Index = () => {
  return (
    <div className="container">
      <Conway rows={35} cols={85} fps={60} />
    </div>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<Index />, rootElement);

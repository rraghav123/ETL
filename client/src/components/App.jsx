import React from "react";
import "./App.scss";
import Upload from "./upload/views/Upload";
import Canvas from "./canvas/views/Canvas";

const App = () => (
    <div className="wrapper">
        <div className="canvas">
            <Canvas />
        </div>
        <div className="app">
            <div className="card">
                <Upload />
            </div>
        </div>
    </div>
);
export default App;

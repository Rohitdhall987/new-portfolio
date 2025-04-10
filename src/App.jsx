// App.jsx
import React from "react";
import MatrixRain from "./components/matrixRain.jsx";
import "./App.css"

function App() {
    return (
        <div>
            <MatrixRain />
            <div style={{ position: "relative", zIndex: 1,}}>
                <div style={{width:'100%',height:'100%'}}>
                    <span className="raleway heroText">CODE</span>
                </div>
            </div>
        </div>
    );
}

export default App;

import React from "react";
import MatrixRain from "./components/matrixRain.jsx";
import "./App.css"
import Navbar from "./components/navBar.jsx";
import styled from "styled-components";

function App() {
    return (
        <div>


                <Float>
                    <Navbar />
                </Float>
                <div>
                    <MatrixRain />
                    <div style={{ position: "relative", zIndex: 1,}}>


                        <div style={{ width: "100%", height: "100vh" }}>


                            <Center>
                                <span className="raleway heroText">CODE</span>
                            </Center>


                        </div>
                    </div>
                </div>


        </div>
    );
}

export default App;


const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

`;

const Float = styled.div`
    width: 100%;
    position: fixed;
    z-index: 20;
    top: 10;
`;

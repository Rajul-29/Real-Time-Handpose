import React, { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import "./App.css";
import { drawHand } from "./utilities";

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);

  const runHandpose = async () => {
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    
    setInterval(() => {
      detect(net);
    }, 100);
  };

  const detect = async (net) => {
    
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

     
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

     
      const hand = await net.estimateHands(video);
      console.log(hand);

     
      const ctx = canvasRef.current.getContext("2d");
      drawHand(hand, ctx);
    }
  };

  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Real-Time Handpose Estimation</h1>
        <p>
          This project demonstrates real-time handpose estimation using TensorFlow.js and React.js
        </p>
      </header>

      <div className="main-container">
        <div className="camera-container">
          <Webcam
            ref={webcamRef}
            className="webcam"
          />
          <canvas
            ref={canvasRef}
            className="canvas"
          />
        </div>
      </div>

      <footer className="App-footer">
        <p style={{textAlign: "center"}}>Created by Rajul Chaudhary</p>
        <a
          href="https://github.com/Rajul-29"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
            alt="GitHub"
            style={{ width: "30px", height: "30px", marginRight: "15px" }}
          />
        </a>

        <a
          href="https://linkedin.com/in/rajul-chaudhary-882a72261"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linkedin/linkedin-original.svg"
            alt="LinkedIn"
            style={{ width: "30px", height: "30px"}}
          />
        </a>
      </footer>
    </div>
  );
}

export default App;
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Home from "./Home";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";
import Page4 from "./Page4";
import Page5 from "./Page5";
import Page6 from "./Page6";
import Page7 from "./Page7";
import Page8 from "./Page8";
import Page9 from "./Page9";
import React from "react";
import './Pages.css';

const App = () => {
  const navigate = useNavigate();
  
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="page-bg">
            <div className="form-card">
              <h2>Welcome to the AI Music Survey</h2>

              <p className="intro-text">
                This survey aims to explore how people perceive and evaluate
                AI-generated music compared to human-composed music.
                You will listen to several short music clips and rate them
                based on different aspects such as emotional impact,
                musical quality, and overall preference.
                <br /><br />
                Your responses will help researchers better understand
                audience reactions to artificial intelligence in music creation.
                All responses are anonymous and will only be used for academic
                research purposes.
              </p>

              <p className="intro-text">
                The survey will take approximately 5–7 minutes to complete.
                Please use headphones or good speakers for the best listening
                experience.
              </p>

              <button
                className="next-btn"
                onClick={() => navigate("/home")}
              >
                Start Survey
              </button>
            </div>
          </div>
        }
      />
      <Route path="/home" element={<Home />} />
      <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      <Route path="/page3" element={<Page3 />} />
      <Route path="/page4" element={<Page4 />} />
      <Route path="/page5" element={<Page5 />} />
      <Route path="/page6" element={<Page6 />} />
      <Route path="/page7" element={<Page7 />} />
      <Route path="/page8" element={<Page8 />} />
      <Route path="/page9" element={<Page9 />} />
    </Routes>
  );
};

export default App;

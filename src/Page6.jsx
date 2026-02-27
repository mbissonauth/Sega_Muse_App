import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from './createClient';
import song2 from "./music/song2.wav";
import './Pages.css';

function Page6() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // get user id from Home

  if (!userId) {
    console.error("No user ID passed to Page6!");
  }

  const [selected, setSelected] = useState("");

  const options = [
    "Very realistic",
    "Somewhat realistic",
    "Neutral",
    "Not very realistic",
    "Not realistic at all"
  ];

  const handleSelect = (option) => {
    setSelected(option); // always highlight selected button
  };

  const handleNext = async () => {
    if (!userId) {
      alert("No user ID found!");
      return;
    }

    if (!selected) {
      alert("Please select an option before continuing!");
      return;
    }

    // Update Supabase
    const { data, error } = await supabase
      .from('users')
      .update({ realistic_instrument: selected })
      .eq('id', userId);

    if (error) {
      console.error("Error updating user:", error);
      alert("Failed to save your answer. Try again.");
      return;
    }

    console.log("User updated:", data);

    // Navigate to Page2, pass userId along
    navigate("/page7", { state: { userId } });
  };

  return (
    <div className="page-bg">
      <div className="form-card">
        <h2>AI Music Evaluation Survey</h2>
        <p className="question">How realistic do the instruments sound in the music?</p>
        <div className="song-header">
          <span className="song-title">Song Two</span>
          <audio controls controlsList="nodownload" src={song2} className="audio-player"></audio>
        </div>
        <div className="toggle-group">
          {options.map((option) => (
            <button
              key={option}
              className={`toggle-btn ${selected === option ? "active" : ""}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        {selected && <p className="selected-display">Selected: {selected}</p>}

        <button className="next-btn" onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Page6;



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from './createClient';
import song1 from "./music/song1.wav";
import './Pages.css';

function Page2() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId;

  const [rating, setRating] = useState(null);

  // ✅ Save rating only
  const handleNext = async () => {
    if (!userId) {
      alert("User not found!");
      return;
    }

    if (!rating) {
      alert("Please select a rating!");
      return;
    }

    const { data, error } = await supabase
      .from('users')
      .update({ enjoyable: rating }) // save only number
      .eq('id', userId);

    if (error) {
      console.error("Error updating:", error);
      alert("Failed to save your answer.");
      return;
    }

    navigate("/page3", { state: { userId } });
  };

  return (
    <div className="page-bg">

      <div className="form-card">

        <h2 className="title">AI Music Evaluation Survey</h2>

        <p className="question">
          How much do you enjoy this music?
        </p>

        {/* 🎵 Song */}
        <div className="audio-card">
          <div className="song-header">
            <span className="song-title">Song 1</span>
            <span className="song-sub">Please listen before rating</span>
          </div>

          <audio controls src={song1} className="audio-player"></audio>
        </div>

        {/* ⭐ Your rating buttons remain unchanged */}
        <div className="scale-container">
          {[1, 2, 3, 4, 5].map((num) => (
            <button
              key={num}
              className={`rating-card ${rating === num ? "active" : ""}`}
              onClick={() => setRating(num)}
            >
              <span className="rating-number">{num}</span>
              <span className="rating-label">
                {["Poor", "Fair", "Good", "Very Good", "Excellent"][num - 1]}
              </span>
            </button>
          ))}
        </div>

        <button className="next-btn" onClick={handleNext}>Next</button>

      </div>
    </div>
  );
}

export default Page2;

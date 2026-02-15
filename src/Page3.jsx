import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { supabase } from './createClient';
import song2 from "./music/song2.wav";
import './Pages.css';

function Page3() {
  const navigate = useNavigate();
  const location = useLocation();

  const [answer, setAnswer] = useState(null);          // Yes / No answer
  const [reminderText, setReminderText] = useState(""); // Text field if "Yes"
  const [userId, setUserId] = useState(location.state?.userId || null);

  // Fallback: get userId from Supabase session if not passed
  useEffect(() => {
    if (!userId) {
      const session = supabase.auth.session();
      if (session) setUserId(session.user.id);
    }
  }, [userId]);

  // Save or update user's answer + text
  const saveAnswer = async () => {
    if (!answer) {
      alert("Please select an answer!");
      return;
    }
    if (!userId) {
      alert("User not identified!");
      return;
    }

    try {
      // ✅ Update the existing user's row in "users" table
      const { error } = await supabase
        .from("users")
        .update({ 
          q2: answer,                  // save Yes/No answer
          similar_song: reminderText    // save text field answer
        })
        .eq("id", userId);              // match the correct row

      if (error) {
        console.error("Error updating user:", error);
        alert("Failed to save your answer.");
        return;
      }
    } catch (err) {
      console.error("Error saving answer:", err);
    }
  };

  // Handle Next button click
  const handleNext = async () => {
    await saveAnswer();
    navigate("/page4", { state: { userId } });
  };

  return (
    <div className="page-bg">
      <div className="form-card">
        <h2 className="title">Music Listening Test</h2>

        <p className="question">Do you think this music sounds AI-generated or human-created?</p>

        <div className="audio-card">
          <div className="song-header">
            <span className="song-title">Song Two</span>
            <span className="song-sub">Please listen before answering</span>
          </div>
          <audio controls controlsList="nodownload" src={song2} className="audio-player"></audio>
        </div>

        <div className="answer-buttons">
          <button
            className={answer === "yes" ? "answer-btn selected" : "answer-btn"}
            onClick={() => setAnswer("yes")}
          >
            Yes, Sounds Robotic
          </button>

          <button
            className={answer === "no" ? "answer-btn selected" : "answer-btn"}
            onClick={() => setAnswer("no")}
          >
            No, Sounds Human
          </button>
        </div>

        {/* Conditional text input only if "Yes" is selected */}
        {answer === "yes" && (
          <div className="reminder-input" style={{ marginTop: "15px", textAlign: "left" }}>
            <label htmlFor="reminderText">What particular music or song does it remind you of?</label>
            <input
              type="text"
              id="reminderText"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              placeholder="Type your answer here..."
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            />
          </div>
        )}

        <button className="next-btn" onClick={handleNext} style={{ marginTop: "20px" }}>
          Next
        </button>

        <Link to="/" className="back-link" style={{ marginTop: "10px", display: "block" }}>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}

export default Page3;

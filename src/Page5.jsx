import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from './createClient';
import song1 from "./music/song1.wav";
import song2 from "./music/song2.wav";
import song3 from "./music/song3.wav";
import './Pages.css';

function Page5() {
    const navigate = useNavigate();
    const location = useLocation();
    const userId = location.state?.userId; // get user id from Home

    if (!userId) {
        console.error("No user ID passed to Page1!");
    }

    const [selected, setSelected] = useState("");

    const options = [
        "Song One",
        "Song Two",
        "Song Three",
        "None of the above"
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
            .update({ profession: selected })
            .eq('id', userId);

        if (error) {
            console.error("Error updating user:", error);
            alert("Failed to save your answer. Try again.");
            return;
        }

        console.log("User updated:", data);

        // Navigate to Page2, pass userId along
        navigate("/page6", { state: { userId } });
    };

    return (
        <div className="app-container">
            <div className="form-card">
                <h2>Page 5</h2>
                <p>Which one of these song do you think is AI generated?</p>
                <div className="audio-card">
                    <div className="song-header">
                        <span className="song-title">Song One</span>
                        <span className="song-sub">Please listen before answering</span>
                    </div>
                    <audio controls controlsList="nodownload" src={song1} className="audio-player"></audio>
                </div>
                <div className="audio-card">
                    <div className="song-header">
                        <span className="song-title">Song Two</span>
                        <span className="song-sub">Please listen before answering</span>
                    </div>
                    <audio controls controlsList="nodownload" src={song2} className="audio-player"></audio>
                </div>
                <div className="audio-card">
                    <div className="song-header">
                        <span className="song-title">Song Three</span>
                        <span className="song-sub">Please listen before answering</span>
                    </div>
                    <audio controls controlsList="nodownload" src={song3} className="audio-player"></audio>
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

export default Page5;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from './createClient';
import './Pages.css';

function Page1() {
  const navigate = useNavigate();
  const location = useLocation();
  const userId = location.state?.userId; // get user id from Home

  if (!userId) {
    console.error("No user ID passed to Page1!");
  }

  const [selected, setSelected] = useState("");

  const options = [
    "Professional / Trained Musician",
    "Hobby / Basic Training",
    "No Musical Training"
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
    navigate("/page2", { state: { userId } });
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>Page 1</h2>
        <p>Do you have any musical training or background?</p>

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

export default Page1;

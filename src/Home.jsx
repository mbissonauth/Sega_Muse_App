import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./createClient";

import "./Pages.css";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    age: "",
  });

  async function createUser(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("users")
      .insert([{ name: user.name, age: user.age }])
      .select();

    if (error) {
      console.error("Error creating user:", error);
      return;
    }

    const userId = data[0].id;

    // reset form
    setUser({ name: "", age: "" });

    // go to Page1 with new ID
    navigate("/page1", { state: { userId } });
  }

  function handleChange(event) {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  }

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>User Info</h2>

        <form onSubmit={createUser}>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            placeholder="Age"
            name="age"
            value={user.age}
            onChange={handleChange}
            required
          />

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default Home;

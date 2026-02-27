// Home.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './createClient';
import './Pages.css';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', age: '' });

  const handleChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const createUser = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('users')
      .insert([{ name: user.name, age: user.age }])
      .select();

    if (error) return console.error('Error creating user:', error);

    const userId = data[0].id;
    setUser({ name: '', age: '' });

    navigate('/page1', { state: { userId } });
  };

  return (
    <div className="app-container">
      <div className="form-card">
        <h2>User Info</h2>
        <form onSubmit={createUser}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={user.age}
            onChange={handleChange}
            required
          />
          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
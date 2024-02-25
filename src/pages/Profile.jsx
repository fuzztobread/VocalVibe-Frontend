import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Wave from 'react-wavify'; // Import the Wave component for animation

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const [wavePosition, setWavePosition] = useState('center');

  useEffect(() => {
    const handleMouseMove = (event) => {
      const containerWidth = document.querySelector('.profile-container').offsetWidth;
      const cursorX = event.clientX;
      const wavePosition = cursorX < containerWidth / 2 ? 'left' : 'right';
      setWavePosition(wavePosition);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <Navbar />
      <div className="profile-container mx-auto max-w-2xl mt-10">
        <Wave
          fill="#f0f0f0"
          options={{
            amplitude: 25,
            speed: 0.15,
            points: 3,
            height: 150, // Adjust height as needed
          }}
          className={`wave ${wavePosition}`} // Dynamically add class based on wavePosition
        />

        <div className="profile-card bg-white shadow-md rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-semibold">{user.first_name} {user.last_name}</h1>
            <Link to="/predicted" className="button">View History</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-gray-700"><strong>Email Address:</strong> {user.email}</p>
            {/* Add more profile data fields here as needed */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

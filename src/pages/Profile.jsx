import React from 'react';
import { useState } from 'react';
import Wave from 'react-wavify';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Profile = () => {
  const user = useSelector(state => state.user.user);
  const [wavePosition, setWavePosition] = useState('bottom');

  const waveVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const waveTransition = {
    duration: 1,
    ease: 'easeInOut',
  };

  const handleWavePosition = () => {
    setWavePosition(wavePosition === 'bottom' ? 'top' : 'bottom');
  };

  return (
    <>
    <Navbar />
    
    <div className="relative min-h-screen #f0f0f0">
      
     
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white bg-opacity-75 rounded-lg shadow-md p-5">
          <img className="w-32 h-32 rounded-full mx-auto mb-5" src="https://source.unsplash.com/random" alt="Profile" />
          <h1 className="text-3xl font-semibold text-center mb-5 text-white">{user.first_name} {user.last_name}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Email Address</h2>
              <p className="text-gray-700">{user.email}</p>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">Membership Status</h2>
              <p className="text-gray-700">Active</p>
            </div>
            {/* Add 
            more Card components as needed */}
          </div>
          <div className="mt-5 text-center">
              <Link to="/predicted" className="button" >View History</Link>
            </div>
        </div>
      </div>
      <motion.div
        className={`absolute ${wavePosition === 'bottom' ? 'bottom-0' : 'top-0'} w-full`}
        initial="hidden"
        animate="visible"
        transition={waveTransition}
        variants={waveVariants}
      >
        <Wave
          className="h-64"
          fill="rgba(255, 255, 255, 0.5)"
          paused={false}
          options={{
            height: 50,
            amplitude: 50,
            speed: 0.2,
            points: 3,
          }}
        />
      </motion.div>
    </div>
    </>
  );
  
};

export default Profile;
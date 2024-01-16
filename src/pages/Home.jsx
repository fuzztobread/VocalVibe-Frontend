import React, { useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Lottie from 'lottie-react';
import animationData from '../components/lot.json';
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector hook


const Home = (props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Access the isAuthenticated state from the Redux store
  const token = useSelector(state => state.user.token);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    // Reset predicted emotion when a new file is uploaded
    setPredictedEmotion(null);
  };

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/predict/predict-emotion/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token.access}`, // Include the authentication token
        },
      })

      if (response.data.error) {
        alert(`Error: ${response.data.error}`);
      } else {
        // Store the predicted emotion in state
        setPredictedEmotion(response.data);
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  const handleMicClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    
    // Check if a file is already selected
    // if (!audioFile) {
    //   fileInput.click();
    // }
  };
  console.log(isAuthenticated)
  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">

        {/* Upload Button (Centered) */}
        <label className="relative overflow-hidden">
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept="audio/*"
          />
          <Lottie
            animationData={animationData}
            className="lottie-animation-home cursor-pointer"
            onClick={handleMicClick}
          />
        </label>

        {/* Predict Button (Visible only after uploading) */}
        {audioFile && (
          <div
            className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
            onClick={handlePredict}
          >
            Predict
          </div>
        )}

        {/* Display Predicted Emotion */}
        {predictedEmotion && (
          <div className="mt-8 text-2xl text-rose-500 font-normal">
            Decode the Feels: Emotion Unveiled - {predictedEmotion}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Button from "../components/Button";

const Home = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);

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
      const response = await axios.post('http://127.0.0.1:5000/predict', formData);

      if (response.data.error) {
        alert(`Error: ${response.data.error}`);
      } else {
        // Store the predicted emotion in state
        setPredictedEmotion(response.data.emotion);
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    }
  };

  return (
    <>
      <Navbar />
      <Button />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">

        {/* Upload Button (Centered) */}
        <label className="relative overflow-hidden">
          <input
            type="file"
            className="hidden"
            onChange={handleUpload}
            accept="audio/*"
          />
          <div className="bg-rose-500 hover:bg-rose-700 px-6 py-3 rounded-full text-white cursor-pointer transition-all duration-300">
            Upload Audio
          </div>
        </label>

        {/* Predict Button (Visible only after uploading) */}
        {audioFile && (
          <div
            className="bg-green-500 hover:bg-green-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
            onClick={handlePredict}
          >
            Predict
          </div>
        )}

        {/* Display Predicted Emotion */}
        {predictedEmotion && (
          <div className="mt-4 text-2xl text-rose-500 font-bold">
            Predicted Emotion: {predictedEmotion}
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

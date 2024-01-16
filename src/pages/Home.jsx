import React, { useState, useRef } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Lottie from 'lottie-react';
import animationData from '../components/lot.json';
import { useSelector } from "react-redux";

const Home = () => {
  const [audioBlob, setAudioBlob] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector(state => state.user.token);
  const mediaRecorderRef = useRef(null);

  const handleMicClick = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(audioBlob);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start();
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const handleMicStop = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
  };

  const handlePredict = async () => {
    if (audioBlob) {
      const formData = new FormData();
      formData.append('file', audioBlob, 'audio.wav');  // Append the audioBlob with a filename and .wav extension
  
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/predict/predict-emotion/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token.access}`,
          },
        });
  
        if (response.data.error) {
          alert(`Error: ${response.data.error}`);
        } else {
          setPredictedEmotion(response.data);
        }
      } catch (error) {
        console.error('Error making prediction:', error);
      }
    } else {
      alert('Please record audio before predicting.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">

        {/* Microphone Animation (Centered) */}
        <Lottie
          animationData={animationData}
          className="lottie-animation-home cursor-pointer"
          onClick={handleMicClick}
        />

        {/* Stop Recording Button */}
        <div
          className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
          onClick={handleMicStop}
        >
          Stop Recording
        </div>

        {/* Predict Button (Visible only after recording) */}
        {audioBlob && (
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

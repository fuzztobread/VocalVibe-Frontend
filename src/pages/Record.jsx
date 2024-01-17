import React, { useState, useRef } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Lottie from 'lottie-react';
import animationData from '../components/lot.json';
import { useSelector } from "react-redux";

const Record = (props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const chunksRef = useRef([]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector(state => state.user.token);

  const handlePredict = async () => {
    const formData = new FormData();
    formData.append('file', audioFile);

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
  };

  const handleMicClick = () => {
    const fileInput = document.querySelector('input[type="file"]');
    
    if (!isRecording) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const mediaRecorder = new MediaRecorder(stream);
          mediaRecorder.ondataavailable = (e) => {
            if (e.data.size > 0) {
              chunksRef.current.push(e.data);
            }
          };
          mediaRecorder.onstop = () => {
            const audioBlob = new Blob(chunksRef.current, { type: 'audio/wav' });
            setAudioFile(audioBlob);
          };

          mediaRecorder.start();
          setIsRecording(true);
          mediaRecorderRef.current = mediaRecorder;
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    } else {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">
        <label className="relative overflow-hidden">
          <Lottie
            animationData={animationData}
            className={`lottie-animation-home cursor-pointer ${isRecording ? 'recording' : ''}`}
            onClick={handleMicClick}
          />
        </label>

        {audioFile && (
          <div
            className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
            onClick={handlePredict}
          >
            Predict
          </div>
        )}

        {predictedEmotion && (
          <div className="mt-8 text-2xl text-rose-500 font-normal">
            Decode the Feels: Emotion Unveiled - {predictedEmotion}
          </div>
        )}
      </div>
    </>
  );
};

export default Record;

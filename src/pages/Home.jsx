import React, { useState, useRef } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Lottie from 'lottie-react';
import animationData from '../components/lot.json';
<<<<<<< Updated upstream
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector hook

=======
import animationDataUpload from '../components/uplud.json'; // Import the uploadd.json animation file
import { useSelector, useDispatch } from "react-redux";
import classNames from "classnames";
import upload from "../assets/upload.svg";
import mic from "../assets/mic.svg";
import animationData1 from '../components/lot.json';
import animationData2 from '../components/lots2.json';
import Loading from '../components/Loading.jsx';
import confetti from 'canvas-confetti';
>>>>>>> Stashed changes

const Home = (props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const audioRef = useRef(null);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector(state => state.user.token);
<<<<<<< Updated upstream
=======
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false);

  const audioChunks = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [recordingOrNotRecording, setRecordingOrNotRecording] = useState(false);

  useEffect(() => {
    resetValues();
  }, [isSelected]);

  const resetValues = () => {
    setPredictedEmotion(null);
    setAudioUrl(null);
    setRecordings([]);
    setAudioFile(null);
  }

  const startRec = async () => {
    setRecordingOrNotRecording(true);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const options = { mimeType: 'audio/webm' }; // WebM format for wider compatibility
    const mediaRecorder = new MediaRecorder(stream, options);
    
    mediaRecorder.ondataavailable = (e) => {
      if (e.data.size > 0) audioChunks.current.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: 'audio/webm' });
      setAudioFile(audioBlob);
      const audioUrl = URL.createObjectURL(audioBlob);
      setRecordings((prevRecs) => [...prevRecs, audioUrl]);
      audioChunks.current = []; // Reset the chunks
    };

    mediaRecorderRef.current = mediaRecorder;
    mediaRecorderRef.current.start();

    setTimeout(() => {
      stopRec();
    }, 5000);
  };

  const stopRec = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingOrNotRecording(false);
    }
  };

  const handlePredict1 = async () => {
    setLoading(true); // Set loading to true when predicting starts
    const formData = new FormData();
    formData.append('file', audioFile, 'recording.wav'); // Append with file name
  
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
  
        // Trigger confetti animation on successful prediction
        confetti({
          particleCount: 100,
          angle: 60,
          spread: 360,
          startVelocity: 30,
          decay: 0.9,
          colors: ['#f44336', '#e91e63', '#9c27b0', '#3f51b5', '#03a9f4'],
        });
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setLoading(false); // Set loading to false when prediction is done
    }
  };

  const audioFileInputRef = useRef(null);
>>>>>>> Stashed changes

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));  // Create a URL for the uploaded file
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
<<<<<<< Updated upstream
=======
        <h1 className="text-4xl text-center mb-16">
          <span className="text-3xl font-semibold dark:text-white">Decode Your Voice,</span> <br />
          <span className="text-3xl font-semibold text-rose-500">Discover Your True Emotions</span>
        </h1>

        {/* Loading bar */}
        {loading && (
          <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full animate-loading-bar"></div>
          </div>
        )}
>>>>>>> Stashed changes

        {/* Upload Button (Centered) */}
<<<<<<< Updated upstream
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
=======
        {isSelected && (
<<<<<<< Updated upstream
  <div className="relative overflow-hidden">
  <input
      type="file"
      className="hidden"
      onChange={handleUpload}
      accept="audio/*"
      ref={audioFileInputRef}
    />
    <Lottie
      animationData={animationData}
      className="lottie-animation-home cursor-pointer"
      onClick={handleUploadButton}
    />
  </div>
)}
>>>>>>> Stashed changes
=======
          <div className="relative overflow-hidden">
            <input
              type="file"
              className="hidden"
              onChange={handleUpload}
              accept="audio/*"
              ref={audioFileInputRef}
            />
            <Lottie
              animationData={animationDataUpload} // Use the uploadd.json animation file
              className="lottie-animation-home cursor-pointer"
              onClick={handleUploadButton}
            />
          </div>
        )}
>>>>>>> Stashed changes

        {audioUrl && (
          <>
          <audio ref={audioRef} controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <a href={audioUrl} download={`recordings.wav`}>download</a>
          </>
        )}

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
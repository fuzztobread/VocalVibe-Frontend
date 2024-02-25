import React, { useState, useRef, useEffect } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import Lottie from 'lottie-react';
import animationData from '../components/lot.json';
import { useSelector, useDispatch } from "react-redux"; // Import the useSelector hook
import classNames from "classnames";
import upload from "../assets/upload.svg";
import mic from "../assets/mic.svg";
import animationData1 from '../components/lot.json';
import animationData2 from '../components/lots2.json';
import Loading from '../components/Loading.jsx';
const Home = (props) => {
  const [audioFile, setAudioFile] = useState(null);
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null);  // New state to store the audio URL
  const audioRef = useRef(null);  // Ref for the audio element
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated); // Access the isAuthenticated state from the Redux store
  const token = useSelector(state => state.user.token);
  const [isSelected, setIsSelected] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const audioChunks = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [recordingOrNotRecording, setRecordingOrNotRecording] = useState(false);

  useEffect(() => {
    // Your function to be triggered when isSelected changes
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
      }
    } catch (error) {
      console.error('Error making prediction:', error);
    } finally {
      setLoading(false); // Set loading to false when prediction is done
    }
  };

  const audioFileInputRef = useRef(null);

  const handleUpload = (event) => {
    const file = event.target.files[0];
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));  // Create a URL for the uploaded file
    // Reset predicted emotion when a new file is uploaded
    setPredictedEmotion(null);
  };

  const handleUploadButton = () => {
    audioFileInputRef.current.click();
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">
        {/* Loading bar */}
        {loading && (
          <div className="w-full bg-gray-300 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-500 h-full animate-loading-bar"></div>
          </div>
        )}

        {/* Upload Button (Centered) */}
        {isSelected && <label className="relative overflow-hidden">
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
        </label>}

        {audioUrl && isSelected && (
          <>
          <audio ref={audioRef} controls>
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <a href={audioUrl} download={`recordings.wav`}>download</a>
          </>
        )}

        {/* Predict Button (Visible only after uploading) */}
        {audioFile && isSelected && (
          <div
            className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
            onClick={handlePredict1}
          >
            Predict
          </div>
        )}

        {/* Display Predicted Emotion */}
        {predictedEmotion && isSelected && (
          <div className="mt-8 text-2xl text-rose-500 font-normal">
            Decode the Feels: Emotion Unveiled - {predictedEmotion}
          </div>
        )}


        {/* recording part */}

        {!recordingOrNotRecording && !isSelected && (
            <Lottie
            animationData={animationData1}
            className="lottie-animation-home cursor-pointer"
            onClick={startRec}
          />
          )
          }


        {recordingOrNotRecording && !isSelected &&(
            <Lottie
            animationData={animationData2}
            className="lottie-animation-home cursor-pointer"
          />
          )
          }

          {recordings.map((recUrl, index) => (
            <div key={index}>
              <audio controls src={recUrl} />
              <a href={recUrl} style={{color:"white"}} download={`recordings-${index}.wav`}>
                Download
              </a>
            </div>
          ))}

          {!isSelected && audioFile && (
            <button onClick={handlePredict1} className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300">
            Predict
          </button>
          )}

          {
            !isSelected && predictedEmotion && (
              <div className="mt-8 text-2xl text-rose-500 font-normal">
              Decode the Feels: Emotion Unveiled - {predictedEmotion}
            </div>
            )
          }





        <div
        onClick={() => setIsSelected(!isSelected)}
        className={classNames("flex w-20 h-10 bg-gray-600 m-10 rounded-full",
        {
          'bg-green':isSelected,
        })}>
          <span className={
            classNames('h-10 w-10 bg-white rounded-full transition-all',
            {'ml-10': isSelected,})}>
              {isSelected && <img src={upload} className="p-1"/>}
              {!isSelected && <img src={mic}/>}
            </span>
        </div>

      </div>
    </>
  );
};
export default Home;
import React, { useState, useRef } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';

import Lottie from 'lottie-react';
import animationData1 from '../components/lot.json';
import animationData2 from '../components/lots2.json';

const Record = (props) => {
  const [predictedEmotion, setPredictedEmotion] = useState(null);
  const token = useSelector((state) => state.user.token);
  const [audioFile, setAudioFile] = useState(null);
  const audioChunks = useRef([]);
  const [recordings, setRecordings] = useState([]);
  const mediaRecorderRef = useRef(null);
  const [recordingOrNotRecording, setRecordingOrNotRecording] = useState(false);


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

  const handlePredict = async () => {
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
    }
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex flex-col items-center justify-center mt-8">
        <div>
        <label className="relative overflow-hidden">
          {!recordingOrNotRecording && (
            <Lottie
            animationData={animationData1}
            className="lottie-animation-home cursor-pointer"
            onClick={startRec}
          />
          )
          }
          {recordingOrNotRecording && (
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
        </label>
          <button onClick={handlePredict} className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300">
            Predict
          </button>
        </div>
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

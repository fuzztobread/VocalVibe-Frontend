import React, { useState, useRef } from "react";
import axios from 'axios';
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";

  const Record = (props) => {
    const [predictedEmotion, setPredictedEmotion] = useState(null);
    const token = useSelector(state => state.user.token);
    const [audioFile, setAudioFile] = useState(null);

    const audioChunks = useRef([]);
    const [recordings, setRecordings] = useState([])
    const mediaRecorderRef = useRef(null)

    const startRec = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({audio:true})

      const mediaRecorder = new MediaRecorder(stream);

      mediaRecorder.ondataavailable= (e) => {
        if(e.data.size > 0) {
          // save data
          audioChunks.current.push(e.data);
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, {type: 'audio/wav'});
        const audioUrl = URL.createObjectURL(audioBlob);
        setRecordings(prevRecs => [...prevRecs, audioUrl]);
      }
      
      // Assign the mediaRecorder to the ref
      mediaRecorderRef.current = mediaRecorder;

      // Start recording
      mediaRecorderRef.current.start();

    };

    const stopRec = () => {
      if(mediaRecorderRef.current && mediaRecorderRef.current.state === "recording"){
        mediaRecorderRef.current.stop();
      }
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

    return (
      <>
        <Navbar />
        <div className="w-full h-full flex flex-col items-center justify-center mt-8">

          <div>
            <button className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300" onClick={startRec}>
              start recording
            </button>
            <button className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300" onClick={stopRec}>
              stop recording
            </button>
            {recordings.map((recUrl, index) =>
                (<div key={index}>
                  <audio controls src={recUrl}/>
                  <a href={recUrl} download={`recordings-${index}.wav`}>download</a>
                </div>)
              )
            }
            <div
            className="bg-rose-500 hover:bg-rose-600 px-6 py-3 mt-4 rounded-full text-white cursor-pointer transition-all duration-300"
            onClick={handlePredict}
            >
              Predict
            </div>
          </div>
        </div>
      </>
    );
  };
  
  export default Record;
  

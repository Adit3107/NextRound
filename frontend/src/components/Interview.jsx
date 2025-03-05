import React, { useState, useRef } from "react";
import Webcam from "react-webcam";
import interviewImage from "../assets/camera-placeholder.png"; 

const Interview = () => {
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const webcamRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordedChunks, setRecordedChunks] = useState([]);

  // Toggle Camera
  const handleCameraToggle = () => {
    setIsCameraOn(!isCameraOn);
  };

  // Start Recording
  const handleStartRecording = () => {
    if (webcamRef.current && webcamRef.current.stream) {
      const options = { mimeType: "video/webm" };
      const mediaRecorder = new MediaRecorder(
        webcamRef.current.stream,
        options
      );

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
    }
  };

  // Stop Recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] p-8">
      {/* Left Side: Questions Section */}
      <div className="w-1/2 p-6">
        <h1 className="text-3xl font-bold text-[#0D47A1] mb-4">
          AI Mock Interview
        </h1>
        <p className="text-lg text-gray-800 mb-6">
          Answer the questions displayed here.
        </p>

        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p className="text-lg font-medium text-gray-700">
            "Tell me about yourself."<br /> "What are your strengths?"<br /> "What is your
            biggest weakness?"<br /> "Where do you see yourself in five years?"<br /> "Why
            should we hire you?"
          </p>
        </div>
      </div>

      {/* Right Side: Video Section */}
      <div className="w-1/2 flex flex-col items-center">
        <div className="w-full max-w-md h-64 bg-black rounded-lg overflow-hidden shadow-lg flex items-center justify-center">
          {isCameraOn ? (
            <Webcam ref={webcamRef} className="w-full h-full object-cover" />
          ) : (
            <img
              src={interviewImage}
              alt="Camera Off"
              className="w-full h-full object-cover opacity-60"
            />
          )}
        </div>

        {/* Buttons Section */}
        <div className="flex flex-col gap-4 mt-6">
          <button
            className="px-6 py-3 bg-[#0D47A1] text-white text-lg font-bold rounded-md shadow-lg hover:bg-[#0e2a6d] transition-all"
            onClick={handleCameraToggle}
          >
            {isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
          </button>

          <button
            className="px-6 py-3 bg-[#0D47A1] text-white text-lg font-bold rounded-md shadow-lg hover:bg-[#0e2a6d] transition-all"
            onClick={isRecording ? handleStopRecording : handleStartRecording}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>

          <button className="px-6 py-3 bg-red-600 text-white text-lg font-bold rounded-md shadow-lg hover:bg-red-800 transition-all">
            End Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;

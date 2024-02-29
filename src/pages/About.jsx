import React from "react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import { Divider } from "../components";
import { motion } from "framer-motion";

const About = () => {
  const emotions = [
    {
      title: "Happy",
      image: "/images/happy.png",
      description: "",
    },
    {
      title: "Sad",
      image: "/images/sad.png",
      description: "",
    },
    {
      title: "Neutral",
      image: "/images/neutral.png",
      description: "",
    },
    {
      title: "Angry",
      image: "/images/angry.png",
      description: "",
    },
  ];

  const emotionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="m-4 flex items-center justify-center mt-16 p-8 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
          <div className="flex flex-col items-center justify-center w-full md:flex-row">
            {/* Left side (Image) */}
            <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
              <motion.img
                className="w-full h-full object-cover rounded-full"
                src="/images/pinky.png"
                alt="Vocal Vibe"
                initial="hidden"
                animate="visible"
                variants={emotionVariants}
                transition={{ duration: 1 }}
              />
            </div>

            {/* Right side (Text) */}
            <div className="text-white text-center w-full md:w-1/2 md:ml-8">
              <h1 className="text-4xl font-bold mb-2">
                <Logo />
              </h1>
              <h2 className="text-xl font-semibold mb-4">
                Speech Emotion Recognition System
              </h2>
              <p className="text-1xl">
                Welcome to Vocal Vibe, a cutting-edge Speech Emotion Recognition System. Our system employs advanced algorithms to analyze speech patterns, allowing us to identify and understand emotions with precision. Whether you're developing interactive applications, studying human behavior, or enhancing user experiences, Vocal Vibe is your go-to solution.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className="text-white py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Range of Emotions</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {emotions.map((emotion, index) => (
            <motion.div
              key={index}
              className="flex items-center justify-center p-4 rounded-lg bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500"
              initial="hidden"
              animate="visible"
              variants={emotionVariants}
              transition={{ duration: 1 }}
            >
              <div className="flex-shrink-0 p-4">
                <div className="flex items-center justify-center flex-col">
                  {/* Emotion Image */}
                  <img
                    className="w-16 h-16 object-cover rounded-full mb-2"
                    src={emotion.image}
                    alt={emotion.title}
                  />
                  {/* Emotion Title */}
                  <h3 className="text-lg font-semibold mb-2">{emotion.title}</h3>
                  {/* Emotion Description */}
                  <p className="text-sm">{emotion.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;

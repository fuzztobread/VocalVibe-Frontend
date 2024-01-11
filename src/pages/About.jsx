import React from "react";
import Navbar from "../components/Navbar";
import Logo from "../components/Logo";
import { Divider } from "../components";

const About = () => {
  const emotions = [
    {
      title: "Happy",
      image: "/images/hap.png",
      description: "Description about happy emotion.",
    },
    {
      title: "Sad",
      image: "/images/sad.png",
      description: "Description about sad emotion.",
    },
    {
      title: "Disgust",
      image: "/images/dis.png",
      description: "Description about disgust emotion.",
    },
    {
      title: "Neutral",
      image: "/images/neu.png",
      description: "Description about neutral emotion.",
    },
    {
      title: "Fear",
      image: "/images/fear.png",
      description: "Description about fear emotion.",
    },
    {
      title: "Pleasant",
      image: "/images/pls.png",
      description: "Description about pleasant emotion.",
    },
    {
      title: "Surprised",
      image: "/images/sur.png",
      description: "Description about surprised emotion.",
    },
    {
      title: "Angry",
      image: "/images/ang.png",
      description: "Description about angry emotion.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex items-center justify-center">
        <div className="m-4 flex items-center justify-center mt-16 p-8 rounded-lg">
          <div className="flex flex-col items-center w-full md:flex-row">
            {/* Left side (Image) */}
            <div className="flex-shrink-0 w-full md:w-1/2 mb-4 md:mb-0">
              <img
                className="w-full h-full object-cover rounded-full"
                src="/images/pinky.png"
                alt="Vocal Vibe"
              />
            </div>

            {/* Right side (Text) */}
            <div className="text-white text-center w-full md:w-1/2 md:ml-8">
              {/* <h1 className="text-4xl font-bold mb-2"><Logo /></h1> */}
              {/* <h2 className="text-xl font-semibold mb-4">
                Speech Emotion Recognition System
              </h2> */}
              {/* <p className="text-1xl">
                Welcome to Vocal Vibe, a cutting-edge Speech Emotion Recognition System. Our system employs advanced algorithms to analyze speech patterns, allowing us to identify and understand emotions with precision. Whether you're developing interactive applications, studying human behavior, or enhancing user experiences, Vocal Vibe is your go-to solution.
              </p> */}
              <p className="mt-4 text-2xl">
                Experience the future of emotional intelligence with Vocal Vibe.
              </p>
              <p className="mt-4 text-1xl">
                Our mission is to provide valuable insights by harnessing the power of speech.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Divider />
      <div className=" text-white py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Range of Emotions</h1>
        </div>
        <div className="flex items-center justify-center">
          {emotions.map((emotion, index) => (
            <div key={index} className="flex-shrink-0 p-4">
              <div className="flex items-center justify-center flex-col">
                {/* Emotion Image */}
                <img
                  className="w-16 h-16 object-cover rounded-full mb-2"
                  src={emotion.image}
                  alt={emotion.title}
                />
                {/* Emotion Title and Description */}
                <div className="text-center">
                  <h2 className="text-lg font-semibold mb-2">{emotion.title}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default About;

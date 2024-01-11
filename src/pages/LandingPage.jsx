import React from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import Navbar from '../components/Navbar';
import animationData from '../components/audio.json';
import { Logo } from '../components';

const LandingPage = () => {
  return (
    <>
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Logo />
        </Link>
      </div>
      <div className="landing-page relative flex items-center justify-center flex-col h-screen p-20 mt-5 -mt-150 overflow-hidden">
        <h1 className="text-4xl mb-6 text-white font-normal">Feel the Vibes, <span className="font-bold text-rose-500">Express the Emotion</span></h1>
        <p className="lp-text text-10 mb-8 max-w-400 text-white leading-7">Unlock the power of your voice with Vocal Vibe. Our Speech Emotion Recognition (SER) system brings words to life, turning every conversation into an emotional journey.</p>

        <div className="button-container fixed flex gap-80 justify-center -mt-290">
          <Link to="/sign-up" className="get-started-button mt-6 px-20 text-base bg-rose-500 text-white rounded-full cursor-pointer transition duration-300 hover:bg-rose-700">
            Get Started
          </Link>

          <Link to="/about" className="get-started-button mt-6 px-20 text-base bg-rose-500 text-white rounded-full cursor-pointer transition duration-300 hover:bg-rose-700">
            Learn More
          </Link>
        </div>

        <Lottie animationData={animationData} className="lottie-animation" />
      </div>
    </>
  );
};

export default LandingPage;

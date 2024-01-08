import React from 'react';
import { motion } from 'framer-motion';

const SmallCenteredWavyButton = ({ onClick }) => {
  return (
    <div className="flex items-center justify-center h-full">
      <motion.div
        className="bg-rose-500 hover:bg-rose-700 px-3 py-2 rounded-full text-white cursor-pointer transition-all duration-300"
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: [0, 10, -10, 0] }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
      >
        Upload Audio
      </motion.div>
    </div>
  );
};

export default SmallCenteredWavyButton;

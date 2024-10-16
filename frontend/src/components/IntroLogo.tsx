// src/components/IntroLogo.tsx

import React from 'react';
import { motion } from 'framer-motion';

interface IntroLogoProps {
  onComplete: () => void;
}

const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
      onAnimationComplete={onComplete}
      className="flex flex-col items-center justify-center min-h-screen"
    >
      <motion.img
        src="/src/assets/logo.svg" // Убедитесь, что путь к логотипу правильный
        alt="Logo"
        className="w-32 h-32 mb-4"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0 }}
        transition={{ duration: 1.5 }}
      />
      <motion.h1
        className="text-4xl font-bold text-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        SOLARLINK
      </motion.h1>
    </motion.div>
  );
};

export default IntroLogo;

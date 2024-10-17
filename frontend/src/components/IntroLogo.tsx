// src/components/IntroLogo.tsx

import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface IntroLogoProps {
  onComplete: () => void;
}

const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      // Плавное появление логотипа и текста
      await controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 1.5 },
      });
      // Задержка перед исчезновением
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Плавное исчезновение логотипа и текста
      await controls.start({
        opacity: 0,
        scale: 0,
        transition: { duration: 1.5 },
      });
      // Вызов функции завершения анимации
      onComplete();
    };
    sequence();
  }, [controls, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={controls}
      className="flex flex-col items-center justify-center h-full relative"
    >
      <motion.img
        src="/src/assets/logo.svg" // Убедитесь, что путь к логотипу правильный
        alt="Logo"
        className="w-32 h-32 mb-4"
      />
      <motion.h1
        className="text-4xl font-bold text-black"
      >
        SOLARLINK
      </motion.h1>
    </motion.div>
  );
};

export default IntroLogo;

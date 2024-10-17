// src/components/IntroLogo.tsx

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TextEffectWithExit } from './TextEffectWithExit'; // Подключаем анимацию текста

interface IntroLogoProps {
  onComplete: () => void;
}

const IntroLogo: React.FC<IntroLogoProps> = ({ onComplete }) => {
  useEffect(() => {
    // Таймер завершения анимации
    const totalDuration = 4000; // Убедитесь, что это совпадает с длительностью вашей анимации
    const timer = setTimeout(() => {
      onComplete();
    }, totalDuration);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1.5 }}
      className="flex flex-col items-center justify-center h-full relative"
    >
      <motion.img
        src="/logo.svg" // Проверьте правильность пути к вашему логотипу
        alt="Logo"
        className="w-32 h-32 mb-4"
      />
      {/* Подключаем анимацию текста */}
      <TextEffectWithExit />
    </motion.div>
  );
};

export default IntroLogo;

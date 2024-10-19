// src/components/Home.tsx

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

const Home: React.FC = () => {
  const [ping, setPing] = useState<number>(0);

  useEffect(() => {
    // Генерируем случайное значение ping при монтировании компонента
    const randomPing = Math.floor(Math.random() * (100 - 20 + 1)) + 40; // от 40 до 140 ms
    setPing(randomPing);
  }, []);

  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full relative p-4"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <Header />
      {/* Основной контент страницы Home */}
      <h1 className="text-3xl font-bold mb-8 inline-flex animate-text-gradient bg-gradient-to-r from-[#fd4faa] via-[#fef3a9] to-[#fdef4a] bg-[200%_auto] bg-clip-text text-2xl text-transparent">Connected</h1>
      <h1 className="text-3xl font-bold mb-8 inline-flex animate-text-gradient bg-gradient-to-r from-[#fdefaa] via-[#fef3a9] to-[#fdef4a] bg-[200%_auto] bg-clip-text text-8xl text-transparent">🟢</h1>
      
      <div className="flex flex-col items-start space-y-4">
        <div>
          <span className="text-lg font-medium">Points:</span>
          <span className="ml-2 text-lg">0 Points</span>
        </div>
        
        <div>
          <span className="text-lg font-medium">Referrals:</span>
          <span className="ml-2 text-lg">0</span>
        </div>
        
        <div>
          <span className="text-lg font-medium">Ping:</span>
          <span className="ml-2 text-lg text-green-500">{ping} ms</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Home;

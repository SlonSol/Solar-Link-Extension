// src/components/Home.tsx

import React from 'react';
import { motion } from 'framer-motion';
import Header from './Header';

const Settings: React.FC = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-full relative"
      initial={{ opacity: 0, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1 }}
    >
      <Header />
      {/* Основной контент страницы Home */}
      <h1 className="text-3xl font-bold">Settings</h1>
      <h1 className="p-3 text font-bold">Comming soon...</h1>
    </motion.div>
  );
}

export default Settings;

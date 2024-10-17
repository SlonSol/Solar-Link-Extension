// src/components/TextEffectWithExit.tsx

'use client';
import { useState, useEffect } from 'react';
import { TextEffect } from './core/text-effect';

export function TextEffectWithExit() {
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    // Логика срабатывания анимации один раз
    const timer = setTimeout(() => {
      setTrigger(false);
    }, 2000); // Длительность анимации

    return () => clearTimeout(timer);
  }, []);

  const blurSlideVariants = {
    container: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.01 },
      },
      exit: {
        transition: { staggerChildren: 0.01, staggerDirection: 1 },
      },
    },
    item: {
      hidden: {
        opacity: 0,
        filter: 'blur(10px) brightness(0%)',
        y: 0,
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px) brightness(100%)',
        transition: {
          duration: 0.4,
        },
      },
      exit: {
        opacity: 0,
        y: -30,
        filter: 'blur(10px) brightness(0%)',
        transition: {
          duration: 0.4,
        },
      },
    },
  };

  return (
    <TextEffect
      className="inline-flex"
      per="char"
      variants={blurSlideVariants}
      trigger={trigger}
    >
      Animate your ideas with motion-primitives
    </TextEffect>
  );
}

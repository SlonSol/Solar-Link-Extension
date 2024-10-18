// src/components/core/InputSpotlightBorder.tsx

'use client';
import React, { useRef, useState } from 'react';

interface InputSpotlightBorderProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputSpotlightBorder: React.FC<InputSpotlightBorderProps> = ({
  type,
  placeholder,
  value,
  onChange,
}) => {
  const divRef = useRef<HTMLInputElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    if (!isFocused) {
      setOpacity(0);
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onMouseMove={handleMouseMove}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        autoComplete="off"
        className="h-12 w-full cursor-default rounded-md border border-gray-100 bg-yellow-150 p-3.5 text-gray-100 transition-colors duration-500 placeholder:select-none placeholder:text-gray-100 focus:border-[#FFD15D] focus:outline-none"
      />
      <div
        ref={divRef}
        style={{
          border: '3px solid #FFD15D',
          opacity,
          WebkitMaskImage: `radial-gradient(30% 30px at ${position.x}px ${position.y}px, yellow 45%, transparent)`,
        }}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-10 h-12 w-full cursor-default rounded-md border border-[#FFD15D] bg-transparent p-3.5 transition-opacity duration-500"
      />
    </div>
  );
};

export default InputSpotlightBorder;

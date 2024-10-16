// src/components/AnimatedBorder.tsx
import React from 'react'

interface AnimatedBorderProps {
  children: React.ReactNode
}

const AnimatedBorder: React.FC<AnimatedBorderProps> = ({ children }) => {
  return (
    <div className="gradient-border">
      {children}
    </div>
  )
}

export default AnimatedBorder

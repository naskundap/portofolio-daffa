import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  // 1. Koordinat Mouse mentah
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Konfigurasi Spring (Efek Ekor/Pegas)
  // stiffness: kekakuan, damping: redaman, mass: berat beban
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a') || target.closest('button') || target.closest('.hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? 'cursor-active' : ''}`}
      style={{
        translateX: cursorX,
        translateY: cursorY,
        left: 0,
        top: 0,
        x: "-50%", // Mengetengahkan kursor ke titik mouse
        y: "-50%",
      }}
    />
  );
};

export default CustomCursor;
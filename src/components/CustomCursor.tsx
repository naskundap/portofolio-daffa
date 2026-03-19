import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Camera } from "lucide-react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const spring = { damping: 25, stiffness: 250 };
  const x = useSpring(mouseX, spring);
  const y = useSpring(mouseY, spring);

  // 🌗 DETECT DARK MODE
  useEffect(() => {
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // 🎯 TRACK MOUSE
  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const hover = (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      setIsHovering(
        !!(
          el.closest("a") ||
          el.closest("button") ||
          el.closest(".hover-target")
        )
      );
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", hover);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", hover);
    };
  }, []);

  const color = isDark ? "#fff" : "#000";

  return (
    <motion.div
      style={{
        translateX: x,
        translateY: y,
      }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none"
    >
      <div
        className="relative flex items-center justify-center"
        style={{
          width: 40,
          height: 40,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* 🔘 CIRCLE */}
        <motion.div
          animate={{
            scale: isHovering ? 1.6 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: `1.5px solid ${color}`,
            background: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(0,0,0,0.05)",

            // 🔥 INI KUNCINYA
            backdropFilter: isHovering ? "none" : "blur(8px)",
          }}
        />

        {/* 📷 CAMERA */}
        <motion.div
          animate={{
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <Camera size={16} color={color} strokeWidth={1.5} />
        </motion.div>

        {/* 🔺 ARROW */}
        {/* <motion.div
          animate={{
            scale: isHovering ? 1.2 : 1,
          }}
          transition={{ duration: 0.2 }}
          style={{
            position: "absolute",
            top: -6,
            left: -6,
            width: 0,
            height: 0,
            borderLeft: "8px solid transparent",
            borderRight: "8px solid transparent",
            borderBottom: `12px solid ${color}`,
            transform: "rotate(-45deg)",
          }}
        /> */}
      </div>
    </motion.div>
  );
}
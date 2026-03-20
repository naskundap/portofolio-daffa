import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.05; // volume halus
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  return (
    <>
      {/* AUDIO */}
      <audio ref={audioRef} loop>
        <source src="/music.mp3" type="audio/mpeg" />
      </audio>

      {/* BUTTON */}
      <motion.button
        onClick={toggleMusic}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[9999] 
        w-12 h-12 rounded-full glass flex items-center justify-center
        hover:scale-110 transition"
      >
        {isPlaying ? (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          >
            <Volume2 className="w-5 h-5" />
          </motion.div>
        ) : (
          <VolumeX className="w-5 h-5 opacity-60" />
        )}
      </motion.button>
    </>
  );
}
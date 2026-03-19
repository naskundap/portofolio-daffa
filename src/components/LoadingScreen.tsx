import { motion } from "framer-motion";
import { Camera } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center 
      bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col items-center gap-8">

        {/* 🔥 SPINNER */}
        <div className="relative w-28 h-28 flex items-center justify-center">

          {/* ring background */}
          <div className="absolute inset-0 rounded-full border-4 border-zinc-600/30" />

          {/* spinner utama */}
          <motion.div
            className="absolute inset-0 rounded-full border-4 border-transparent 
            border-t-zinc-200 border-r-zinc-200"
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 0.8,
              ease: "linear",
            }}
          />

          {/* spinner kedua */}
          <motion.div
            className="absolute inset-2 rounded-full border-2 border-transparent 
            border-b-zinc-400"
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 1.5,
              ease: "linear",
            }}
          />

          {/* 📸 ICON CAMERA (NEW) */}
          <motion.div
            className="absolute flex items-center justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.6,
              ease: "easeInOut",
            }}
          >
            <Camera className="w-8 h-8 text-white/80" />
          </motion.div>

          {/* glow tengah */}
          <motion.div
            className="absolute w-10 h-10 bg-zinc-200 rounded-full blur-xl opacity-40"
            animate={{ scale: [1, 1.5, 1] }}
            transition={{
              repeat: Infinity,
              duration: 1.4,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* 🔹 LOADING BAR */}
        <div className="w-56 h-1 bg-white/20 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* TEXT */}
        <motion.p
          className="text-sm text-white/70 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Preparing something cool...
        </motion.p>

      </div>
    </motion.div>
  );
}
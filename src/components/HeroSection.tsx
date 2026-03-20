import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function HeroSection() {

  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/naskundap" },
    { Icon: Instagram, href: "https://instagram.com/mdfalth" },
  ];

  return (
    <section
      id="home"
      className="
      relative min-h-screen flex items-center justify-center overflow-hidden

      bg-gradient-to-br 
      from-white via-zinc-100 to-zinc-200 
      dark:from-zinc-900 dark:via-zinc-800 dark:to-zinc-900
      "
    >

      {/* 🌧️ RAIN BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            className="
              absolute w-[1px] h-14 
              bg-black/10 dark:bg-white/10
            "
            initial={{
              y: -100,
              x: Math.random() * window.innerWidth,
              opacity: Math.random(),
            }}
            animate={{ y: "120vh" }}
            transition={{
              duration: 0.5 + Math.random(),
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* FOTO PROFIL */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-1/2 flex justify-center"
          >
            <motion.div
              className="relative"
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >

              {/* 🔥 GLOW ABU (LIGHT + DARK) */}
              <motion.div
                className="absolute inset-0 rounded-full blur-3xl opacity-40"
                style={{
                  background: `
                    radial-gradient(circle, 
                      rgba(120,120,120,0.25) 0%, 
                      rgba(160,160,160,0.15) 40%, 
                      transparent 70%)
                  `,
                }}
                animate={{ scale: [1, 1.25, 1] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* FOTO */}
              <motion.img
                src="/foto-profil.jpeg"
                alt="Profile"
                className="
                  relative w-80 h-80 md:w-96 md:h-96 
                  object-cover rounded-full 
                  border-4 border-primary 
                  shadow-xl
                "
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* TEKS */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">

            <motion.span
              className="
                inline-block px-4 py-2 rounded-full 
                bg-black/5 dark:bg-white/5 
                backdrop-blur 
                text-sm font-medium text-primary mb-6
              "
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              👋 welcome to my portfolio
            </motion.span>

            <motion.h1 className="font-display text-4xl md:text-6xl font-bold mb-6 text-zinc-900 dark:text-white">
              Daffa Portofolio
            </motion.h1>

            <motion.p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8">
              Seorang siswa SMA yang sedang berkarya melalui kamera, laptop, handphone, dan hati.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">

              <Button
                size="lg"
                className="rounded-full px-8 shadow-md hover:scale-105 transition"
                onClick={() => scrollToSection('projects')}
              >
                Lihat Projects
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 hover:scale-105 transition"
                onClick={() => scrollToSection('contact')}
              >
                Hubungi Saya
              </Button>
            </div>

            {/* SOSIAL */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    p-3 rounded-full 
                    bg-black/5 dark:bg-white/5 
                    backdrop-blur 
                    hover:scale-110 transition
                  "
                >
                  <social.Icon className="h-5 w-5 text-zinc-800 dark:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ⬇️ ARROW */}
      <motion.button
        onClick={() => scrollToSection('projects')}
        className="
          absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
          bg-black/5 dark:bg-white/5 backdrop-blur
        "
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>

    </section>
  );
}
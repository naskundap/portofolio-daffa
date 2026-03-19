import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  
  // FUNGSI SCROLL YANG DIPERBAIKI
  const scrollToSection = (sectionId: string) => {
    // Menghapus karakter '#' jika ada agar konsisten
    const id = sectionId.replace('#', '');
    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' // Memastikan scroll berhenti tepat di awal section
      });
    } else {
      console.warn(`Elemen dengan id="${id}" tidak ditemukan! Pastikan di file tujuan sudah ada id tersebut.`);
    }
  };

  const socialLinks = [
    { Icon: Github, href: "https://github.com/naskundap" },
    { Icon: Instagram, href: "https://instagram.com/mdfalth" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      <ThreeScene />

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
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="hover-target cursor-pointer"
            >
              <img
                src="/foto-profil.jpeg" 
                alt="Profile"
                className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-full border-4 border-primary shadow-glow"
              />
            </motion.div>
          </motion.div>

          {/* TEKS & TOMBOL */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <motion.span 
              className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              👋 welcome to my portfolio
            </motion.span>

            <motion.h1 className="font-display text-4xl md:text-6xl font-bold mb-6">
              Daffa Portofolio
            </motion.h1>

            <motion.p className="text-lg text-muted-foreground mb-8">
              Seorang siswa SMA yang sedang berkarya melalui kamera, laptop, handphone, dan hati.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center lg:justify-start">
              {/* TOMBOL LIHAT PROJECTS */}
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow"
                onClick={() => scrollToSection('projects')}
              >
                Lihat Projects
              </Button>

              {/* TOMBOL HUBUNGI SAYA */}
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8"
                onClick={() => scrollToSection('contact')}
              >
                Hubungi Saya
              </Button>
            </div>

            {/* SOSIAL MEDIA */}
            <div className="flex gap-4 justify-center lg:justify-start">
              {socialLinks.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass hover:scale-110 transition-transform"
                >
                  <social.Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ARROW DOWN */}
      <motion.button
        onClick={() => scrollToSection('projects')}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-float"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}
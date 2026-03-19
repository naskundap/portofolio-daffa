import { motion } from 'framer-motion';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

const projects = [
  {
    title: 'Pameran Foto Dokumenter',
    description: 'Karya fotografi dokumenter yang menangkap cerita kehidupan.',
    tags: ['Fotografi', 'Storytelling'],
    images: ['📸', '🌊', '🏙️'],
    gradient: 'from-blue-500/20 to-cyan-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]',
  },
  {
    title: 'Website Portfolio',
    description: 'Website personal modern dengan UI clean.',
    tags: ['React', 'UI/UX'],
    images: ['💻', '🌐', '⚡'],
    gradient: 'from-green-500/20 to-emerald-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]',
  },
  {
    title: 'Social Media Feed',
    description: 'Konten visual Instagram dengan branding kuat.',
    tags: ['Instagram', 'Content'],
    images: ['📱', '✨', '🔥'],
    gradient: 'from-pink-500/20 to-purple-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]',
  },
  {
    title: 'Tutorial Canva',
    description: 'Belajar desain Canva dari basic sampai pro.',
    tags: ['Design', 'Canva'],
    images: ['🎨', '🖌️', '🧠'],
    gradient: 'from-yellow-500/20 to-orange-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(234,179,8,0.6)]',
  },
  {
    title: 'Kelas Fotografi',
    description: 'Materi fotografi dari dasar hingga advance.',
    tags: ['Fotografi', 'Edukasi'],
    images: ['📷', '🌅', '🎞️'],
    gradient: 'from-indigo-500/20 to-blue-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(99,102,241,0.6)]',
  },
  {
    title: 'Video Editing',
    description: 'Teknik editing cinematic untuk konten.',
    tags: ['Video', 'Editing'],
    images: ['🎬', '🎥', '⚡'],
    gradient: 'from-red-500/20 to-orange-500/20',
    glow: 'hover:shadow-[0_0_40px_rgba(239,68,68,0.6)]',
  },
];

export default function ProjectsSection() {
  return (
    /* TAMBAHKAN id="projects" DI SINI */
    <section id="projects" className="py-20 md:py-32 bg-muted/30 transition-colors duration-500">
      <div className="container mx-auto px-4">

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Featured Projects
          </h2>
          <div className="h-1.5 w-20 bg-primary mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ========================= */
/* CARD COMPONENT */
/* ========================= */

function ProjectCard({ project, index }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [paused, project.images.length]);

  const nextSlide = (e) => {
    e.stopPropagation();
    setCurrent((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = (e) => {
    e.stopPropagation();
    setCurrent((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`group p-5 rounded-3xl glass transition-all duration-500 ${project.glow} border border-white/10`}
    >
      {/* CAROUSEL CONTAINER */}
      <div className={`relative aspect-video rounded-2xl mb-5 overflow-hidden bg-gradient-to-br ${project.gradient}`}>

        {/* SLIDES */}
        {project.images.map((img, i) => (
          <motion.div
            key={i}
            animate={{ 
              opacity: i === current ? 1 : 0,
              scale: i === current ? 1 : 1.1 
            }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center text-6xl select-none"
          >
            {img}
          </motion.div>
        ))}

        {/* NAVIGATION CONTROLS */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-all"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md hover:bg-white/40 text-white p-2 rounded-full transition-all"
            >
              <ChevronRight size={20} />
            </button>
        </div>

        {/* INDICATORS (DOTS) */}
        <div className="absolute bottom-3 w-full flex justify-center gap-1.5">
          {project.images.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* PROJECT INFO */}
      <div className="space-y-4">
        <div className="flex justify-between items-start">
            <h3 className="font-bold text-xl tracking-tight">
              {project.title}
            </h3>
            <ExternalLink className="h-5 w-5 opacity-0 group-hover:opacity-50 transition-opacity" />
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-primary/10 text-primary border border-primary/20">
              {tag}
            </span>
          ))}
        </div>

        <Button className="w-full mt-4 rounded-xl group/btn overflow-hidden relative">
           <span className="relative z-10 flex items-center gap-2">
             Lihat Project <ExternalLink className="h-4 w-4" />
           </span>
        </Button>
      </div>
    </motion.div>
  );
}
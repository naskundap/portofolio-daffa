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
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold">
            Projects
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}

/* ========================= */
/* CARD */
/* ========================= */

function ProjectCard({ project }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // AUTO SLIDE
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % project.images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [paused, project.images.length]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % project.images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className={`group p-6 rounded-2xl glass transition-all duration-300 ${project.glow}`}
    >
      {/* CAROUSEL */}
      <div className={`relative aspect-video rounded-xl mb-4 overflow-hidden bg-gradient-to-br ${project.gradient}`}>

        {/* SLIDES */}
        {project.images.map((img, i) => (
          <motion.div
            key={i}
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 flex items-center justify-center text-6xl"
          >
            {img}
          </motion.div>
        ))}

        {/* PANAH */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition"
        >
          <ChevronRight size={18} />
        </button>

        {/* DOT */}
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
          {project.images.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === current ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="space-y-3">
        <h3 className="font-bold text-lg">
          {project.title}
        </h3>

        <p className="text-sm text-muted-foreground">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="px-2 py-1 text-xs rounded-md bg-secondary">
              {tag}
            </span>
          ))}
        </div>

        <Button size="sm" className="rounded-full">
          <ExternalLink className="h-4 w-4 mr-1" />
          Lihat
        </Button>
      </div>
    </motion.div>
  );
}


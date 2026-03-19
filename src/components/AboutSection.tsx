import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Camera, Palette, ChevronDown } from 'lucide-react';
import { useState } from 'react';

export default function AboutSection() {
  const [activeIndex, setActiveIndex] = useState(null);

  const stats = [
    { icon: Code2, value: '50+', label: 'Projects Selesai' },
    { icon: Camera, value: '1000+', label: 'Foto' },
  ];

  const accordionData = [
    {
      title: 'Siapa Saya?',
      content:
        'Siswa SMA yang fokus di dunia fotografi, desain, dan web development.',
    },
    {
      title: 'Apa yang Saya Kerjakan?',
      content:
        'Saya membuat foto dokumenter, konten visual, serta mengembangkan website modern.',
    },
  ];

  const skillsBox = [
    {
      icon: Camera,
      label: 'Fotografi',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      glow: 'hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]',
      color: 'text-blue-400',
    },
    {
      icon: Palette,
      label: 'Design',
      gradient: 'from-pink-500/20 to-purple-500/20',
      glow: 'hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]',
      color: 'text-pink-400',
    },
    {
      icon: Code2,
      label: 'Coding',
      gradient: 'from-green-500/20 to-emerald-500/20',
      glow: 'hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]',
      color: 'text-green-400',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Tentang Saya</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Muhammad Daffa Al Atha
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* GRID ICON */}
          <motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  className="grid grid-cols-2 gap-4"
>
  {skillsBox.map((item, index) => {
    const Icon = item.icon;
    const isLast = index === skillsBox.length - 1;

    return (
      <motion.div
        key={index}
        whileHover={{ scale: 1.05 }}
        className={`
          rounded-2xl flex items-center justify-center
          glass bg-gradient-to-br ${item.gradient} ${item.glow}
          transition-all duration-300
          ${isLast ? 'col-span-2' : 'aspect-square'}
        `}
      >
        <div
          className={`
            flex flex-col items-center justify-center text-center
            ${isLast ? 'w-[160px] h-[160px]' : 'w-full h-full'}
          `}
        >
          <Icon className={`w-10 h-10 mb-2 ${item.color}`} />
          <p className="font-medium">{item.label}</p>
        </div>
      </motion.div>
    );
  })}
</motion.div>

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <h3 className="text-2xl md:text-3xl font-bold">
              Fotografer, Designer, & Developer
            </h3>

            {/* ACCORDION */}
            <div className="space-y-3">
              {accordionData.map((item, index) => (
                <div key={index} className="glass rounded-xl overflow-hidden">
                  
                  <button
                    onClick={() =>
                      setActiveIndex(activeIndex === index ? null : index)
                    }
                    className="w-full flex justify-between items-center p-4 text-left"
                  >
                    <span className="font-medium">{item.title}</span>
                    <ChevronDown
                      className={`transition-transform ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4 text-muted-foreground"
                      >
                        {item.content}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="p-4 glass rounded-xl text-center"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
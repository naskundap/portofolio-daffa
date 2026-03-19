import { motion } from 'framer-motion';
import { Camera, Palette, Code } from 'lucide-react';

const skills = { 
  fotografi: [ 
    { name: 'Komposisi', level: 95 }, 
    { name: 'Lighting & Exposure', level: 96 }, 
    { name: 'Editing', level: 88 }, 
    { name: 'Street Photography', level: 80 }, 
    { name: 'Storytelling', level: 85 }, 
  ], 
  design: [ 
    { name: 'Canva Design', level: 98 }, 
    { name: 'Layout & Typography', level: 96 }, 
    { name: 'Social Media Content', level: 88 }, 
    { name: 'Color Grading', level: 80 }, 
    { name: 'Poster & Branding', level: 87 }, 
  ],
  coding: [ 
    { name: 'HTML & CSS', level: 79 }, 
    { name: 'JavaScript', level: 75 }, 
    { name: 'React JS', level: 80 }, 
    { name: 'Tailwind CSS', level: 70 }, 
    { name: 'Basic Backend', level: 75 }, 
  ], 
};

/* ========================= */
/* SKILL BAR */
/* ========================= */
function SkillBar({ name, level, delay, gradient }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-muted-foreground">{level}%</span>
      </div>

      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2 }}
          className={`h-full rounded-full bg-gradient-to-r ${gradient}`}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Keahlian</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Skills dan Aplikasi
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* 📸 FOTOGRAFI */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 glass rounded-2xl transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-500/10">
                <Camera className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="font-display text-xl font-bold">Fotografi</h3>
            </div>

            <div className="space-y-4">
              {skills.fotografi.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  {...skill} 
                  delay={index * 0.1}
                  gradient="from-blue-400 to-cyan-400"
                />
              ))}
            </div>
          </motion.div>

          {/* 🎨 DESIGN */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 glass rounded-2xl transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(236,72,153,0.6)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-pink-500/10">
                <Palette className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="font-display text-xl font-bold">Canva & Design</h3>
            </div>

            <div className="space-y-4">
              {skills.design.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  {...skill} 
                  delay={index * 0.1}
                  gradient="from-pink-400 to-purple-400"
                />
              ))}
            </div>
          </motion.div>

          {/* 💻 CODING */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="p-6 glass rounded-2xl transition-all duration-300 
            hover:shadow-[0_0_40px_rgba(34,197,94,0.6)]"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-500/10">
                <Code className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="font-display text-xl font-bold">Coding</h3>
            </div>

            <div className="space-y-4">
              {skills.coding.map((skill, index) => (
                <SkillBar 
                  key={skill.name} 
                  {...skill} 
                  delay={index * 0.1}
                  gradient="from-green-400 to-emerald-400"
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
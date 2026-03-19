import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react'; 
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isDark, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // --- CONFIG: GANTI FOTO DI SINI ---
  const logoSrc = "/logo-navbar.jpeg"; 
  // ----------------------------------

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Karya', href: '#karya' },
    { label: 'FAQ', href: '#faq' },
   { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`
        w-full z-50 transition-all duration-300 fixed top-0
        ${isDark ? 'bg-zinc-900/90 border-b border-white/5' : 'bg-white/90 border-b border-black/5'}
        backdrop-blur-md shadow-md
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LOGO SECTION */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="flex items-center gap-3 cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* CONTAINER IKON DENGAN GLOW TERFOKUS */}
            <div className="relative flex items-center justify-center">
              {/* Grey Glow Effect - Hanya di sekitar lingkaran ikon */}
              <div className={`
                absolute inset-0 rounded-full blur-md transition duration-500 scale-110
                ${isDark 
                  ? 'bg-zinc-100/20 group-hover:bg-zinc-100/40' 
                  : 'bg-zinc-900/10 group-hover:bg-zinc-900/20'}
              `}></div>
              
              {/* Lingkaran Foto */}
              <div className={`
                relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 
                ${isDark ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-200 bg-white'} 
                shadow-sm z-10
              `}>
                <img 
                  src={logoSrc} 
                  alt="Daffa Logo" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
            
            {/* TEKS GRADIENT ABU-ABU */}
            <span className={`
              font-display text-lg md:text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r
              ${isDark 
                ? 'from-zinc-100 via-zinc-400 to-zinc-500' 
                : 'from-zinc-900 via-zinc-600 to-zinc-400'}
            `}>
              Daffa | Portofolio
            </span>
          </motion.a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {navItems.map((item) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`
                    px-3 py-2 text-sm font-medium transition-colors relative group
                    ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}
                  `}
                >
                  {item.label}
                  <span className={`
                    absolute inset-x-0 bottom-0 h-0.5 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100
                    ${isDark ? 'bg-zinc-400' : 'bg-zinc-800'}
                  `} />
                </motion.a>
              ))}
            </div>

            <div className="flex items-center gap-4 ml-4 border-l pl-4 border-zinc-300 dark:border-zinc-700">
              <div id="google_translate_element" className="scale-90 opacity-70 hover:opacity-100 transition"></div>

              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full w-9 h-9 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun className="h-5 w-5 text-zinc-100" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Moon className="h-5 w-5 text-zinc-800" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* MOBILE CONTROLS */}
          <div className="flex items-center gap-2 md:hidden">
            <div id="google_translate_element" className="scale-75 origin-right"></div>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full">
              {isDark ? <Sun className="h-5 w-5 text-zinc-100" /> : <Moon className="h-5 w-5 text-zinc-800" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-full"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`md:hidden border-t ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-100'} shadow-xl`}
          >
            <div className="container mx-auto px-6 py-8 flex flex-col gap-6">
              {navItems.map((item, idx) => (
                <motion.a
                  key={item.label}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`text-xl font-semibold transition-colors ${isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-500 hover:text-zinc-900'}`}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
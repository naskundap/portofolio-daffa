import { useState } from 'react';
import { Moon, Sun, Menu, X, Languages } from 'lucide-react'; // Tambah icon Languages buat pemanis
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isDark, toggleTheme }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
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
        ${
          isDark
            ? 'bg-zinc-900/90'
            : 'bg-white/90'
        }
        backdrop-blur-md shadow-md
      `}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* LOGO */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className="font-display text-xl md:text-2xl font-bold text-gradient cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            Daffa | Portofolio
          </motion.a>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className="relative font-medium text-muted-foreground hover:text-foreground transition-colors group"
                whileHover={{ y: -2 }}
              >
                {item.label}
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-gray-500 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}

            <div className="flex items-center gap-4 ml-4 border-l pl-4 border-gray-300 dark:border-zinc-700">
              {/* GOOGLE TRANSLATE CONTAINER (DESKTOP) */}
              <div id="google_translate_element" className="scale-90"></div>

              {/* THEME BUTTON */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="rounded-full hover:scale-110 transition"
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.div key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                      <Sun className="h-5 w-5" />
                    </motion.div>
                  ) : (
                    <motion.div key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                      <Moon className="h-5 w-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          </div>

          {/* MOBILE BUTTONS */}
          <div className="flex items-center gap-2 md:hidden">
            {/* GOOGLE TRANSLATE CONTAINER (MOBILE) */}
            <div id="google_translate_element" className="scale-75 origin-right"></div>
            
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t ${isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}
          >
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="text-lg font-medium text-muted-foreground hover:text-foreground transition"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
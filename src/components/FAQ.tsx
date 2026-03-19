import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle, Search } from "lucide-react";

const faqs = [
  {
    question: "Apa saja layanan yang ditawarkan?",
    answer: "Saya menawarkan layanan desain UI/UX, pengembangan website menggunakan React/Next.js, serta pembuatan konten visual kreatif untuk media sosial.",
  },
  {
    question: "Berapa lama waktu pengerjaan satu project?",
    answer: "Waktu pengerjaan bervariasi tergantung skala project, biasanya berkisar antara 1-3 minggu untuk hasil yang maksimal.",
  },
  {
    question: "Apakah saya bisa berkonsultasi terlebih dahulu?",
    answer: "Tentu saja! Kamu bisa menghubungi saya melalui section Contact di bawah untuk menjadwalkan sesi diskusi gratis mengenai kebutuhan project kamu.",
  },
  {
    question: "Bagaimana sistem pembayarannya?",
    answer: "Sistem pembayaran biasanya dibagi menjadi dua tahap: Down Payment (DP) di awal dan pelunasan setelah project selesai dikerjakan.",
  },
];

export default function FAQ({ isDark }: { isDark: boolean }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30 transition-colors duration-500">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4"
          >
            <HelpCircle className="text-primary h-8 w-8 md:h-10 md:w-10" />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Punya pertanyaan? Berikut adalah beberapa jawaban untuk hal-hal yang sering ditanyakan.
          </p>
        </div>

        {/* Accordion List */}
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`group rounded-2xl glass overflow-hidden transition-all duration-300 
                  ${isOpen ? 'ring-1 ring-primary/50 shadow-lg' : 'hover:shadow-md'}`}
              >
                <button
                  onClick={() => setActiveIndex(isOpen ? null : index)}
                  className="w-full p-5 md:p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className={`font-semibold text-lg transition-colors duration-300 ${isOpen ? 'text-primary' : ''}`}>
                    {faq.question}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className={`p-1 rounded-full ${isOpen ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}
                  >
                    <ChevronDown size={20} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                    >
                      <div className="px-6 pb-6 text-muted-foreground leading-relaxed border-t border-white/5 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* --- SIMPLE SEARCH BAR STYLE FORM --- */}
        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-sm font-medium text-muted-foreground mb-6 italic">
            Masih belum menemukan jawaban? Tanyakan langsung di bawah ini:
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative group px-2"
          >
            {/* Ikon Pencarian di Kiri */}
            <div className="absolute inset-y-0 left-7 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            
            {/* Input Bar */}
            <input 
              type="text" 
              placeholder="Tanyakan hal lain..."
              className="w-full pl-14 pr-16 py-5 rounded-full glass border border-white/10 shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all text-lg"
            />
            
            {/* Tombol Kirim dengan Ikon Question */}
            <button 
              type="button"
              className="absolute inset-y-2 right-4 px-4 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-all flex items-center justify-center active:scale-95 shadow-md"
              title="Kirim Pertanyaan"
            >
              <HelpCircle className="h-5 w-5" />
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
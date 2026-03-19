import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Nama harus diisi'),
  email: z.string().trim().email('Email tidak valid'),
  subject: z.string().trim().min(1, 'Subjek harus diisi'),
  message: z.string().trim().min(1, 'Pesan harus diisi'),
});

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'daffaalatha020110@email.com',
    href: 'mailto:daffaalatha020110@email.com',
    glow: 'hover:shadow-[0_0_30px_rgba(59,130,246,0.6)]',
  },
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '+62 822 6095 5074',
    href: 'https://wa.me/6282260955074',
    glow: 'hover:shadow-[0_0_30px_rgba(34,197,94,0.6)]',
  },
  {
    icon: MapPin,
    label: 'Lokasi',
    value: 'Banda Aceh, Aceh, Indonesia',
    // LINK GOOGLE MAPS ACEH
    href: 'https://maps.app.goo.gl/rAAVroDW51L7xAJ77',
    glow: 'hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]',
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xdawbaqk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: 'Pesan Terkirim ✨',
          description: 'Mantap! Pesan kamu sudah sampai ke email Daffa.',
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Gagal mengirim ke Formspree');
      }
    } catch (error) {
      toast({
        title: 'Gagal 😢',
        description: 'Coba lagi atau hubungi via WhatsApp ya!',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative scroll-mt-20">
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Kontak</span>
          <h2 className="text-3xl md:text-5xl font-bold mb-4">Ngobrol Yuk 👋</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Punya ide, project, atau cuma mau diskusi santai? Aku selalu terbuka buat hal-hal menarik.
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-4" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">

          {/* INFO SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {contactInfo.map((info) => (
              <motion.a
                key={info.label}
                href={info.href}
                // Memastikan semua link (WA & Maps) terbuka di tab baru
                target="_blank" 
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                className={`flex items-center gap-4 p-4 rounded-xl glass transition-all duration-300 hover-target ${info.glow}`}
              >
                <div className="p-3 rounded-lg bg-primary/10">
                  <info.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{info.label}</p>
                  <p className="font-medium">{info.value}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* FORM SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-6 p-6 rounded-2xl glass shadow-card border border-white/10"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Input
                    name="name"
                    placeholder="Nama"
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-xs text-red-500 ml-1">{errors.name}</p>}
                </div>
                <div className="space-y-1">
                  <Input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-xs text-red-500 ml-1">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <Input
                  name="subject"
                  placeholder="Subjek"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'border-red-500' : ''}
                />
                {errors.subject && <p className="text-xs text-red-500 ml-1">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <Textarea
                  name="message"
                  placeholder="Tulis pesan kamu di sini..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'border-red-500' : ''}
                />
                {errors.message && <p className="text-xs text-red-500 ml-1">{errors.message}</p>}
              </div>

              <Button
                type="submit"
                className="w-full rounded-full text-base font-medium hover:scale-105 transition-all duration-300 hover:shadow-glow"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <><Loader2 className="animate-spin mr-2 h-4 w-4" /> Mengirim...</>
                ) : (
                  <><Send className="mr-2 h-4 w-4" /> Kirim Pesan</>
                )}
              </Button>
            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
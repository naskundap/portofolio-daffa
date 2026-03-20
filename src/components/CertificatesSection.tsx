import * as React from 'react';
import { motion } from 'framer-motion';
import { Award, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const certificates = [
  {
    id: 'cert-1',
    title: 'Street Fotografi',
    issuer: 'Environtment',
    date: '2025',
    credentialId: 'DES-2025',
    images: ['/sertifikat/foto1.jpg', '/sertifikat/foto2.jpg', '/sertifikat/foto3.jpg', '/sertifikat/foto4.jpg'],
    category: 'Fotografi',
    link: '#',
  },
  {
    id: 'cert-2',
    title: 'Architecture Fotografi',
    issuer: 'Buildings',
    date: '2025',
    credentialId: 'PHOTO-2025',
    images: ['/sertifikat/foto5.jpg', '/sertifikat/foto6.jpg', '/sertifikat/foto7.jpg', '/sertifikat/foto8.jpg'],
    category: 'Fotografi',
    link: '#',
  },
  {
    id: 'cert-3',
    title: 'Masjid Fotografi Project',
    issuer: 'Masjid',
    date: '2025',
    credentialId: 'DOC-2025',
    images: ['/sertifikat/foto9.jpg', '/sertifikat/foto10.jpg', '/sertifikat/foto11.jpg', '/sertifikat/foto12.jpg'],
    category: 'Fotografi',
    link: '#',
  },
  { 
    id: 'cert-4', 
    title: 'Dokumenter Photography', 
    issuer: 'Street Photography', 
    date: '2026', 
    credentialId: 'PHOTOS-2026', 
    images: ['/sertifikat/foto13.jpg', '/sertifikat/foto14.jpg', '/sertifikat/foto15.jpg', '/sertifikat/foto16.jpg'], 
    category: 'Fotografi', 
    link: '#', 
  }, 
  { 
    id: 'cert-5', 
    title: 'Poster dan Infografis', 
    issuer: 'Design Graphics', 
    date: '2025', 
    credentialId: 'CONTENT-2025', 
    images: ['/sertifikat/foto17.jpg', '/sertifikat/foto18.jpg', '/sertifikat/foto19.jpg', '/sertifikat/foto20.jpg'], 
    category: 'Design', 
    link: '#', 
  }, 
  { 
    id: 'cert-6', 
    title: 'Boat Exploration', 
    issuer: 'Personal Series', 
    date: '2026', 
    credentialId: 'STREET-2026', 
    images: ['/sertifikat/foto21.jpg', '/sertifikat/foto22.jpg', '/sertifikat/foto23.jpg', '/sertifikat/foto24.jpg'], 
    category: 'Fotografi', 
    link: '#', 
  },
];

export default function CertificatesSection() {
  const [api, setApi] = React.useState<any>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section id="karya" className="py-20 md:py-32 bg-background font-sans overflow-hidden">
      <div className="container mx-auto px-4">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold mb-4"
          >
            Karya
          </motion.h2>
          <div className="w-16 h-1 bg-primary mx-auto rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto relative px-2 md:px-12">
          <Carousel 
            setApi={setApi}
            opts={{ align: "start", loop: true }} 
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {certificates.map((cert, index) => (
                <CarouselItem key={cert.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full border rounded-3xl overflow-hidden bg-card/50 backdrop-blur-sm flex flex-col shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    
                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden group/img">
                      <Carousel opts={{ loop: true }} className="w-full h-full">
                        <CarouselContent className="m-0 h-full">
                          {cert.images.map((img, idx) => (
                            <CarouselItem key={idx} className="p-0 h-full border-none">
                              <img 
                                src={img} 
                                alt="Dokumentasi" 
                                className="object-cover w-full h-full transition-transform duration-500 group-hover/img:scale-110"
                              />
                            </CarouselItem>
                          ))}
                        </CarouselContent>

                        <div className="absolute inset-0 flex items-center justify-between px-3">
                          <CarouselPrevious className="!static w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 active:scale-95 transition shadow-lg" />
                          <CarouselNext className="!static w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white hover:scale-110 active:scale-95 transition shadow-lg" />
                        </div>

                        <div className="absolute top-3 left-3 bg-primary/90 text-primary-foreground text-[10px] px-2 py-1 rounded-md font-bold uppercase">
                          {cert.category}
                        </div>
                      </Carousel>
                    </div>

                    {/* CONTENT */}
                    <div className="p-6 flex flex-col flex-grow">
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-primary mb-1">
                          <Award className="h-4 w-4" />
                          <span className="text-[10px] font-bold uppercase">{cert.issuer}</span>
                        </div>
                        <h3 className="text-lg font-bold line-clamp-1">{cert.title}</h3>
                      </div>

                      <div className="mt-auto space-y-4 pt-4 border-t">
                        <div className="flex justify-between items-center text-[11px] text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {cert.date}
                          </span>
                          <span className="font-mono">ID: {cert.credentialId}</span>
                        </div>

                        <Button variant="outline" size="sm" className="w-full rounded-xl" asChild>
                          <a href={cert.link} target="_blank" rel="noopener noreferrer">
                            Lihat Detail
                          </a>
                        </Button>
                      </div>
                    </div>

                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* OUTER NAV */}
            <CarouselPrevious className="-left-4 md:-left-12 h-10 w-10" />
            <CarouselNext className="-right-4 md:-right-12 h-10 w-10" />
          </Carousel>

          {/* 🔥 DOT INDICATOR */}
          <div className="flex justify-center gap-2 mt-6">
            {certificates.map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`
                  h-2 rounded-full transition-all duration-300
                  ${current === index 
                    ? "w-6 bg-primary" 
                    : "w-2 bg-muted hover:bg-primary/60"}
                `}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
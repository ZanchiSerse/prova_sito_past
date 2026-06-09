import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, PhoneCall } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const slides = [
  {
    image: '/manus-storage/NdWcf1bYS1Q0_d756c5a1.jpg',
    eyebrow: 'Pasticceria Artigianale',
    title: 'Pasticceria da Cristian',
    description:
      "L'arte del dolce artigianale a Treviolo. Ogni creazione è un capolavoro di qualità, cura e passione.",
  },
  {
    image: '/manus-storage/RlGA09dRUQbK_f2b290e9.jpg',
    eyebrow: 'Tradizione e Innovazione',
    title: 'Dolci per ogni occasione',
    description:
      'Dalle colazioni speciali alle grandi ricorrenze, realizziamo dessert personalizzati con ingredienti selezionati.',
  },
  {
    image: '/manus-storage/kZHAb9DqNV5g_455734b7.jpg',
    eyebrow: 'Qualità Senza Compromessi',
    title: 'Esperienza dal 1990',
    description:
      'Ogni giorno sforniamo bontà fresche che raccontano la nostra passione per il mestiere pasticcere.',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6500);

    return () => window.clearInterval(timer);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 z-0 will-change-transform">
        <AnimatePresence mode="wait">
          <motion.img
            key={slides[currentSlide].image}
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            loading={currentSlide === 0 ? 'eager' : 'lazy'}
            className="absolute inset-0 h-full w-full scale-105 object-cover"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1.04 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />
        </AnimatePresence>
      </motion.div>
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-background/55 to-background" />

      <motion.div
        className="container relative z-10 text-center"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <span className="font-accent text-sm tracking-[0.25em] text-accent">
              {slides[currentSlide].eyebrow}
            </span>
            <h1 className="mt-5 font-display text-5xl font-bold leading-tight text-foreground md:text-7xl">
              {slides[currentSlide].title}
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-foreground/85 md:text-xl">
              {slides[currentSlide].description}
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
          <motion.button
            onClick={() => scrollToSection('products')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3 font-accent text-sm text-accent-foreground shadow-xl shadow-accent/25"
          >
            Scopri i Nostri Prodotti
            <ArrowRight size={16} />
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('contact')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-accent/70 bg-background/65 px-8 py-3 font-accent text-sm text-accent backdrop-blur-sm"
          >
            Prenota su Misura
            <PhoneCall size={16} />
          </motion.button>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2" aria-hidden="true">
          {slides.map((slide, index) => (
            <button
              key={slide.image}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Vai alla slide ${index + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === index ? 'w-8 bg-accent' : 'w-2 bg-white/60 hover:bg-white'
              }`}
            />
          ))}
        </div>
      </motion.div>

      <motion.button
        onClick={() => scrollToSection('about')}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-accent"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="font-accent text-xs">Scorri</span>
        <ChevronDown size={24} />
      </motion.button>
    </section>
  );
}

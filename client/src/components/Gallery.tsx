import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

const galleryImages = [
  {
    id: 1,
    src: '/manus-storage/d4PFWfnec6m4_3f78bd78.jpg',
    alt: 'Torte Eleganti',
    title: 'Torte Eleganti',
    category: 'Torte',
  },
  {
    id: 2,
    src: '/manus-storage/iFNc1ncfCogr_aa22f225.jpg',
    alt: 'Dolci Raffinati',
    title: 'Dolci Raffinati',
    category: 'Mignon',
  },
  {
    id: 3,
    src: '/manus-storage/jON5HP5n6HjF_50147e0b.jpg',
    alt: 'Pasticceria Mignon',
    title: 'Pasticceria Mignon',
    category: 'Mignon',
  },
  {
    id: 4,
    src: '/manus-storage/NdWcf1bYS1Q0_d756c5a1.jpg',
    alt: 'Macarons Colorati',
    title: 'Macarons Colorati',
    category: 'Specialità',
  },
  {
    id: 5,
    src: '/manus-storage/THsaRm0JfovD_8982fb64.jpg',
    alt: 'Cupcakes Decorati',
    title: 'Cupcakes Decorati',
    category: 'Specialità',
  },
  {
    id: 6,
    src: '/manus-storage/2Wfya3GJYAjN_9888c3f1.jpg',
    alt: 'Croissant Artigianali',
    title: 'Croissant Artigianali',
    category: 'Colazione',
  },
] as const;

const categories = ['Tutti', 'Torte', 'Mignon', 'Specialità', 'Colazione'] as const;

export default function Gallery() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('Tutti');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === 'Tutti'
        ? galleryImages
        : galleryImages.filter((image) => image.category === activeCategory),
    [activeCategory],
  );

  const goToPrev = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === 0 ? filteredImages.length - 1 : prev - 1;
    });
  };

  const goToNext = () => {
    setSelectedIndex((prev) => {
      if (prev === null) return prev;
      return prev === filteredImages.length - 1 ? 0 : prev + 1;
    });
  };

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null);
      if (event.key === 'ArrowLeft') goToPrev();
      if (event.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedIndex, filteredImages.length]);

  useEffect(() => {
    setSelectedIndex(null);
  }, [activeCategory]);

  return (
    <section id="gallery" className="bg-card py-20 md:py-32">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-10 text-center"
        >
          <span className="font-accent text-sm tracking-widest text-accent">GALLERIA FOTOGRAFICA</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">Le Nostre Creazioni</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Filtra per categoria e apri il lightbox per sfogliare la galleria come un vero carousel.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`rounded-full px-5 py-2 font-accent text-xs transition-all ${
                activeCategory === category
                  ? 'bg-accent text-accent-foreground shadow-md'
                  : 'border border-accent/40 text-accent hover:bg-accent/10'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {filteredImages.map((image, index) => (
            <motion.button
              key={image.id}
              whileHover={{ y: -4, scale: 1.01 }}
              onClick={() => setSelectedIndex(index)}
              className="group relative h-80 overflow-hidden rounded-2xl border border-border shadow-lg"
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="absolute bottom-5 left-5 text-left text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <p className="font-accent text-xs tracking-wide text-white/85">{image.category}</p>
                <h3 className="font-display text-xl">{image.title}</h3>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {selectedIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 p-4 backdrop-blur-sm"
            >
              <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
                <button
                  aria-label="Chiudi galleria"
                  onClick={() => setSelectedIndex(null)}
                  className="absolute right-6 top-6 rounded-full bg-white/15 p-2 text-white hover:bg-white/30"
                >
                  <X size={20} />
                </button>

                <button
                  aria-label="Immagine precedente"
                  onClick={goToPrev}
                  className="absolute left-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 md:left-8"
                >
                  <ChevronLeft size={24} />
                </button>

                <motion.figure
                  key={filteredImages[selectedIndex].id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-white/20"
                >
                  <img
                    src={filteredImages[selectedIndex].src}
                    alt={filteredImages[selectedIndex].alt}
                    className="max-h-[75vh] w-full object-cover"
                  />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                    <p className="font-accent text-xs tracking-wide text-white/80">
                      {filteredImages[selectedIndex].category}
                    </p>
                    <h3 className="font-display text-2xl">{filteredImages[selectedIndex].title}</h3>
                  </figcaption>
                </motion.figure>

                <button
                  aria-label="Immagine successiva"
                  onClick={goToNext}
                  className="absolute right-4 rounded-full bg-white/15 p-3 text-white hover:bg-white/30 md:right-8"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

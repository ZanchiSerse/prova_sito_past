import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const galleryImages = [
  {
    id: 1,
    src: '/manus-storage/d4PFWfnec6m4_3f78bd78.jpg',
    alt: 'Torte Eleganti',
    title: 'Torte Eleganti',
  },
  {
    id: 2,
    src: '/manus-storage/iFNc1ncfCogr_aa22f225.jpg',
    alt: 'Dolci Raffinati',
    title: 'Dolci Raffinati',
  },
  {
    id: 3,
    src: '/manus-storage/jON5HP5n6HjF_50147e0b.jpg',
    alt: 'Pasticceria Mignon',
    title: 'Pasticceria Mignon',
  },
  {
    id: 4,
    src: '/manus-storage/NdWcf1bYS1Q0_d756c5a1.jpg',
    alt: 'Macarons Colorati',
    title: 'Macarons Colorati',
  },
  {
    id: 5,
    src: '/manus-storage/THsaRm0JfovD_8982fb64.jpg',
    alt: 'Cupcakes Decorati',
    title: 'Cupcakes Decorati',
  },
  {
    id: 6,
    src: '/manus-storage/2Wfya3GJYAjN_9888c3f1.jpg',
    alt: 'Croissant Artigianali',
    title: 'Croissant Artigianali',
  },
];

export default function Gallery() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="gallery" className="py-20 md:py-32 bg-card">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-sm text-accent tracking-widest">
            GALLERIA FOTOGRAFICA
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Le Nostre Creazioni
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Scopri la bellezza e l'eleganza di ogni nostro capolavoro dolciario.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryImages.map((image) => (
            <motion.div
              key={image.id}
              variants={itemVariants}
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg h-80"
              onClick={() => setSelectedImage(image.id)}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {image.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages.find((img) => img.id === selectedImage)?.src}
                alt="Gallery"
                className="w-full h-auto rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

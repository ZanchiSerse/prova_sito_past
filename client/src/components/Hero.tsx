import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const images = [
  '/manus-storage/NdWcf1bYS1Q0_d756c5a1.jpg',
  '/manus-storage/RlGA09dRUQbK_f2b290e9.jpg',
  '/manus-storage/kZHAb9DqNV5g_455734b7.jpg',
];

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
            transition: { duration: 0.8 },
    },
  };

  const scrollToProducts = () => {
    const element = document.getElementById('products');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images with Parallax */}
      <div className="absolute inset-0 z-0">
        {images.map((img, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === 0 ? 0.3 : 0 }}
            transition={{ duration: 1 }}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: 'blur(8px)',
            }}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />
      </div>

      {/* Content */}
      <motion.div
        className="container relative z-10 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="font-accent text-sm text-accent tracking-widest">
            Benvenuti a
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight"
        >
          Pasticceria da Cristian
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
        >
          L'arte del dolce artigianale a Treviolo. Ogni creazione è un capolavoro di qualità,
          cura e passione.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={scrollToProducts}
            className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-accent text-sm hover:bg-accent/90 transition-colors duration-200 transform hover:scale-105"
          >
            Scopri i Nostri Prodotti
          </button>
          <button
            onClick={() => {
              const element = document.getElementById('contact');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 border-2 border-accent text-accent rounded-lg font-accent text-sm hover:bg-accent/10 transition-colors duration-200"
          >
            Contattaci
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <button
          onClick={scrollToProducts}
          className="flex flex-col items-center gap-2 text-accent hover:text-accent/80 transition-colors"
        >
          <span className="text-sm font-accent">Scorri</span>
          <ChevronDown size={24} />
        </button>
      </motion.div>
    </section>
  );
}

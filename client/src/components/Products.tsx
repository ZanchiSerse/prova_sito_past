import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

const productCategories = [
  {
    id: 'pastries',
    name: 'Pasticcini',
    description: 'Delicati e raffinati, i nostri pasticcini sono preparati quotidianamente con ingredienti selezionati.',
    image: '/manus-storage/gODdTtBC1fvj_a4a54345.jpg',
    items: ['Macarons', 'Éclair', 'Tartellette', 'Mignon'],
  },
  {
    id: 'cakes',
    name: 'Torte Personalizzate',
    description: 'Torte su misura per ogni occasione speciale, realizzate con cura e creatività.',
    image: '/manus-storage/be1MvKfK4HsP_59f06d33.jpg',
    items: ['Torte Classiche', 'Cake Design', 'Wedding Cake', 'Torte Tematiche'],
  },
  {
    id: 'savory',
    name: 'Salatini e Pizzette',
    description: 'Stuzzicanti e gustosi, perfetti per aperitivi e buffet di ogni tipo.',
    image: '/manus-storage/NcJqsTQSfl90_ffe2f4be.jpg',
    items: ['Pizzette', 'Salatini', 'Focaccia', 'Pane Artigianale'],
  },
];

export default function Products() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const [selectedCategory, setSelectedCategory] = useState(0);

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="products" className="py-20 md:py-32 bg-background">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-sm text-accent tracking-widest">
            I NOSTRI PRODOTTI
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Scopri le Nostre Creazioni
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Ogni categoria rappresenta il nostro impegno verso l'eccellenza e la qualità artigianale.
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {productCategories.map((category, index) => (
            <motion.button
              key={category.id}
              variants={itemVariants}
              onClick={() => setSelectedCategory(index)}
              className={`px-6 py-2 rounded-lg font-accent text-sm transition-all duration-300 ${
                selectedCategory === index
                  ? 'bg-accent text-accent-foreground shadow-lg'
                  : 'border-2 border-accent text-accent hover:bg-accent/10'
              }`}
            >
              {category.name}
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Category Content */}
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <div className="relative overflow-hidden rounded-lg shadow-xl h-96">
            <img
              src={productCategories[selectedCategory].image}
              alt={productCategories[selectedCategory].name}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
          </div>

          {/* Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants}>
              <h3 className="font-display text-4xl font-bold text-foreground">
                {productCategories[selectedCategory].name}
              </h3>
              <p className="text-lg text-muted-foreground mt-4">
                {productCategories[selectedCategory].description}
              </p>
            </motion.div>

            {/* Items List */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4"
            >
              {productCategories[selectedCategory].items.map((item, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg border border-border hover:border-accent transition-colors duration-300"
                >
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-foreground">{item}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              variants={itemVariants}
              className="px-8 py-3 bg-accent text-accent-foreground rounded-lg font-accent text-sm hover:bg-accent/90 transition-colors duration-200 transform hover:scale-105"
            >
              Richiedi Informazioni
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

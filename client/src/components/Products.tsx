import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

const productCategories = [
  {
    id: 'pastries',
    name: 'Pasticcini',
    description:
      'Delicati e raffinati, i nostri pasticcini sono preparati quotidianamente con ingredienti selezionati.',
    image: '/manus-storage/gODdTtBC1fvj_a4a54345.jpg',
    highlights: [
      {
        name: 'Assortito Mignon',
        description: 'Selezione giornaliera di mignon classici e moderni.',
        price: '€12,00',
        badge: 'Bestseller',
        image: '/manus-storage/jON5HP5n6HjF_50147e0b.jpg',
      },
      {
        name: 'Macaron Selection',
        description: 'Gusci leggeri e ripieni golosi in gusti stagionali.',
        price: '€2,20',
        badge: 'Nuovo',
        image: '/manus-storage/NdWcf1bYS1Q0_d756c5a1.jpg',
      },
    ],
  },
  {
    id: 'cakes',
    name: 'Torte Personalizzate',
    description:
      'Torte su misura per ogni occasione speciale, realizzate con cura e creatività artigianale.',
    image: '/manus-storage/be1MvKfK4HsP_59f06d33.jpg',
    highlights: [
      {
        name: 'Torta Signature',
        description: 'Pan di Spagna leggero, crema diplomatica e frutta fresca.',
        price: '€34,00',
        badge: 'Bestseller',
        image: '/manus-storage/d4PFWfnec6m4_3f78bd78.jpg',
      },
      {
        name: 'Wedding Cake',
        description: 'Design personalizzato su più piani con degustazione inclusa.',
        price: '€120,00',
        badge: 'Premium',
        image: '/manus-storage/iFNc1ncfCogr_aa22f225.jpg',
      },
    ],
  },
  {
    id: 'savory',
    name: 'Salatini e Pizzette',
    description:
      'Stuzzicanti e gustosi, perfetti per aperitivi, eventi aziendali e buffet di ogni tipo.',
    image: '/manus-storage/NcJqsTQSfl90_ffe2f4be.jpg',
    highlights: [
      {
        name: 'Box Aperitivo',
        description: 'Mini pizzette, salatini e focaccine in formato evento.',
        price: '€18,00',
        badge: 'Nuovo',
        image: '/manus-storage/2Wfya3GJYAjN_9888c3f1.jpg',
      },
      {
        name: 'Focaccia Gourmet',
        description: 'Lievitazione lenta, topping stagionali e ingredienti locali.',
        price: '€3,90',
        badge: 'Bestseller',
        image: '/manus-storage/THsaRm0JfovD_8982fb64.jpg',
      },
    ],
  },
] as const;

export default function Products() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState<
    (typeof productCategories)[number]['id']
  >(productCategories[0].id);

  const activeCategory = useMemo(
    () => productCategories.find((category) => category.id === selectedCategory) ?? productCategories[0],
    [selectedCategory],
  );

  return (
    <section id="products" className="bg-background py-20 md:py-32">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="font-accent text-sm tracking-widest text-accent">I NOSTRI PRODOTTI</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">
            Scopri le Nostre Creazioni
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Ricette artigianali, ingredienti selezionati e prezzi trasparenti per ogni dolce momento.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-10 flex flex-wrap justify-center gap-3"
        >
          {productCategories.map((category) => {
            const isActive = selectedCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`rounded-full px-6 py-2 font-accent text-xs transition-all duration-300 ${
                  isActive
                    ? 'bg-accent text-accent-foreground shadow-lg shadow-accent/30'
                    : 'border border-accent/40 text-accent hover:bg-accent/10'
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </motion.div>

        <motion.div
          key={activeCategory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr]"
        >
          <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-lg">
            <div className="relative h-72 overflow-hidden md:h-96">
              <img
                src={activeCategory.image}
                alt={activeCategory.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 max-w-lg">
                <h3 className="font-display text-3xl font-bold text-white md:text-4xl">{activeCategory.name}</h3>
                <p className="mt-2 text-white/90">{activeCategory.description}</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-1">
            {activeCategory.highlights.map((product) => (
              <ProductCard key={product.name} {...product} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-12 text-center"
        >
          <button className="rounded-xl bg-accent px-8 py-3 font-accent text-sm text-accent-foreground shadow-lg shadow-accent/25 transition-transform duration-300 hover:-translate-y-0.5">
            Richiedi Informazioni
          </button>
        </motion.div>
      </div>
    </section>
  );
}

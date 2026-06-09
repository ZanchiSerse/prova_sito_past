import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <section id="about" className="py-20 md:py-32 bg-card">
      <div className="container" ref={ref}>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-lg shadow-xl">
              <img
                src="/manus-storage/huH4PGJuZvZ3_5da9ceb3.jpg"
                alt="Pasticceria da Cristian"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div variants={containerVariants} className="space-y-6">
            <motion.div variants={itemVariants}>
              <span className="font-accent text-sm text-accent tracking-widest">
                LA NOSTRA STORIA
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
                Chi Siamo
              </h2>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              La Pasticceria da Cristian è nata dalla passione per l'arte dolciaria artigianale.
              Situata nel cuore di Treviolo, la nostra pasticceria rappresenta il perfetto equilibrio
              tra tradizione e innovazione.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              Ogni giorno, con dedizione e maestria, creiamo dolci che raccontano storie di qualità,
              cura nei dettagli e amore per il nostro mestiere. Utilizziamo solo ingredienti
              selezionati e ricette collaudate nel tempo.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-4"
            >
              {[
                { number: '20+', label: 'Anni di Esperienza' },
                { number: '100%', label: 'Artigianale' },
                { number: '∞', label: 'Passione' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-display text-3xl font-bold text-accent">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

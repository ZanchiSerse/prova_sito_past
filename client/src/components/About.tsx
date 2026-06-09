import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CounterAnimation from './CounterAnimation';

const timelineEvents = [
  {
    year: '1990',
    title: 'Le origini',
    description: 'Cristian apre il laboratorio con ricette tradizionali tramandate in famiglia.',
  },
  {
    year: '2005',
    title: 'Nuove specialità',
    description: 'Entrano in assortimento torte moderne e proposte salate per eventi.',
  },
  {
    year: '2018',
    title: 'Pasticceria su misura',
    description: 'Nasce il servizio personalizzato per wedding cake e celebrazioni.',
  },
  {
    year: 'Oggi',
    title: 'Qualità quotidiana',
    description: 'Ogni giorno prepariamo prodotti freschi, artigianali e stagionali.',
  },
];

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section id="about" className="bg-card py-20 md:py-32">
      <div className="container" ref={ref}>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div>
              <span className="font-accent text-sm tracking-widest text-accent">LA NOSTRA STORIA</span>
              <h2 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">Chi Siamo</h2>
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              La Pasticceria da Cristian nasce dalla passione per l'arte dolciaria artigianale e cresce con
              il desiderio di offrire prodotti autentici, curati in ogni dettaglio.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Tradizione e innovazione convivono nel nostro laboratorio: tecniche classiche, materie prime
              selezionate e creatività al servizio di ogni cliente.
            </p>

            <div className="grid gap-3 sm:grid-cols-3">
              <CounterAnimation value={35} suffix="+" label="Anni di Esperienza" />
              <CounterAnimation value={100} suffix="%" label="Produzione Artigianale" />
              <CounterAnimation value={5000} suffix="+" label="Clienti Soddisfatti" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6"
          >
            <div className="relative overflow-hidden rounded-3xl border border-border shadow-xl">
              <img
                src="/manus-storage/huH4PGJuZvZ3_5da9ceb3.jpg"
                alt="Laboratorio Pasticceria da Cristian"
                loading="lazy"
                className="h-80 w-full object-cover md:h-[28rem]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              <p className="absolute bottom-5 left-5 rounded-full bg-background/80 px-4 py-2 font-accent text-xs text-accent backdrop-blur-sm">
                Maestria artigianale, ogni giorno
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-6">
              <h3 className="font-display text-2xl text-foreground">Timeline</h3>
              <div className="mt-6 space-y-5">
                {timelineEvents.map((event, index) => (
                  <div key={event.title} className="relative pl-8">
                    {index < timelineEvents.length - 1 && (
                      <div className="absolute left-2 top-2 h-full w-px bg-border" />
                    )}
                    <div className="absolute left-0 top-1.5 h-4 w-4 rounded-full border-4 border-background bg-accent" />
                    <p className="font-accent text-xs text-accent">{event.year}</p>
                    <h4 className="mt-1 font-display text-xl text-foreground">{event.title}</h4>
                    <p className="mt-1 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

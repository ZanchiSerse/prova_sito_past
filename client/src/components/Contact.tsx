import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { MapView } from './Map';

export default function Contact() {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Indirizzo',
      content: 'Piazza Don Personeni 12, 24048 Treviolo (BG)',
      link: 'https://maps.google.com/?q=Piazza+Don+Personeni+12+Treviolo+BG',
    },
    {
      icon: Phone,
      title: 'Telefono',
      content: '+39 035 693 275',
      link: 'tel:+39035693275',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'pasticceriadacristian@gmail.com',
      link: 'mailto:pasticceriadacristian@gmail.com',
    },
    {
      icon: Clock,
      title: 'Orari',
      content: 'Lun-Sab: 7:00-19:30 | Dom: 8:00-13:00',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 md:py-32 bg-background">
      <div className="container" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-accent text-sm text-accent tracking-widest">
            CONTATTI
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mt-2">
            Vieni a Trovarci
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4">
            Siamo a Treviolo, pronti a servirti con dedizione e qualità.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            className="space-y-6"
          >
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.a
                  key={index}
                  variants={itemVariants}
                  href={info.link || '#'}
                  target={info.link?.startsWith('http') ? '_blank' : undefined}
                  rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`flex gap-4 p-6 bg-card rounded-lg border border-border hover:border-accent transition-all duration-300 ${
                    info.link ? 'cursor-pointer hover:shadow-lg' : ''
                  }`}
                >
                  <div className="flex-shrink-0">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-accent text-sm text-accent tracking-widest">
                      {info.title}
                    </h3>
                    <p className="text-foreground mt-1">{info.content}</p>
                  </div>
                </motion.a>
              );
            })}

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="pt-6 border-t border-border"
            >
              <h3 className="font-accent text-sm text-accent tracking-widest mb-4">
                SEGUICI
              </h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/pasticceriadacristian_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors duration-200 transform hover:scale-110"
                  aria-label="Instagram"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/p/Pasticceria-da-Cristian-100049553242142/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-accent text-accent-foreground rounded-full flex items-center justify-center hover:bg-accent/90 transition-colors duration-200 transform hover:scale-110"
                  aria-label="Facebook"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6 }}
            className="rounded-lg overflow-hidden shadow-xl h-96 md:h-full min-h-96"
          >
            <MapView
              initialCenter={{ lat: 45.6517, lng: 9.6117 }}
              initialZoom={15}
              className="w-full h-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

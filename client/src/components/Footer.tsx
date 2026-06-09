import { motion } from 'framer-motion';

export default function Footer() {
  const currentYear = new Date().getFullYear();

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
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  };

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12 md:py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8 mb-8"
        >
          {/* Brand */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h3 className="font-display text-2xl font-bold">
              Pasticceria da Cristian
            </h3>
            <p className="text-accent-foreground/80">
              L'arte del dolce artigianale a Treviolo, dal 1990.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-accent text-sm tracking-widest font-semibold">
              LINK VELOCI
            </h4>
            <nav className="space-y-2">
              {[
                { label: 'Home', id: 'home' },
                { label: 'Chi Siamo', id: 'about' },
                { label: 'Prodotti', id: 'products' },
                { label: 'Galleria', id: 'gallery' },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    const element = document.getElementById(link.id);
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="block text-accent-foreground/80 hover:text-accent-foreground transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants} className="space-y-4">
            <h4 className="font-accent text-sm tracking-widest font-semibold">
              SEGUICI
            </h4>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/pasticceriadacristian_/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-accent-foreground/20 hover:bg-accent-foreground/40 rounded-full flex items-center justify-center transition-colors duration-200 transform hover:scale-110"
                aria-label="Instagram"
              >
                <svg
                  className="w-5 h-5"
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
                className="w-10 h-10 bg-accent-foreground/20 hover:bg-accent-foreground/40 rounded-full flex items-center justify-center transition-colors duration-200 transform hover:scale-110"
                aria-label="Facebook"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          className="border-t border-accent-foreground/20 pt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-accent-foreground/80 text-sm">
            <p>
              © {currentYear} Pasticceria da Cristian. Tutti i diritti riservati.
            </p>
            <div className="flex gap-6">
              <a
                href="mailto:pasticceriadacristian@gmail.com"
                className="hover:text-accent-foreground transition-colors duration-200"
              >
                Contattaci
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

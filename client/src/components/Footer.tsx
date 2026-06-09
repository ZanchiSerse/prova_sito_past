import { motion } from 'framer-motion';
import { Clock3, Mail, MapPin, Phone } from 'lucide-react';
import { FormEvent, useState } from 'react';

const quickLinks = [
  { label: 'Home', id: 'home' },
  { label: 'Chi Siamo', id: 'about' },
  { label: 'Prodotti', id: 'products' },
  { label: 'Galleria', id: 'gallery' },
  { label: 'Contatti', id: 'contact' },
];

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/pasticceriadacristian_/',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/p/Pasticceria-da-Cristian-100049553242142/',
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterMessage, setNewsletterMessage] = useState('');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNewsletterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newsletterEmail);

    if (!validEmail) {
      setNewsletterMessage('Inserisci una email valida.');
      return;
    }

    setNewsletterMessage('Grazie! Sei iscritto alla newsletter.');
    setNewsletterEmail('');
  };

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-4">
          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h3 className="font-display text-2xl font-bold">Pasticceria da Cristian</h3>
            <p className="mt-3 text-sm text-accent-foreground/85">
              L'arte del dolce artigianale a Treviolo, con passione e qualità dal 1990.
            </p>
            <div className="mt-4 space-y-2 text-sm text-accent-foreground/90">
              <p className="flex items-center gap-2"><MapPin size={15} /> Piazza Don Personeni 12, Treviolo</p>
              <p className="flex items-center gap-2"><Phone size={15} /> +39 035 693 275</p>
              <p className="flex items-center gap-2"><Mail size={15} /> pasticceriadacristian@gmail.com</p>
              <p className="flex items-center gap-2"><Clock3 size={15} /> Lun-Sab 7:00-19:30 | Dom 8:00-13:00</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h4 className="font-accent text-sm font-semibold tracking-widest">LINK VELOCI</h4>
            <nav className="mt-3 space-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block text-sm text-accent-foreground/85 transition-colors hover:text-accent-foreground"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h4 className="font-accent text-sm font-semibold tracking-widest">SOCIAL</h4>
            <div className="mt-3 flex flex-wrap gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-accent-foreground/30 px-4 py-2 text-sm transition-all hover:bg-accent-foreground/15"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h4 className="font-accent text-sm font-semibold tracking-widest">NEWSLETTER</h4>
            <p className="mt-3 text-sm text-accent-foreground/85">
              Ricevi novità su specialità stagionali e promozioni.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-4 space-y-3">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  if (newsletterMessage) setNewsletterMessage('');
                }}
                placeholder="La tua email"
                className="w-full rounded-lg border border-accent-foreground/30 bg-accent-foreground/10 px-3 py-2 text-sm text-accent-foreground placeholder:text-accent-foreground/70 focus:outline-none focus:ring-2 focus:ring-accent-foreground/60"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-accent-foreground px-3 py-2 font-accent text-xs text-accent transition-colors hover:bg-accent-foreground/90"
              >
                Iscriviti Ora
              </button>
              {newsletterMessage && <p className="text-xs text-accent-foreground/90">{newsletterMessage}</p>}
            </form>
          </motion.div>
        </div>

        <div className="mt-10 border-t border-accent-foreground/20 pt-6 text-sm text-accent-foreground/85">
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} Pasticceria da Cristian. Tutti i diritti riservati.</p>
            <a href="mailto:pasticceriadacristian@gmail.com" className="hover:text-accent-foreground">
              Contattaci
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

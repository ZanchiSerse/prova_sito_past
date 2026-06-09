import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

const navItems = [
  { label: 'Home', id: 'home' },
  { label: 'Chi Siamo', id: 'about' },
  { label: 'Prodotti', id: 'products' },
  { label: 'Galleria', id: 'gallery' },
  { label: 'Contatti', id: 'contact' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollY } = useScroll();
  const navY = useTransform(scrollY, [0, 400], [0, 12]);

  const sectionIds = useMemo(() => navItems.map((item) => item.id), []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visibleEntries[0]) {
          setActiveSection(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-40% 0px -45% 0px',
        threshold: [0.2, 0.35, 0.5, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [sectionIds]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setActiveSection(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      style={{ y: navY }}
      className="fixed inset-x-0 top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: 'easeOut' }}
    >
      <div
        className={`mx-auto mt-2 max-w-[1320px] transition-all duration-500 md:mt-4 ${
          isScrolled
            ? 'rounded-2xl border border-border/70 bg-background/85 px-2 shadow-xl backdrop-blur-xl'
            : 'bg-transparent px-0'
        }`}
      >
        <div className="container flex items-center justify-between py-3 md:py-4">
          <motion.button
            onClick={() => scrollToSection('home')}
            className="font-display text-2xl font-bold text-accent"
            whileHover={{ scale: 1.03 }}
          >
            Cristian
          </motion.button>

          <div className="hidden items-center gap-2 rounded-full bg-card/70 p-2 md:flex">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`relative rounded-full px-4 py-2 font-accent text-xs transition-colors duration-300 ${
                    isActive ? 'text-accent' : 'text-foreground hover:text-accent'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 -z-10 rounded-full bg-accent/15"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                    />
                  )}
                  {item.label}
                </button>
              );
            })}
          </div>

          <button
            className="rounded-full border border-border bg-card/80 p-2 shadow-sm md:hidden"
            onClick={() => setIsOpen((value) => !value)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 bg-black/35 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="relative z-50 mx-4 mt-2 rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur-xl md:hidden"
            >
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      aria-current={isActive ? 'page' : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-3 text-left font-accent text-xs transition-all duration-300 ${
                        isActive
                          ? 'bg-accent/15 text-accent'
                          : 'bg-card/80 text-foreground hover:bg-accent/10 hover:text-accent'
                      }`}
                    >
                      {item.label}
                      <span
                        className={`h-2 w-2 rounded-full transition-colors ${
                          isActive ? 'bg-accent' : 'bg-border'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

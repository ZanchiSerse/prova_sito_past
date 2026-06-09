import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Clock, Mail, MapPin, Phone, Send, ShieldCheck } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useInView } from 'react-intersection-observer';
import { z } from 'zod';
import { MapView } from './Map';

const contactSchema = z.object({
  name: z.string().min(2, 'Inserisci il tuo nome'),
  email: z.string().email('Inserisci una email valida'),
  phone: z.string().min(8, 'Inserisci un numero valido'),
  message: z.string().min(10, 'Il messaggio deve contenere almeno 10 caratteri'),
});

type ContactFormData = z.infer<typeof contactSchema>;

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

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  });

  const onSubmit = async (_data: ContactFormData) => {
    // TODO: sostituire questa simulazione con submit verso API quando disponibile.
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSubmitted(true);
    reset();
  };

  return (
    <section id="contact" className="bg-background py-20 md:py-32">
      <div className="container" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <span className="font-accent text-sm tracking-widest text-accent">CONTATTI</span>
          <h2 className="mt-2 font-display text-4xl font-bold text-foreground md:text-5xl">Vieni a Trovarci</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Compila il form per prenotare una torta su misura o richiedere informazioni sui nostri prodotti.
          </p>
        </motion.div>

        <div className="grid items-start gap-10 xl:grid-cols-[1fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {contactInfo.map((info) => {
              const Icon = info.icon;
              const Wrapper = info.link ? 'a' : 'div';

              return (
                <Wrapper
                  key={info.title}
                  {...(info.link
                    ? {
                        href: info.link,
                        target: info.link.startsWith('http') ? '_blank' : undefined,
                        rel: info.link.startsWith('http') ? 'noopener noreferrer' : undefined,
                      }
                    : {})}
                  className={`flex gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 ${
                    info.link ? 'hover:-translate-y-0.5 hover:border-accent hover:shadow-md' : ''
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-accent text-xs tracking-widest text-accent">{info.title}</p>
                    <p className="mt-1 text-foreground">{info.content}</p>
                  </div>
                </Wrapper>
              );
            })}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="text-sm text-foreground">
                    Nome
                  </label>
                  <input
                    id="contact-name"
                    {...register('name')}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
                    placeholder="Mario Rossi"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-phone" className="text-sm text-foreground">
                    Telefono
                  </label>
                  <input
                    id="contact-phone"
                    {...register('phone')}
                    className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
                    placeholder="+39 ..."
                  />
                  {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="text-sm text-foreground">
                  Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  {...register('email')}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
                  placeholder="nome@email.it"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
              </div>

              <div>
                <label htmlFor="contact-message" className="text-sm text-foreground">
                  Messaggio
                </label>
                <textarea
                  id="contact-message"
                  {...register('message')}
                  rows={4}
                  className="mt-1 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none ring-accent/30 focus:ring-2"
                  placeholder="Raccontaci la tua richiesta..."
                />
                {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 font-accent text-xs text-accent-foreground disabled:opacity-70"
              >
                <Send size={15} />
                {isSubmitting ? 'Invio in corso...' : 'Invia richiesta'}
              </button>

              {submitted && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700">
                  <ShieldCheck size={16} />
                  Messaggio inviato! Ti risponderemo al più presto.
                </div>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
          >
            <div className="relative h-96 md:h-[36rem]">
              <MapView
                initialCenter={{ lat: 45.6517, lng: 9.6117 }}
                initialZoom={15}
                className="h-full w-full"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-4 shadow-lg backdrop-blur-sm">
                <p className="font-accent text-xs tracking-widest text-accent">COME RAGGIUNGERCI</p>
                <p className="mt-1 text-sm text-foreground">Parcheggio comodo in zona e fermata bus a pochi minuti.</p>
                <a
                  href="https://maps.google.com/?q=Piazza+Don+Personeni+12+Treviolo+BG"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-block text-sm font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Apri indicazioni su Google Maps
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  image: string;
  badge?: string;
}

export default function ProductCard({
  name,
  description,
  price,
  image,
  badge,
}: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-sm hover:shadow-xl"
    >
      <div className="relative h-44 overflow-hidden">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute left-3 top-3 rounded-full bg-accent px-3 py-1 font-accent text-[10px] text-accent-foreground shadow-md">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-display text-xl text-foreground">{name}</h4>
          <span className="rounded-lg bg-accent/10 px-2 py-1 font-accent text-xs text-accent">
            da {price}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </motion.article>
  );
}

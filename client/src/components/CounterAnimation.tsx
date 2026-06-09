import { animate, motion, useInView, useMotionValue } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface CounterAnimationProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
}

const COUNTER_IN_VIEW_AMOUNT = 0.5;

export default function CounterAnimation({
  value,
  label,
  suffix = '',
  duration = 1.8,
}: CounterAnimationProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: COUNTER_IN_VIEW_AMOUNT });
  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(motionValue, value, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });

    return () => controls.stop();
  }, [duration, isInView, motionValue, value]);

  return (
    <div ref={ref} className="rounded-xl border border-border bg-background/80 p-4 text-center shadow-sm">
      <motion.div
        className="font-display text-3xl font-bold text-accent md:text-4xl"
        aria-live="polite"
      >
        {displayValue}
        {suffix}
      </motion.div>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

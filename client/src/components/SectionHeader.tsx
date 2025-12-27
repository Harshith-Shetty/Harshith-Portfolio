import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export function SectionHeader({ title, subtitle, className = "" }: SectionHeaderProps) {
  return (
    <div className={`mb-12 md:mb-20 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">
          {subtitle}
        </span>
        <h2 className="text-3xl md:text-5xl font-display font-bold">
          {title}
        </h2>
        <div className="h-1 w-20 bg-primary mt-6 rounded-full" />
      </motion.div>
    </div>
  );
}

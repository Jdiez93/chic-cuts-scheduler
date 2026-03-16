import { motion } from "framer-motion";
import { Scissors, Paintbrush, Sparkles, Wind, Droplets, Crown } from "lucide-react";

const services = [
  {
    icon: Scissors,
    name: "Corte Clásico",
    description: "Corte personalizado adaptado a tu estilo y tipo de cabello.",
    price: "25€",
    duration: "30 min",
  },
  {
    icon: Paintbrush,
    name: "Coloración",
    description: "Técnicas de color avanzadas: balayage, mechas y tinte completo.",
    price: "45€",
    duration: "30 min",
  },
  {
    icon: Sparkles,
    name: "Tratamiento Capilar",
    description: "Hidratación profunda y reparación con productos premium.",
    price: "35€",
    duration: "30 min",
  },
  {
    icon: Wind,
    name: "Peinado & Styling",
    description: "Secado profesional y peinado para cualquier ocasión.",
    price: "20€",
    duration: "30 min",
  },
  {
    icon: Droplets,
    name: "Barba & Afeitado",
    description: "Perfilado de barba y afeitado tradicional con toalla caliente.",
    price: "15€",
    duration: "30 min",
  },
  {
    icon: Crown,
    name: "Experiencia Premium",
    description: "Sesión completa: corte, tratamiento, styling y masaje capilar.",
    price: "65€",
    duration: "30 min",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Nuestros servicios
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight">
            Lo que ofrecemos
          </h2>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border"
        >
          {services.map((s) => (
            <motion.div
              key={s.name}
              variants={item}
              className="bg-background p-8 flex flex-col gap-4 group hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <s.icon size={22} className="text-accent" strokeWidth={1.5} />
                <span className="font-body text-xs text-muted-foreground tracking-wide">
                  {s.duration}
                </span>
              </div>
              <h3 className="font-display text-xl font-medium">{s.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed flex-1">
                {s.description}
              </p>
              <p className="font-display text-2xl font-semibold text-accent">
                {s.price}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;

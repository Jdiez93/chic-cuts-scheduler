import { motion } from "framer-motion";
import { Scissors, Sparkles, Wind, Droplets, Crown, Zap } from "lucide-react";
import toolsImage from "@/assets/tools-barber.jpg";

const services = [
  {
    icon: Scissors,
    name: "Corte Degradado",
    description: "Fade, taper o skin fade con precisión milimétrica. Incluye lavado y styling.",
    price: "18€",
    duration: "30 min",
  },
  {
    icon: Zap,
    name: "Corte + Diseño",
    description: "Corte personalizado con diseños geométricos o líneas en el cabello.",
    price: "25€",
    duration: "30 min",
  },
  {
    icon: Droplets,
    name: "Afeitado Clásico",
    description: "Afeitado a navaja con toalla caliente, aceites y bálsamo premium.",
    price: "15€",
    duration: "30 min",
  },
  {
    icon: Wind,
    name: "Barba Completa",
    description: "Perfilado, recorte y tratamiento de barba con productos especializados.",
    price: "12€",
    duration: "30 min",
  },
  {
    icon: Sparkles,
    name: "Tratamiento Capilar",
    description: "Tratamiento de keratina, hidratación profunda o anticaída para hombres.",
    price: "30€",
    duration: "30 min",
  },
  {
    icon: Crown,
    name: "Experiencia VIP",
    description: "Corte + barba + afeitado + tratamiento facial. La experiencia completa.",
    price: "55€",
    duration: "30 min",
  },
];

const ServicesSection = () => {
  return (
    <section id="servicios" className="section-padding relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="h-[2px] bg-primary mb-6"
            />
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
              Nuestros servicios
            </p>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Precisión en cada{" "}
              <span className="italic font-normal text-primary">detalle</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="overflow-hidden"
          >
            <img
              src={toolsImage}
              alt="Herramientas de barbero profesional"
              className="w-full h-48 object-cover"
            />
          </motion.div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[1px] bg-border">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-background p-8 lg:p-10 group hover:bg-card transition-colors duration-500 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500" />

              <div className="flex items-center justify-between mb-6">
                <s.icon
                  size={24}
                  className="text-primary opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                  strokeWidth={1.2}
                />
                <span className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  {s.duration}
                </span>
              </div>

              <h3 className="font-display text-xl font-semibold mb-3">{s.name}</h3>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                {s.description}
              </p>
              <p className="font-display text-3xl font-bold text-primary">
                {s.price}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

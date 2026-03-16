import { motion } from "framer-motion";
import heroImage from "@/assets/hero-salon.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center pt-16">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-6 lg:px-12 py-16">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-6">
            Estudio de belleza premium
          </p>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold leading-[1.1] tracking-tight mb-6">
            El arte de
            <br />
            cuidar tu
            <br />
            <span className="italic text-accent">imagen</span>
          </h1>
          <p className="font-body text-muted-foreground max-w-md mb-10 leading-relaxed">
            Donde cada detalle importa. Descubre un espacio diseñado para
            realzar tu estilo con técnicas contemporáneas y un trato
            personalizado.
          </p>
          <div className="flex gap-4">
            <a
              href="#reservar"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-body text-sm tracking-wide hover:opacity-90 transition-opacity"
            >
              Reservar cita
            </a>
            <a
              href="#servicios"
              className="inline-flex items-center justify-center px-8 py-3 border border-border text-foreground font-body text-sm tracking-wide hover:bg-secondary transition-colors"
            >
              Ver servicios
            </a>
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative"
        >
          <img
            src={heroImage}
            alt="Interior de salón de belleza premium Aura Studio"
            className="w-full h-[500px] lg:h-[600px] object-cover"
          />
          <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-sm px-5 py-3 border border-border">
            <p className="font-body text-xs text-muted-foreground tracking-wide">
              Más de <span className="text-foreground font-medium">500+</span> clientes satisfechos
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

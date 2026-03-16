import { motion } from "framer-motion";
import heroImage from "@/assets/hero-barber.jpg";

const HeroSection = () => {
  return (
    <section id="inicio" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <motion.div
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src={heroImage}
          alt="Interior de barbería premium Aura"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 lg:px-12 py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="max-w-2xl"
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-[2px] bg-primary mb-8"
          />

          <p className="font-body text-xs tracking-[0.4em] uppercase text-primary mb-6">
            Barbería exclusiva para hombres
          </p>

          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            Estilo
            <br />
            <span className="italic font-normal text-primary">sin</span>
            {" "}límites
          </h1>

          <p className="font-body text-muted-foreground max-w-md mb-12 leading-relaxed text-lg">
            La barbería donde cada corte es una declaración. Precisión,
            estilo y una experiencia pensada para el hombre moderno.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#reservar"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-10 py-4 bg-primary text-primary-foreground font-body text-sm tracking-[0.15em] uppercase font-medium hover:brightness-110 transition-all"
            >
              Reservar cita
            </motion.a>
            <motion.a
              href="#servicios"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center px-10 py-4 border border-primary/30 text-foreground font-body text-sm tracking-[0.15em] uppercase hover:border-primary hover:text-primary transition-all"
            >
              Nuestros servicios
            </motion.a>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-20 flex gap-12 border-t border-border/50 pt-8"
        >
          {[
            { value: "7+", label: "Años de experiencia" },
            { value: "3.2K", label: "Clientes satisfechos" },
            { value: "5★", label: "Valoración media" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-bold text-primary">{stat.value}</p>
              <p className="font-body text-xs text-muted-foreground tracking-wide mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

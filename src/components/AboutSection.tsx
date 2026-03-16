import { motion } from "framer-motion";
import aboutImage from "@/assets/about-barber.jpg";
import { Phone, MapPin, Clock, Award } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <img
            src={aboutImage}
            alt="Barbero profesional realizando un fade"
            className="w-full h-[500px] object-cover"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6"
          >
            <Award size={28} strokeWidth={1.2} className="mb-2" />
            <p className="font-display text-2xl font-bold">7+</p>
            <p className="font-body text-xs tracking-wider uppercase">Años de experiencia</p>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-primary mb-6"
          />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Sobre nosotros
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Donde la{" "}
            <span className="italic font-normal text-primary">tradición</span>
            {" "}se encuentra con el estilo
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            Aura nació en 2018 con una misión clara: crear un espacio donde el
            hombre moderno pueda cuidar su imagen con la máxima calidad. Nuestro
            equipo de barberos profesionales combina técnicas clásicas con las
            últimas tendencias.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            Cada detalle de nuestro espacio — desde los sillones de cuero
            hasta los productos premium que utilizamos — está pensado para que
            tu experiencia sea única.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { icon: MapPin, title: "Dirección", text: "Calle Gran Vía 42, 28013 Madrid" },
              { icon: Phone, title: "Teléfono", text: "+34 912 345 678" },
              { icon: Clock, title: "Horario", text: "Lun – Sáb: 9:00 – 20:00" },
              { icon: Award, title: "Especialidad", text: "Cortes degradados & barba" },
            ].map(({ icon: Icon, title, text }) => (
              <motion.div
                key={title}
                whileHover={{ x: 4 }}
                className="flex items-start gap-4 group"
              >
                <div className="p-2 border border-border group-hover:border-primary transition-colors duration-300">
                  <Icon size={16} className="text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-body text-sm font-medium">{title}</p>
                  <p className="font-body text-sm text-muted-foreground">{text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

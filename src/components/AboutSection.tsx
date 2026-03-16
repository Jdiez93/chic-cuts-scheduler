import { motion } from "framer-motion";
import aboutImage from "@/assets/about-salon.jpg";
import { Phone, MapPin, Clock } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="nosotros" className="section-padding">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={aboutImage}
            alt="Estilista profesional trabajando en el salón Aura"
            className="w-full h-[450px] object-cover"
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Sobre nosotros
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-6">
            Más que una peluquería
          </h2>
          <p className="font-body text-muted-foreground leading-relaxed mb-4">
            En Aura Studio creemos que el cuidado personal es una forma de
            arte. Desde 2018, nuestro equipo de estilistas profesionales
            trabaja con las últimas tendencias y productos de alta gama para
            ofrecerte una experiencia única.
          </p>
          <p className="font-body text-muted-foreground leading-relaxed mb-10">
            Nuestro espacio ha sido diseñado para que te sientas en un
            ambiente relajado y exclusivo desde el momento en que cruzas la
            puerta.
          </p>

          <div className="flex flex-col gap-5">
            <div className="flex items-start gap-4">
              <MapPin size={18} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-sm font-medium">Dirección</p>
                <p className="font-body text-sm text-muted-foreground">
                  Calle Gran Vía 42, 28013 Madrid
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone size={18} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-sm font-medium">Teléfono</p>
                <p className="font-body text-sm text-muted-foreground">
                  +34 912 345 678
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Clock size={18} className="text-accent mt-0.5 shrink-0" strokeWidth={1.5} />
              <div>
                <p className="font-body text-sm font-medium">Horario</p>
                <p className="font-body text-sm text-muted-foreground">
                  Lunes a Sábado: 9:00 – 20:00
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

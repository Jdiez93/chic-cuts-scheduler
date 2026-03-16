import { motion } from "framer-motion";

const ContactSection = () => {
  return (
    <section id="contacto" className="section-padding bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Encuéntranos
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            Ven a visitarnos
          </h2>
          <p className="font-body text-muted-foreground max-w-lg">
            Estamos en pleno centro de Madrid. Ven a conocernos sin compromiso
            o reserva tu cita directamente.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[400px] border border-border overflow-hidden"
        >
          <iframe
            title="Ubicación de Aura Studio en Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.223073!2d-3.7037902!3d40.4200736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd42287d0b118c75%3A0x4a09e2a7d70fbf45!2sGran%20V%C3%ADa%2C%2042%2C%2028013%20Madrid!5e0!3m2!1ses!2ses!4v1700000000000!5m2!1ses!2ses"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%) contrast(1.1)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

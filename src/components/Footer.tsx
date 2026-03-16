import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-14 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="font-display text-2xl font-bold tracking-tight">
              AURA<span className="text-primary">.</span>
            </p>
            <p className="font-body text-xs text-muted-foreground mt-2">
              Barbería exclusiva para hombres · Madrid
            </p>
          </motion.div>

          <div className="flex gap-8">
            {["Inicio", "Servicios", "Reservar", "Nosotros", "Contacto"].map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="font-body text-xs text-muted-foreground hover:text-primary transition-colors duration-300 tracking-wider uppercase"
              >
                {l}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body text-[11px] text-muted-foreground">
            © 2024 Aura Barbershop. Proyecto de portfolio — todos los datos son ficticios.
          </p>
          <p className="font-body text-[11px] text-muted-foreground">
            Diseñado con pasión en Madrid 🇪🇸
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

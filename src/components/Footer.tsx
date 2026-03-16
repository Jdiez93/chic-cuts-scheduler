const Footer = () => {
  return (
    <footer className="border-t border-border px-6 py-12 lg:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-display text-lg font-semibold tracking-tight">
          Aura<span className="text-accent">.</span>
        </p>
        <p className="font-body text-xs text-muted-foreground">
          © 2024 Aura Studio. Proyecto de portfolio — datos ficticios.
        </p>
        <div className="flex gap-6">
          <a href="#inicio" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Inicio
          </a>
          <a href="#servicios" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Servicios
          </a>
          <a href="#reservar" className="font-body text-xs text-muted-foreground hover:text-foreground transition-colors">
            Reservar
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Lock, Clock, User, Check } from "lucide-react";
import { toast } from "sonner";

interface BookedSlot {
  date: string;
  time: string;
  name: string;
  service: string;
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const SERVICES = [
  "Corte Degradado", "Corte + Diseño", "Afeitado Clásico",
  "Barba Completa", "Tratamiento Capilar", "Experiencia VIP",
];

const initialBooked: BookedSlot[] = [
  { date: format(new Date(), "yyyy-MM-dd"), time: "10:00", name: "Alejandro M.", service: "Corte Degradado" },
  { date: format(new Date(), "yyyy-MM-dd"), time: "10:30", name: "David R.", service: "Afeitado Clásico" },
  { date: format(new Date(), "yyyy-MM-dd"), time: "11:30", name: "Carlos P.", service: "Experiencia VIP" },
  { date: format(new Date(), "yyyy-MM-dd"), time: "16:00", name: "Miguel S.", service: "Barba Completa" },
  { date: format(new Date(), "yyyy-MM-dd"), time: "17:30", name: "Javier L.", service: "Corte + Diseño" },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), time: "09:30", name: "Pablo T.", service: "Experiencia VIP" },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), time: "12:00", name: "Andrés K.", service: "Tratamiento Capilar" },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), time: "16:30", name: "Sergio N.", service: "Corte Degradado" },
  { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), time: "10:00", name: "Fernando G.", service: "Barba Completa" },
  { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), time: "13:00", name: "Roberto D.", service: "Afeitado Clásico" },
];

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfDay(new Date()));
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>(initialBooked);
  const [formOpen, setFormOpen] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formService, setFormService] = useState(SERVICES[0]);
  const [justBooked, setJustBooked] = useState<string | null>(null);

  const weekDays = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)),
    [weekStart]
  );

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  const isSlotBooked = (time: string) =>
    bookedSlots.some((s) => s.date === dateKey && s.time === time);

  const getBooking = (time: string) =>
    bookedSlots.find((s) => s.date === dateKey && s.time === time);

  const isPastSlot = (time: string) => {
    if (!isToday(selectedDate)) return isBefore(selectedDate, startOfDay(new Date()));
    const [h, m] = time.split(":").map(Number);
    const now = new Date();
    return h < now.getHours() || (h === now.getHours() && m <= now.getMinutes());
  };

  const bookedCount = bookedSlots.filter((s) => s.date === dateKey).length;
  const availableCount = TIME_SLOTS.filter((t) => !isSlotBooked(t) && !isPastSlot(t)).length;

  const handleBook = (time: string) => {
    if (!formName.trim()) {
      toast.error("Introduce tu nombre para reservar");
      return;
    }
    setBookedSlots((prev) => [
      ...prev,
      { date: dateKey, time, name: formName.trim(), service: formService },
    ]);
    setFormOpen(null);
    setFormName("");
    setFormService(SERVICES[0]);
    setJustBooked(time);
    setTimeout(() => setJustBooked(null), 2000);
    toast.success("¡Cita reservada!", {
      description: `${format(selectedDate, "EEEE d 'de' MMMM", { locale: es })} a las ${time} — ${formService}`,
    });
  };

  return (
    <section id="reservar" className="section-padding">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-primary mb-6"
          />
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-4">
            Reserva online
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            Tu hora,{" "}
            <span className="italic font-normal text-primary">tu estilo</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-lg">
            Elige día y franja horaria. Las citas reservadas se bloquean al instante.
          </p>
        </motion.div>

        {/* Week Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-3 mb-6"
        >
          <button
            onClick={() => setWeekStart((d) => addDays(d, -7))}
            className="p-3 border border-border hover:border-primary hover:text-primary transition-all duration-300"
            aria-label="Semana anterior"
          >
            <ChevronLeft size={16} />
          </button>

          <div className="flex-1 flex gap-2 overflow-x-auto pb-1">
            {weekDays.map((day) => {
              const active = isSameDay(day, selectedDate);
              const past = isBefore(day, startOfDay(new Date()));
              const dayBookedCount = bookedSlots.filter(
                (s) => s.date === format(day, "yyyy-MM-dd")
              ).length;
              return (
                <motion.button
                  key={day.toISOString()}
                  disabled={past}
                  onClick={() => setSelectedDate(day)}
                  whileHover={!past ? { scale: 1.03 } : {}}
                  whileTap={!past ? { scale: 0.97 } : {}}
                  className={`flex-1 min-w-[80px] flex flex-col items-center py-4 border transition-all duration-300
                    ${active
                      ? "bg-primary text-primary-foreground border-primary"
                      : past
                        ? "border-border/50 text-muted-foreground/30 cursor-not-allowed"
                        : "border-border hover:border-primary/50 text-foreground"
                    }`}
                >
                  <span className="text-[10px] uppercase tracking-[0.2em] font-body">
                    {format(day, "EEE", { locale: es })}
                  </span>
                  <span className="text-xl font-display font-bold mt-1">
                    {format(day, "d")}
                  </span>
                  <span className="text-[10px] font-body mt-0.5">
                    {format(day, "MMM", { locale: es })}
                  </span>
                  {dayBookedCount > 0 && !past && (
                    <div className={`w-1.5 h-1.5 rounded-full mt-2 ${active ? "bg-primary-foreground" : "bg-booked"}`} />
                  )}
                </motion.button>
              );
            })}
          </div>

          <button
            onClick={() => setWeekStart((d) => addDays(d, 7))}
            className="p-3 border border-border hover:border-primary hover:text-primary transition-all duration-300"
            aria-label="Semana siguiente"
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>

        {/* Stats bar */}
        <div className="flex items-center gap-6 mb-8 font-body text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-booked rounded-sm" />
            <span className="text-muted-foreground">
              Reservadas: <span className="text-foreground font-medium">{bookedCount}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 border border-primary/40 rounded-sm" />
            <span className="text-muted-foreground">
              Disponibles: <span className="text-primary font-medium">{availableCount}</span>
            </span>
          </div>
          <div className="ml-auto text-muted-foreground">
            {format(selectedDate, "EEEE, d 'de' MMMM yyyy", { locale: es })}
          </div>
        </div>

        {/* Time Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3"
        >
          {TIME_SLOTS.map((time, i) => {
            const booked = isSlotBooked(time);
            const past = isPastSlot(time);
            const booking = getBooking(time);
            const isFormTarget = formOpen === time;
            const wasJustBooked = justBooked === time;

            return (
              <motion.div
                key={time}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="relative"
              >
                <AnimatePresence mode="wait">
                  {isFormTarget && (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                      className="absolute inset-0 z-20 bg-card border-2 border-primary p-3 flex flex-col gap-2 min-h-[200px] shadow-lg shadow-primary/10"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-display text-lg font-bold text-primary">{time}</span>
                        <button
                          onClick={() => { setFormOpen(null); setFormName(""); }}
                          className="text-muted-foreground hover:text-foreground transition-colors text-xs"
                        >
                          ✕
                        </button>
                      </div>
                      <div className="relative">
                        <User size={12} className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input
                          type="text"
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Tu nombre"
                          className="w-full pl-7 pr-2 py-2 text-xs font-body border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                          autoFocus
                        />
                      </div>
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-2 py-2 text-xs font-body border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleBook(time)}
                        className="mt-auto py-2 bg-primary text-primary-foreground text-xs font-body font-medium tracking-wide uppercase hover:brightness-110 transition-all"
                      >
                        Confirmar reserva
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>

                <motion.button
                  disabled={booked || past}
                  onClick={() => !booked && !past && setFormOpen(time)}
                  whileHover={!booked && !past ? { scale: 1.03 } : {}}
                  whileTap={!booked && !past ? { scale: 0.97 } : {}}
                  className={`w-full p-4 flex flex-col items-center gap-2 transition-all duration-300 min-h-[120px] justify-center border relative overflow-hidden
                    ${booked
                      ? "bg-booked-muted border-booked/40 cursor-not-allowed"
                      : past
                        ? "bg-muted/30 border-border/50 cursor-not-allowed opacity-40"
                        : "border-border hover:border-primary/60 hover:bg-card cursor-pointer"
                    }
                    ${wasJustBooked ? "animate-scale-in" : ""}
                  `}
                >
                  {booked && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-booked" />
                  )}

                  <span className={`font-display text-lg font-bold ${booked ? "text-booked" : past ? "text-muted-foreground" : "text-foreground"}`}>
                    {time}
                  </span>

                  {booked && booking ? (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <Lock size={10} className="text-booked" />
                        <span className="font-body text-[10px] text-booked font-medium uppercase tracking-wider">
                          Reservada
                        </span>
                      </div>
                      <span className="font-body text-[10px] text-muted-foreground">
                        {booking.name}
                      </span>
                    </div>
                  ) : past ? (
                    <span className="font-body text-[10px] text-muted-foreground">No disponible</span>
                  ) : (
                    <div className="flex flex-col items-center gap-1">
                      <div className="flex items-center gap-1">
                        <Clock size={10} className="text-primary" />
                        <span className="font-body text-[10px] text-primary font-medium uppercase tracking-wider">
                          Disponible
                        </span>
                      </div>
                      <span className="font-body text-[10px] text-muted-foreground">30 min</span>
                    </div>
                  )}
                </motion.button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Legend */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-body text-xs text-muted-foreground mt-8 text-center border-t border-border pt-6"
        >
          Cada cita dura 30 minutos · Las horas reservadas se bloquean automáticamente en rojo · Haz clic en una franja disponible para reservar
        </motion.p>
      </div>
    </section>
  );
};

export default BookingSection;

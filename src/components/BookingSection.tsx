import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format, addDays, isSameDay, isToday, isBefore, startOfDay } from "date-fns";
import { es } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import { toast } from "sonner";

interface BookedSlot {
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  name: string;
  service: string;
}

const TIME_SLOTS = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30",
  "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
];

const SERVICES = [
  "Corte Clásico", "Coloración", "Tratamiento Capilar",
  "Peinado & Styling", "Barba & Afeitado", "Experiencia Premium",
];

// Pre-booked demo data
const initialBooked: BookedSlot[] = [
  { date: format(new Date(), "yyyy-MM-dd"), time: "10:00", name: "María G.", service: "Coloración" },
  { date: format(new Date(), "yyyy-MM-dd"), time: "11:30", name: "Carlos R.", service: "Corte Clásico" },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), time: "09:30", name: "Laura M.", service: "Experiencia Premium" },
  { date: format(addDays(new Date(), 1), "yyyy-MM-dd"), time: "16:00", name: "Pablo S.", service: "Barba & Afeitado" },
  { date: format(addDays(new Date(), 2), "yyyy-MM-dd"), time: "12:00", name: "Ana T.", service: "Tratamiento Capilar" },
];

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weekStart, setWeekStart] = useState(startOfDay(new Date()));
  const [bookedSlots, setBookedSlots] = useState<BookedSlot[]>(initialBooked);
  const [formOpen, setFormOpen] = useState<string | null>(null); // time slot
  const [formName, setFormName] = useState("");
  const [formService, setFormService] = useState(SERVICES[0]);

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

  const handleBook = (time: string) => {
    if (!formName.trim()) {
      toast.error("Por favor, introduce tu nombre");
      return;
    }
    const newSlot: BookedSlot = {
      date: dateKey,
      time,
      name: formName.trim(),
      service: formService,
    };
    setBookedSlots((prev) => [...prev, newSlot]);
    setFormOpen(null);
    setFormName("");
    setFormService(SERVICES[0]);
    toast.success("¡Cita reservada con éxito!", {
      description: `${format(selectedDate, "d 'de' MMMM", { locale: es })} a las ${time} — ${formService}`,
    });
  };

  return (
    <section id="reservar" className="section-padding bg-secondary/30">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-accent mb-4">
            Reserva online
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-2">
            Elige tu horario
          </h2>
          <p className="font-body text-muted-foreground">
            Selecciona un día y una franja de 30 minutos disponible.
          </p>
        </motion.div>

        {/* Week Selector */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setWeekStart((d) => addDays(d, -7))}
            className="p-2 border border-border hover:bg-secondary transition-colors"
            aria-label="Semana anterior"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="flex gap-2 overflow-x-auto">
            {weekDays.map((day) => {
              const active = isSameDay(day, selectedDate);
              const past = isBefore(day, startOfDay(new Date()));
              return (
                <button
                  key={day.toISOString()}
                  disabled={past}
                  onClick={() => setSelectedDate(day)}
                  className={`flex flex-col items-center px-4 py-3 min-w-[72px] border transition-colors font-body text-sm
                    ${active
                      ? "bg-primary text-primary-foreground border-primary"
                      : past
                        ? "border-border text-muted-foreground/40 cursor-not-allowed"
                        : "border-border hover:bg-secondary text-foreground"
                    }`}
                >
                  <span className="text-[10px] uppercase tracking-wider">
                    {format(day, "EEE", { locale: es })}
                  </span>
                  <span className="text-lg font-medium mt-0.5">
                    {format(day, "d")}
                  </span>
                  <span className="text-[10px]">
                    {format(day, "MMM", { locale: es })}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setWeekStart((d) => addDays(d, 7))}
            className="p-2 border border-border hover:bg-secondary transition-colors"
            aria-label="Semana siguiente"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Time Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-px bg-border">
          {TIME_SLOTS.map((time) => {
            const booked = isSlotBooked(time);
            const past = isPastSlot(time);
            const booking = getBooking(time);
            const isFormTarget = formOpen === time;

            return (
              <div key={time} className="bg-background relative">
                <AnimatePresence mode="wait">
                  {isFormTarget ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute inset-0 z-10 bg-background border border-accent p-3 flex flex-col gap-2 min-h-[180px]"
                    >
                      <p className="font-body text-xs font-medium text-accent">{time}</p>
                      <input
                        type="text"
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="Tu nombre"
                        className="w-full px-2 py-1.5 text-xs font-body border border-border bg-background focus:border-accent focus:outline-none"
                      />
                      <select
                        value={formService}
                        onChange={(e) => setFormService(e.target.value)}
                        className="w-full px-2 py-1.5 text-xs font-body border border-border bg-background focus:border-accent focus:outline-none"
                      >
                        {SERVICES.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <div className="flex gap-1 mt-auto">
                        <button
                          onClick={() => handleBook(time)}
                          className="flex-1 py-1.5 bg-primary text-primary-foreground text-xs font-body hover:opacity-90 transition-opacity"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => { setFormOpen(null); setFormName(""); }}
                          className="px-3 py-1.5 border border-border text-xs font-body hover:bg-secondary transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <button
                  disabled={booked || past}
                  onClick={() => !booked && !past && setFormOpen(time)}
                  className={`w-full p-4 flex flex-col items-center gap-1 transition-colors min-h-[100px] justify-center
                    ${booked
                      ? "bg-muted cursor-not-allowed"
                      : past
                        ? "bg-muted/50 cursor-not-allowed"
                        : "hover:bg-accent/10 cursor-pointer"
                    }`}
                >
                  <span className={`font-body text-sm font-medium ${booked || past ? "text-muted-foreground" : "text-foreground"}`}>
                    {time}
                  </span>
                  {booked && booking ? (
                    <div className="flex flex-col items-center gap-0.5">
                      <Check size={14} className="text-accent" />
                      <span className="font-body text-[10px] text-muted-foreground">
                        {booking.name}
                      </span>
                    </div>
                  ) : past ? (
                    <span className="font-body text-[10px] text-muted-foreground">Pasado</span>
                  ) : (
                    <span className="font-body text-[10px] text-accent">Disponible</span>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        <p className="font-body text-xs text-muted-foreground mt-6 text-center">
          Cada cita tiene una duración de 30 minutos · Las franjas reservadas se bloquean automáticamente
        </p>
      </div>
    </section>
  );
};

export default BookingSection;

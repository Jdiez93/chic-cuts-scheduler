import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Send, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Review {
  id: string;
  customer_name: string;
  rating: number;
  comment: string;
  service: string;
  created_at: string;
}

const ReviewsSection = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState<{ id: string; name: string; service: string } | null>(null);
  const [verifyError, setVerifyError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const { data } = await supabase
      .from("reviews")
      .select("id, customer_name, rating, comment, created_at, bookings(service)")
      .order("created_at", { ascending: false });
    if (data) {
      setReviews(
        data.map((r: any) => ({
          id: r.id,
          customer_name: r.customer_name,
          rating: r.rating,
          comment: r.comment,
          service: r.bookings?.service || "",
          created_at: r.created_at,
        }))
      );
    }
  };

  const verifyEmail = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setVerifyError("Introduce un email válido");
      return;
    }
    setVerifyError("");
    setLoading(true);

    const { data } = await supabase
      .from("bookings")
      .select("id, customer_name, service")
      .eq("customer_email", email.trim().toLowerCase())
      .limit(1);

    if (!data || data.length === 0) {
      setVerifyError("No encontramos reservas con ese email. Solo clientes con cita pueden dejar reseña.");
      setLoading(false);
      return;
    }

    // Check if already reviewed
    const { data: existingReview } = await supabase
      .from("reviews")
      .select("id")
      .eq("customer_email", email.trim().toLowerCase())
      .limit(1);

    if (existingReview && existingReview.length > 0) {
      setVerifyError("Ya has dejado una reseña. ¡Gracias por tu opinión!");
      setLoading(false);
      return;
    }

    setVerified({ id: data[0].id, name: data[0].customer_name, service: data[0].service });
    setLoading(false);
  };

  const submitReview = async () => {
    if (!verified || !comment.trim()) {
      toast.error("Escribe tu comentario");
      return;
    }
    if (comment.trim().length > 500) {
      toast.error("El comentario no puede superar los 500 caracteres");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("reviews").insert({
      booking_id: verified.id,
      customer_name: verified.name,
      customer_email: email.trim().toLowerCase(),
      rating,
      comment: comment.trim(),
    });

    if (error) {
      toast.error("Error al enviar la reseña");
      setLoading(false);
      return;
    }

    toast.success("¡Gracias por tu reseña!");
    setShowForm(false);
    setEmail("");
    setComment("");
    setRating(5);
    setVerified(null);
    await fetchReviews();
    setLoading(false);
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <section id="resenas" className="section-padding bg-secondary/30">
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
            Opiniones reales
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-3">
            Lo que dicen{" "}
            <span className="italic font-normal text-primary">nuestros clientes</span>
          </h2>
          <div className="flex items-center gap-4 mt-4">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  size={20}
                  className={s <= Math.round(Number(avgRating)) ? "text-primary fill-primary" : "text-border"}
                />
              ))}
            </div>
            <span className="font-display text-2xl font-bold">{avgRating}</span>
            <span className="font-body text-sm text-muted-foreground">
              ({reviews.length} reseña{reviews.length !== 1 ? "s" : ""})
            </span>
          </div>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {reviews.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border p-6 flex flex-col gap-4 hover:border-primary/30 transition-colors duration-300"
            >
              <Quote size={24} className="text-primary/30" />
              <p className="font-body text-sm text-foreground leading-relaxed flex-1">
                "{review.comment}"
              </p>
              <div className="flex items-center gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={14}
                    className={s <= review.rating ? "text-primary fill-primary" : "text-border"}
                  />
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-display text-sm font-semibold">{review.customer_name}</p>
                  <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider">
                    {review.service}
                  </p>
                </div>
                <CheckCircle size={14} className="text-primary" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to leave review */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="border border-border bg-card p-8"
        >
          <AnimatePresence mode="wait">
            {!showForm ? (
              <motion.div
                key="cta"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <p className="font-display text-xl font-semibold mb-2">
                  ¿Ya nos visitaste?
                </p>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Deja tu reseña y ayuda a otros a conocernos. Solo clientes con cita reservada pueden opinar.
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setShowForm(true)}
                  className="px-8 py-3 bg-primary text-primary-foreground font-body text-sm font-medium tracking-wide uppercase hover:brightness-110 transition-all"
                >
                  Dejar una reseña
                </motion.button>
              </motion.div>
            ) : !verified ? (
              <motion.div
                key="verify"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-md mx-auto"
              >
                <p className="font-display text-lg font-semibold mb-1 text-center">
                  Verifica tu reserva
                </p>
                <p className="font-body text-xs text-muted-foreground mb-4 text-center">
                  Introduce el email con el que reservaste tu cita
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setVerifyError(""); }}
                    placeholder="tu@email.com"
                    className="flex-1 px-4 py-3 font-body text-sm border border-border bg-background focus:border-primary focus:outline-none transition-colors"
                  />
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={verifyEmail}
                    disabled={loading}
                    className="px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium uppercase disabled:opacity-50"
                  >
                    {loading ? "..." : "Verificar"}
                  </motion.button>
                </div>
                {verifyError && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-3 text-booked"
                  >
                    <AlertCircle size={14} />
                    <span className="font-body text-xs">{verifyError}</span>
                  </motion.div>
                )}
                <button
                  onClick={() => { setShowForm(false); setEmail(""); setVerifyError(""); }}
                  className="font-body text-xs text-muted-foreground hover:text-foreground mt-3 transition-colors"
                >
                  ← Cancelar
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="max-w-lg mx-auto"
              >
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle size={16} className="text-primary" />
                  <span className="font-body text-sm">
                    Verificado como <span className="font-semibold text-primary">{verified.name}</span>
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                    >
                      <Star
                        size={28}
                        className={`transition-colors ${
                          s <= (hoverRating || rating)
                            ? "text-primary fill-primary"
                            : "text-border hover:text-primary/50"
                        }`}
                      />
                    </button>
                  ))}
                  <span className="font-body text-sm text-muted-foreground ml-2">
                    {rating}/5
                  </span>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Cuéntanos tu experiencia..."
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 font-body text-sm border border-border bg-background focus:border-primary focus:outline-none transition-colors resize-none mb-2"
                />
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-[10px] text-muted-foreground">
                    {comment.length}/500
                  </span>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => { setShowForm(false); setVerified(null); setEmail(""); setComment(""); }}
                    className="px-6 py-3 border border-border font-body text-sm text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
                  >
                    Cancelar
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={submitReview}
                    disabled={loading || !comment.trim()}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-body text-sm font-medium uppercase disabled:opacity-50 transition-all"
                  >
                    <Send size={14} />
                    {loading ? "Enviando..." : "Publicar reseña"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

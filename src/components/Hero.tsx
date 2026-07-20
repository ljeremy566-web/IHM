import { motion } from 'motion/react';
import logoKin from '../img/fbdfdabe-d455-4f4a-a1b9-a1799a8b2768.png';
import './Hero.css';

interface HeroProps {
  onBookingClick?: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">

        {/* Logo — left side */}
        <motion.img
          src={logoKin}
          alt="Hostal KIN"
          className="hero-logo-img"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Quote + CTA — right side */}
        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="hero-divider"></div>
          <h2 className="hero-quote">
            Habitaciones limpias y seguras, con un trato cálido que te hará sentir como en casa
          </h2>
          <button className="hero-btn hero-btn-shimmer" onClick={onBookingClick}>
            Reserva Ahora
          </button>
        </motion.div>

      </div>
    </section>
  );
}

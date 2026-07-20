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
        <img src={logoKin} alt="Hostal KIN" className="hero-logo-img" />

        {/* Quote + CTA — right side */}
        <div className="hero-right">
          <div className="hero-divider"></div>
          <h2 className="hero-quote">
            Habitaciones limpias y seguras, con un trato cálido que te hará sentir como en casa
          </h2>
          <button className="hero-btn" onClick={onBookingClick}>
            Reserva Ahora
          </button>
        </div>

      </div>
    </section>
  );
}

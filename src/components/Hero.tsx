import './Hero.css';

interface HeroProps {
  onBookingClick?: () => void;
}

export function Hero({ onBookingClick }: HeroProps) {
  return (
    <section className="hero">
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-left">
          <h1 className="hero-title">HOSTAL</h1>
          <h1 className="hero-title-red">KIN</h1>
        </div>
        <div className="hero-right">
          <h2 className="hero-quote">
            "Habitaciones limpias y seguras, con un trato cálido que te hará sentir como en casa"
          </h2>
          <button className="hero-btn" onClick={onBookingClick}>RESERVA AHORA</button>
        </div>
      </div>
    </section>
  );
}

import { FaWifi, FaWarehouse, FaTag, FaBath, FaInfoCircle } from 'react-icons/fa';
import './Services.css';

export function Services() {
  return (
    <section className="services container">
      <h2 className="services-title">Nuestros servicios</h2>
      <p className="services-subtitle">Contamos con una gran diversidad de servicios disponibles para hacer su estadía mas cómoda</p>

      <div className="services-grid">
        <div className="services-image-container">
          <img
            src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop"
            alt="Habitación de lujo"
            className="services-image"
          />
          <div className="services-image-overlay">
            <span>Ambientes acogedores y equipados para garantizar su máxima comodidad y tranquilidad durante la estadía.</span>
          </div>
          <FaInfoCircle className="info-icon" title="Información sobre la habitación" />
        </div>
        <div className="services-list-card">
          <ul className="services-list">
            <li className="service-item">
              <div className="service-icon-box">
                <FaWifi className="service-icon" />
              </div>
              <div className="service-info">
                <span className="service-name">Wi - Fi de alta velocidad</span>
                <span className="service-tag">Fibra óptica 500 Mbps</span>
              </div>
            </li>
            <li className="service-item">
              <div className="service-icon-box">
                <FaWarehouse className="service-icon" />
              </div>
              <div className="service-info">
                <span className="service-name">Cochera las 24 horas</span>
                <span className="service-tag">Monitoreo y seguridad privada</span>
              </div>
            </li>
            <li className="service-item">
              <div className="service-icon-box">
                <FaTag className="service-icon" />
              </div>
              <div className="service-info">
                <span className="service-name">Descuentos para socios</span>
                <span className="service-tag">Hasta 20% OFF en reservas</span>
              </div>
            </li>
            <li className="service-item">
              <div className="service-icon-box">
                <FaBath className="service-icon" />
              </div>
              <div className="service-info">
                <span className="service-name">Duchas con agua caliente</span>
                <span className="service-tag">Sistema termostático 24/7</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

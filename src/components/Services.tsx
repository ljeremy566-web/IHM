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
          <FaInfoCircle className="info-icon" />
        </div>
        <div className="services-list-card">
          <ul className="services-list">
            <li>
              <FaWifi className="service-icon" />
              <span>Wi - Fi de alta velocidad</span>
            </li>
            <li>
              <FaWarehouse className="service-icon" />
              <span>Cochera las 24 horas</span>
            </li>
            <li>
              <FaTag className="service-icon" />
              <span>Descuentos para socios</span>
            </li>
            <li>
              <FaBath className="service-icon" />
              <span>Duchas con agua caliente</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

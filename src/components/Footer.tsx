import { FaFacebookF, FaTwitter, FaTiktok, FaInstagram } from 'react-icons/fa';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col">
          <h3 className="footer-logo">HOSTAL KIN</h3>
          <p className="footer-desc">
            Nos dedicamos a ofrecer servicios de hospedaje y alojamiento turístico. Nuestro principal objetivo es brindar a cada huésped una experiencia cómoda, organizada y llena de detalles que marcan la diferencia.
          </p>
          <div className="social-icons">
            <a href="#"><FaFacebookF size={18} /></a>
            <a href="#"><FaTwitter size={18} /></a>
            <a href="#"><FaTiktok size={18} /></a>
            <a href="#"><FaInstagram size={18} /></a>
          </div>
        </div>
        
        <div className="footer-col links-col">
          <h4 className="footer-heading">Accesos rapidos</h4>
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Reservar ahora</a></li>
            <li><a href="#">Buscar Reserva</a></li>
            <li><a href="#">Contactanos</a></li>
            <li><a href="#">Ubicacion</a></li>
          </ul>
        </div>
        
        <div className="footer-col links-col">
          <h4 className="footer-heading">Compañia</h4>
          <ul>
            <li><a href="#">Politicas de privacidad</a></li>
            <li><a href="#">Politicas de cancelación</a></li>
            <li><a href="#">F.A.Q</a></li>
            <li><a href="#">Sobre nosotros</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Hostal Kin, todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

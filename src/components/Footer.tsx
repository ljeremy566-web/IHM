import { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaTiktok, FaInstagram } from 'react-icons/fa';
import logoKin from '../img/fbdfdabe-d455-4f4a-a1b9-a1799a8b2768.png';
import './Footer.css';

const QUICK_LINKS = [
  { label: 'Inicio', href: '#' },
  { label: 'Reservar ahora', href: '#' },
  { label: 'Buscar Reserva', href: '#' },
  { label: 'Contactanos', href: '#' },
  { label: 'Ubicacion', href: '#' },
];

const COMPANY_LINKS = [
  { label: 'Politicas de privacidad', href: '#' },
  { label: 'Politicas de cancelación', href: '#' },
  { label: 'F.A.Q', href: '#' },
  { label: 'Sobre nosotros', href: '#' },
];

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
  onNavigateSearchBooking: () => void;
  onNavigateContact: () => void;
  onNavigateContactTab: (tab: string) => void;
}

export function Footer({
  onNavigateHome,
  onNavigateBooking,
  onNavigateSearchBooking,
  onNavigateContact,
  onNavigateContactTab
}: FooterProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 820px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  const handleLinkClick = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (label === 'Inicio') onNavigateHome();
    else if (label === 'Reservar ahora') onNavigateBooking();
    else if (label === 'Buscar Reserva') onNavigateSearchBooking();
    else if (label === 'Contactanos') onNavigateContact();
    else if (label === 'Ubicacion') onNavigateContact();
  };

  const handleCompanyClick = (label: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (label === 'Politicas de privacidad') onNavigateContactTab('privacidad');
    else if (label === 'Politicas de cancelación') onNavigateContactTab('cancelacion');
    else if (label === 'F.A.Q') onNavigateContactTab('preguntas');
    else if (label === 'Sobre nosotros') onNavigateContactTab('sobre-nosotros');
  };

  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-col brand-col footer-brand-col">
          <img src={logoKin} alt="Hostal KIN" className="footer-logo-img" />
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
          {isMobile ? (
            <details className="footer-dropdown">
              <summary className="footer-heading">Accesos rapidos</summary>
              <ul>
                {QUICK_LINKS.map(link => (
                  <li key={link.label}>
                    <a href="#" onClick={(e) => handleLinkClick(link.label, e)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </details>
          ) : (
            <>
              <h4 className="footer-heading">Accesos rapidos</h4>
              <ul>
                {QUICK_LINKS.map(link => (
                  <li key={link.label}>
                    <a href="#" onClick={(e) => handleLinkClick(link.label, e)}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
        <div className="footer-col links-col">
          {isMobile ? (
            <details className="footer-dropdown">
              <summary className="footer-heading">Compañia</summary>
              <ul>
                {COMPANY_LINKS.map(link => (
                  <li key={link.label}><a href="#" onClick={(e) => handleCompanyClick(link.label, e)}>{link.label}</a></li>
                ))}
              </ul>
            </details>
          ) : (
            <>
              <h4 className="footer-heading">Compañia</h4>
              <ul>
                {COMPANY_LINKS.map(link => (
                  <li key={link.label}><a href="#" onClick={(e) => handleCompanyClick(link.label, e)}>{link.label}</a></li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Hostal Kin, todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

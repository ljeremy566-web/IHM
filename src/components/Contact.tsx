import { useState, useEffect } from 'react';
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaUserFriends, 
  FaFacebookF, 
  FaInstagram, 
  FaWhatsapp, 
  FaTiktok,
  FaDownload 
} from 'react-icons/fa';
import './Contact.css';

type TabType = 'sobre-nosotros' | 'contacto' | 'cancelacion' | 'privacidad' | 'preguntas';

interface ContactProps {
  initialTab?: string;
}

export function Contact({ initialTab = 'contacto' }: ContactProps) {
  const [activeTab, setActiveTab] = useState<TabType>((initialTab as TabType) || 'contacto');
  const [mobileSelectOpen, setMobileSelectOpen] = useState(false);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab as TabType);
    }
  }, [initialTab]);

  const tabs = [
    { id: 'sobre-nosotros', label: 'Sobre nosotros' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'cancelacion', label: 'Politica de cancelacion' },
    { id: 'privacidad', label: 'Politica de privacidad' },
    { id: 'preguntas', label: 'Preguntas frecuentes' }
  ] as const;

  const renderContent = () => {
    switch (activeTab) {
      case 'sobre-nosotros':
        return (
          <div className="contact-tab-content fade-in">
            <p>
              En Hostal KIN nos dedicamos a brindar un servicio de hospedaje pensado para tu comodidad, seguridad y tranquilidad. Estamos ubicados en una zona estratégica de Nuevo Chimbote, en la Av. Country MZ. A - Lote 01 Urb. El Bosque, ofreciendo un espacio ideal tanto para familias como para viajeros que buscan descanso y una atención de calidad.
            </p>
            <p>
              Nuestro principal compromiso es que cada huésped viva una experiencia confortable y organizada. Contamos con habitaciones seguras, limpias y funcionales, diseñadas para que te sientas como en casa desde el primer momento. Nos caracteriza un trato cálido, cercano y respetuoso, porque creemos que un buen servicio nace de la confianza y la atención personal.
            </p>
            <p>
              Con varios años de experiencia, hemos logrado consolidarnos como una opción preferida en la ciudad gracias a nuestro ambiente familiar, la dedicación de nuestro equipo y la pasión por atender bien a quienes nos eligen. En Hostal KIN, tu descanso es nuestra prioridad.
            </p>
            
            <div className="about-logo-wrapper">
              <div className="about-logo">
                <div className="about-logo-mark">
                  <span className="about-logo-symbol">K</span>
                </div>
                <span className="about-logo-text">KIN</span>
              </div>
            </div>
          </div>
        );

      case 'contacto':
        return (
          <div className="contact-tab-content fade-in">
            <div className="contact-details-grid">
              <div className="contact-info-col">
                <div className="contact-info-top">
                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper">
                      <FaPhoneAlt />
                    </div>
                    <div className="contact-info-text">
                      <h3>Teléfono</h3>
                      <p>986 312 768</p>
                    </div>
                  </div>

                  <div className="contact-info-item">
                    <div className="contact-info-icon-wrapper">
                      <FaEnvelope />
                    </div>
                    <div className="contact-info-text">
                      <h3>EMAIL</h3>
                      <p>hostalkin@gmail.com</p>
                    </div>
                  </div>
                </div>

                <div className="contact-socials-section">
                  <div className="contact-socials-header">
                    <FaUserFriends />
                    <h3>Redes sociales</h3>
                  </div>
                  
                  <div className="contact-socials-list">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaFacebookF className="facebook-icon" />
                      <span>Hostal Kin</span>
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaInstagram className="instagram-icon" />
                      <span>@hostalKin</span>
                    </a>
                    <a href="https://wa.me/51933147511" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaWhatsapp className="whatsapp-icon" />
                      <span>933 147 511</span>
                    </a>
                    <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-link">
                      <FaTiktok className="tiktok-icon" />
                      <span>@hostalking33</span>
                    </a>
                  </div>
                </div>
              </div>

              <div className="contact-map-col">
                <div className="map-container" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <iframe 
                    src="https://maps.google.com/maps?q=Hostal%20Kin,%20Nuevo%20Chimbote&t=&z=16&ie=UTF8&iwloc=&output=embed" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, width: '100%', height: '100%', display: 'block' }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    title="Ubicación Hostal KIN"
                  ></iframe>
                </div>
              </div>
            </div>

            <div className="contact-video-section">
              <video 
                controls 
                crossOrigin="anonymous"
                width="100%" 
                poster="https://images.unsplash.com/photo-1540518614846-7eded433c457?q=80&w=2070&auto=format&fit=crop"
                className="facade-video"
              >
                <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c02afdc1b8b835e5d36e2d93e3df7718&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
                <track 
                  kind="subtitles" 
                  src="/subtitles.vtt" 
                  srcLang="es" 
                  label="Español" 
                  default 
                />
                Tu navegador no soporta el tag de video.
              </video>
            </div>
            <div className="video-transcript-download">
              <a href="/transcripcion.txt" download="transcripcion_hostal_kin.txt" className="transcript-btn">
                <FaDownload />
                <span>Descargar Transcripción</span>
              </a>
            </div>
          </div>
        );

      case 'cancelacion':
        return (
          <div className="contact-tab-content fade-in">
            <p>
              En Hostal KIN entendemos que pueden surgir imprevistos, por ello contamos con una política de cancelación flexible y transparente, pensada en la comodidad de nuestros huéspedes.
            </p>
            <p>
              Las cancelaciones realizadas con 48 horas de anticipación a la fecha de llegada no generarán ningún cargo adicional. Si la cancelación se realiza dentro de las 48 horas previas, se cobrará el equivalente a una noche de estadía.
            </p>
            <p>
              En caso de no presentarse (No Show) sin previo aviso, se realizará el cobro del 100% de la primera noche reservada. Las reservas realizadas para fechas especiales, feriados largos o temporadas altas podrán tener condiciones especiales, las cuales serán informadas al momento de la confirmación.
            </p>
            <p>
              Las devoluciones, cuando correspondan, se realizarán por el mismo medio de pago utilizado, dentro de un plazo máximo de 7 días hábiles.
            </p>
            <p>
              Para modificar o cancelar su reserva, puede comunicarse directamente con nosotros por nuestros canales oficiales. En Hostal KIN agradecemos su comprensión y confianza.
            </p>
          </div>
        );

      case 'privacidad':
        return (
          <div className="contact-tab-content fade-in">
            <p>
              En Hostal KIN valoramos y respetamos la privacidad de nuestros huéspedes y visitantes. Esta Política de Privacidad describe cómo recopilamos, utilizamos y protegemos la información personal que nos es proporcionada a través de nuestros canales de atención, ya sea de forma presencial, telefónica, digital o mediante nuestra página web.
            </p>
            <p>
              La información personal que recopilamos puede incluir, entre otros datos: nombres, apellidos, número de documento de identidad, dirección, número de teléfono, correo electrónico y datos necesarios para la gestión de reservas y facturación. Estos datos son utilizados únicamente para fines relacionados con la prestación de nuestros servicios, la confirmación de reservas, la atención al cliente y el cumplimiento de obligaciones legales.
            </p>
            <p>
              Hostal KIN se compromete a no compartir, vender ni ceder la información personal de sus huéspedes a terceros, salvo cuando sea requerido por ley o por autoridades competentes.
            </p>
            <p>
              Implementamos medidas de seguridad adecuadas para proteger la información personal contra accesos no autorizados, pérdidas, alteraciones o divulgaciones indebidas. El acceso a estos datos está restringido únicamente al personal autorizado.
            </p>
            <p>
              El huésped puede solicitar en cualquier momento la actualización, modificación o eliminación de sus datos personales, comunicándose a través de nuestros canales oficiales de atención.
            </p>
            <p>
              Al utilizar nuestros servicios, el huésped acepta los términos establecidos en esta Política de Privacidad. Hostal KIN se reserva el derecho de actualizar esta política cuando sea necesario, garantizando siempre la protección de la información de nuestros clientes.
            </p>
          </div>
        );

      case 'preguntas':
        return (
          <div className="contact-tab-content fade-in">
            <div className="faq-list">
              <div className="faq-item">
                <h3>1. ¿Dónde se encuentra ubicado Hostal KIN?</h3>
                <p>Nos ubicamos en la Av. Country MZ. A – Lote 01, Urb. El Bosque, en Nuevo Chimbote, en una zona accesible y tranquila para su estadía.</p>
              </div>

              <div className="faq-item">
                <h3>2. ¿A qué hora es el check-in y el check-out?</h3>
                <p>El check-in se realiza a partir de las 2:00 p.m. y el check-out hasta las 12:00 p.m. En caso de necesitar un horario especial, puede consultarlo previamente con recepción.</p>
              </div>

              <div className="faq-item">
                <h3>3. ¿Qué servicios incluyen las habitaciones?</h3>
                <p>Nuestras habitaciones cuentan con camas cómodas, baño privado, agua caliente, limpieza diaria, televisión y un ambiente seguro y acogedor.</p>
              </div>

              <div className="faq-item">
                <h3>4. ¿Se permite el ingreso de niños y familias?</h3>
                <p>Sí, somos un hostal ideal para familias. Brindamos un ambiente seguro, tranquilo y familiar.</p>
              </div>

              <div className="faq-item">
                <h3>5. ¿Qué métodos de pago aceptan?</h3>
                <p>Aceptamos pagos en efectivo, transferencias y otros métodos que serán informados al momento de la reserva.</p>
              </div>

              <div className="faq-item">
                <h3>6. ¿Puedo cancelar mi reserva?</h3>
                <p>Sí, contamos con una política de cancelación flexible. Le recomendamos revisar nuestra Política de Cancelación para más detalles.</p>
              </div>

              <div className="faq-item">
                <h3>7. ¿Se permiten visitas en las habitaciones?</h3>
                <p>Por seguridad y comodidad de todos nuestros huéspedes, las visitas deben ser consultadas previamente en recepción.</p>
              </div>
            </div>

            <p className="faq-footer-note">
              En Hostal KIN estamos siempre dispuestos a ayudarle para que su experiencia sea la mejor.
            </p>
          </div>
        );
    }
  };

  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'sobre-nosotros': return 'Sobre Nosotros';
      case 'contacto': return 'Contacto';
      case 'cancelacion': return 'Politica de Cancelacion';
      case 'privacidad': return 'Politica de Privacidad';
      case 'preguntas': return 'Preguntas Frecuentes';
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div className="contact-hero">
        <div className="contact-hero-overlay"></div>
        <div className="contact-hero-content">
          <h1 className="contact-hero-title">Contáctanos</h1>
          <div className="contact-hero-divider"></div>
          <p className="contact-hero-subtitle">
            Si tienes alguna pregunta o deseas realizar una reservación, no dudes en ponerte en contacto con nosotros
          </p>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="container contact-body-container">
        <div className="contact-layout-grid">
          {/* Sidebar */}
          <aside className="contact-sidebar">
            <div className="contact-desktop-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`contact-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="contact-mobile-select-wrapper">
              <div className="contact-custom-select" onClick={() => setMobileSelectOpen(!mobileSelectOpen)}>
                <span className="contact-selected-value">{tabs.find(t => t.id === activeTab)?.label}</span>
                <span className="contact-arrow">▾</span>
                {mobileSelectOpen && (
                  <div className="contact-dropdown">
                    {tabs.map((tab) => (
                      <div 
                        key={tab.id} 
                        className={`contact-option ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => { setActiveTab(tab.id); setMobileSelectOpen(false); }}
                      >
                        {tab.label}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Content Card */}
          <main className="contact-content-card">
            <div className="contact-content-header">
              <h2>{getHeaderTitle()}</h2>
            </div>
            <div className="contact-content-body">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

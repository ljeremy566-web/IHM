import { useState } from 'react';
import { motion } from 'motion/react';
import { FaSearch, FaWifi, FaTv, FaBath, FaWind, FaCoffee } from 'react-icons/fa';
import './SearchBooking.css';

interface BookingDetails {
  code: string;
  roomTitle: string;
  roomDesc: string;
  roomImage: string;
  checkIn: string;
  checkOut: string;
  guests: string[];
  total: number;
}

interface SearchBookingProps {
  lastBooking?: BookingDetails | null;
  onNavigateHome: () => void;
}

export function SearchBooking({ lastBooking, onNavigateHome }: SearchBookingProps) {
  const [searchCode, setSearchCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<BookingDetails | null>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    // If input is empty, fallback to the default code
    const queryCode = searchCode.trim() ? searchCode.trim().toUpperCase() : '9XY384-586KLM';

    // 1. Check if it matches the last booked reservation code
    if (lastBooking && queryCode === lastBooking.code.toUpperCase()) {
      setSearchResult(lastBooking);
    } 
    // 2. Check if it matches the mock code from the success screen or the default mock
    else if (queryCode === '9XY384-586KLM') {
      setSearchResult({
        code: '9XY384-586KLM',
        roomTitle: 'Habitación Simple',
        roomDesc: 'Pensada para quienes buscan comodidad y funcionalidad, nuestra Habitación Simple ofrece un espacio acogedor y bien equipado para disfrutar de una estadía tranquila. Perfecta para viajeros solos o estancias cortas.',
        roomImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        checkIn: '20/10/2025',
        checkOut: '25/10/2025',
        guests: ['Jorge Gonzalo Nina Retamozo'],
        total: 350.00,
      });
    } 
    // 3. Allow any search to display a nice mock result so it is easy to test
    else {
      setSearchResult({
        code: queryCode,
        roomTitle: 'Habitación Simple',
        roomDesc: 'Pensada para quienes buscan comodidad y funcionalidad, nuestra Habitación Simple ofrece un espacio acogedor y bien equipado para disfrutar de una estadía tranquila. Perfecta para viajeros solos o estancias cortas.',
        roomImage: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
        checkIn: '20/10/2025',
        checkOut: '25/10/2025',
        guests: ['Jorge Gonzalo Nina Retamozo'],
        total: 350.00,
      });
    }
  };

  // Helper to render matching service icons for the room type
  const renderRoomIcons = (title: string) => {
    const isMatrimonial = title.toLowerCase().includes('matrimonial');
    const isDoble = title.toLowerCase().includes('doble');

    return (
      <div className="search-result-icons-list">
        <div className="search-icon-circle-wrapper" title="Wi-Fi de alta velocidad">
          <FaWifi />
        </div>
        <div className="search-icon-circle-wrapper" title="Televisor LED">
          <FaTv />
        </div>
        <div className="search-icon-circle-wrapper" title="Ducha con agua caliente">
          <FaBath />
        </div>
        {isMatrimonial && (
          <div className="search-icon-circle-wrapper" title="Aire acondicionado">
            <FaWind />
          </div>
        )}
        {isDoble && (
          <>
            <div className="search-icon-circle-wrapper" title="Aire acondicionado">
              <FaWind />
            </div>
            <div className="search-icon-circle-wrapper" title="Cafetera / Desayuno">
              <FaCoffee />
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="search-booking-page">
      {/* Hero Section - Identical style and sizes to Booking Page Hero */}
      <div className="booking-hero">
        <div className="booking-hero-overlay"></div>
        <div className="booking-hero-content">
          <h1 className="booking-hero-title">Buscar Reserva</h1>
          <div className="booking-hero-divider"></div>
          <p className="booking-hero-subtitle">
            Donde tu próxima estancia comienza, y los mejores momentos te esperan
          </p>
        </div>
      </div>

      <div className="container search-container-main">
        {/* Search Bar Container */}
        <div className="search-bar-card">
          <form className="search-bar-form" onSubmit={handleSearch}>
            <div className="search-input-field-wrapper">
              <FaSearch className="search-input-icon" />
              <input 
                type="text" 
                placeholder="Ingrese su código de reserva (ej. 9XY384-586KLM)" 
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                className="search-text-input"
              />
            </div>
            <button type="submit" className="search-submit-btn">
              <span>Buscar</span>
              <FaSearch size={12} />
            </button>
          </form>
        </div>

        {/* Results Area */}
        <div className="search-results-area">
          {!hasSearched && (
            <p className="initial-search-message">
              Ingrese su código de reserva para realizar una búsqueda
            </p>
          )}

          {hasSearched && !searchResult && (
            <motion.div 
              className="search-no-results-card"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <h3>No se encontraron resultados</h3>
              <p>Por favor verifique que el código ingresado sea el correcto e inténtelo de nuevo.</p>
            </motion.div>
          )}

          {hasSearched && searchResult && (
            <div className="search-result-container-card">
              <div className="search-result-main-layout">
                {/* Left Side: Image */}
                <motion.div 
                  className="search-result-image-wrapper"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0, ease: [0.16, 1, 0.3, 1] }}
                >
                  <img 
                    src={searchResult.roomImage} 
                    alt={searchResult.roomTitle} 
                    className="search-result-room-image" 
                  />
                </motion.div>

                {/* Right Side: Details */}
                <motion.div 
                  className="search-result-details-wrapper"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h2 className="search-result-room-title">{searchResult.roomTitle}</h2>
                  <p className="search-result-room-desc">{searchResult.roomDesc}</p>

                  <h3 className="search-result-section-heading">Servicios incluidos</h3>
                  {renderRoomIcons(searchResult.roomTitle)}

                  <div className="search-result-meta-info">
                    <p className="guests-registered-count">
                      <strong>{searchResult.guests.length}</strong> {searchResult.guests.length === 1 ? 'persona registrada' : 'personas registradas'}
                    </p>
                    <p className="dates-stay-info">
                      Estancia desde el <strong className="bold-highlight">{searchResult.checkIn}</strong> hasta el <strong className="bold-highlight">{searchResult.checkOut}</strong>
                    </p>
                  </div>

                  <div className="search-result-divider"></div>

                  <div className="search-result-price-row">
                    <span className="price-row-label">Costo de la reserva</span>
                    <span className="price-row-value">S/ {searchResult.total.toFixed(2)}</span>
                  </div>

                  <p className="hotel-day-note-text">
                    Recuerde que el dia hotelero termina a las 12:00 p.m.
                  </p>

                  <div className="search-result-actions-row">
                    <button 
                      type="button" 
                      className="btn-outline-brown" 
                      onClick={onNavigateHome}
                    >
                      Volver al inicio
                    </button>
                    <button 
                      type="button" 
                      className="btn-solid-brown" 
                      onClick={() => window.print()}
                    >
                      Imprimir
                    </button>
                    <button 
                      type="button" 
                      className="btn-outline-brown" 
                      onClick={() => alert('Si necesita ayuda con su reserva, contáctenos al (01) 555-0199 o mediante la página de Contacto.')}
                    >
                      Ayuda
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

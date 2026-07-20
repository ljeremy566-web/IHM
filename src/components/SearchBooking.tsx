import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FaSearch, FaWifi, FaTv, FaBath, FaWind, FaCoffee } from 'react-icons/fa';
import './SearchBooking.css';

export interface BookingRoomItem {
  id: number;
  title: string;
  desc: string;
  image: string;
  price: number;
  quantity: number;
  nights?: number;
}

export interface BookingDetails {
  code: string;
  checkIn: string;
  checkOut: string;
  guests: string[];
  total: number;
  rooms?: BookingRoomItem[];
  roomTitle?: string;
  roomDesc?: string;
  roomImage?: string;
  payerName?: string;
  payerDocId?: string;
  payerDocType?: string;
  phone?: string;
  email?: string;
  paymentMethod?: string;
  boletaCode?: string;
  boletaDate?: string;
}

function numeroALetras(num: number): string {
  const unidades = ['CERO', 'UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO', 'SEIS', 'SIETE', 'OCHO', 'NUEVE'];
  const decenas = ['', 'DIEZ', 'VEINTE', 'TREINTA', 'CUARENTA', 'CINCUENTA', 'SESENTA', 'SETENTA', 'OCHENTA', 'NOVENTA'];
  const especiales = {
    11: 'ONCE', 12: 'DOCE', 13: 'TRECE', 14: 'CATORCE', 15: 'QUINCE',
    16: 'DIECISEIS', 17: 'DIECISIETE', 18: 'DIECIOCHO', 19: 'DIECINUEVE',
    21: 'VEINTIUNO', 22: 'VEINTIDOS', 23: 'VEINTITRES', 24: 'VEINTICUATRO',
    25: 'VEINTICINCO', 26: 'VEINTISEIS', 27: 'VEINTISIETE', 28: 'VEINTIOCHO', 29: 'VEINTINUEVE'
  };
  const centenas = ['', 'CIENTO', 'DOSCIENTOS', 'TRESCIENTOS', 'CUATROCIENTOS', 'QUINIENTOS', 'SEISCIENTOS', 'SIETECIENTOS', 'OCHOCIENTOS', 'NOVECIENTOS'];

  const entero = Math.floor(num);
  const centavos = Math.round((num - entero) * 100);

  let letras = '';

  if (entero === 100) {
    letras = 'CIEN';
  } else if (entero < 10) {
    letras = unidades[entero];
  } else if (entero < 30) {
    letras = (especiales as any)[entero] || (decenas[Math.floor(entero / 10)] + ' Y ' + unidades[entero % 10]);
  } else if (entero < 100) {
    const d = Math.floor(entero / 10);
    const u = entero % 10;
    letras = decenas[d] + (u > 0 ? ' Y ' + unidades[u] : '');
  } else if (entero < 1000) {
    const c = Math.floor(entero / 100);
    const resto = entero % 100;
    let restoStr = '';
    if (resto > 0) {
      if (resto < 10) restoStr = ' ' + unidades[resto];
      else if (resto < 30) restoStr = ' ' + ((especiales as any)[resto] || (decenas[Math.floor(resto / 10)] + ' Y ' + unidades[resto % 10]));
      else {
        const d = Math.floor(resto / 10);
        const u = resto % 10;
        restoStr = ' ' + decenas[d] + (u > 0 ? ' Y ' + unidades[u] : '');
      }
    }
    letras = centenas[c] + restoStr;
  } else if (entero < 1000000) {
    const m = Math.floor(entero / 1000);
    const resto = entero % 1000;
    const miles = m === 1 ? 'MIL' : numeroALetras(m).split(' Y ')[0] + ' MIL';
    letras = miles + (resto > 0 ? ' ' + numeroALetras(resto).split(' Y ')[0] : '');
  } else {
    letras = 'CIENTO';
  }

  return `${letras} Y ${centavos.toString().padStart(2, '0')}/100 SOLES`;
}

interface SearchBookingProps {
  lastBooking?: BookingDetails | null;
  onNavigateHome: () => void;
  onNavigateContact?: () => void;
}

export function SearchBooking({ lastBooking, onNavigateHome, onNavigateContact }: SearchBookingProps) {
  const [searchCode, setSearchCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<BookingDetails | null>(null);
  const [searchError, setSearchError] = useState<string | null>(null);

  useEffect(() => {
    if (lastBooking) {
      setSearchCode(lastBooking.code);
      setHasSearched(false);
      setSearchResult(null);
    }
  }, [lastBooking]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchCode.trim()) {
      setSearchError('Por favor, ingrese un código de reserva.');
      setHasSearched(false);
      setSearchResult(null);
      return;
    }
    
    setSearchError(null);
    setHasSearched(true);
    
    const queryCode = searchCode.trim().toUpperCase();

    // 1. Check if it matches the last booked reservation code
    if (lastBooking && queryCode === lastBooking.code.toUpperCase()) {
      setSearchResult(lastBooking);
    } 
    // 2. Check if it matches the mock code from the success screen or the default mock
    else if (queryCode === '9XY384-586KLM') {
      setSearchResult({
        code: '9XY384-586KLM',
        checkIn: '20/10/2025',
        checkOut: '25/10/2025',
        guests: ['Jorge Gonzalo Nina Retamozo'],
        total: 280.00,
        rooms: [
          {
            id: 1,
            title: 'Habitación Simple',
            desc: 'Pensada para quienes buscan comodidad y funcionalidad, nuestra Habitación Simple ofrece un espacio acogedor y bien equipado para disfrutar de una estadía tranquila.',
            image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
            price: 70,
            quantity: 1,
            nights: 1
          },
          {
            id: 2,
            title: 'Habitación Matrimonial',
            desc: 'Diseñada para ofrecer confort y privacidad, nuestra Habitación Matrimonial es el espacio perfecto para parejas o viajeros que buscan un ambiente acogedor y relajante.',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
            price: 90,
            quantity: 1,
            nights: 1
          },
          {
            id: 3,
            title: 'Habitación Doble',
            desc: 'Nuestra Habitación Doble está diseñada para ofrecer comodidad y amplitud, ideal para dos o hasta tres personas que buscan un espacio acogedor y funcional.',
            image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
            price: 120,
            quantity: 1,
            nights: 1
          }
        ]
      });
    } 
    // 3. Allow any search to display a nice mock result so it is easy to test
    else {
      setSearchResult({
        code: queryCode,
        checkIn: '20/10/2025',
        checkOut: '25/10/2025',
        guests: ['Jorge Gonzalo Nina Retamozo'],
        total: 350.00,
        rooms: [
          {
            id: 1,
            title: 'Habitación Matrimonial',
            desc: 'Diseñada para ofrecer confort y privacidad, nuestra Habitación Matrimonial es el espacio perfecto para parejas.',
            image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
            price: 90,
            quantity: 1,
            nights: 1
          }
        ]
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

  const getDisplayRooms = (res: BookingDetails): BookingRoomItem[] => {
    if (res.rooms && res.rooms.length > 0) {
      return res.rooms;
    }
    return [
      {
        id: 1,
        title: res.roomTitle || 'Habitación Matrimonial',
        desc: res.roomDesc || 'Diseñada para ofrecer confort y privacidad, nuestra habitación ofrece un ambiente acogedor y relajante.',
        image: res.roomImage || 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
        price: res.total || 90,
        quantity: 1,
        nights: 1
      }
    ];
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
          {searchError && (
            <motion.div 
              className="search-error-message-card"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                backgroundColor: '#fff5f5',
                border: '1px solid #feb2b2',
                borderLeft: '4px solid #e53e3e',
                color: '#c53030',
                padding: '0.85rem 1.2rem',
                borderRadius: '10px',
                fontFamily: 'var(--font-base)',
                fontSize: '0.9rem',
                fontWeight: '600',
                marginBottom: '1.5rem',
                textAlign: 'left'
              }}
            >
              {searchError}
            </motion.div>
          )}

          {!hasSearched && !searchError && (
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
              {/* Render each booked room item */}
              {getDisplayRooms(searchResult).map((room, idx, arr) => (
                <div 
                  key={room.id || idx} 
                  className="search-result-main-layout" 
                  style={{ 
                    marginBottom: idx < arr.length - 1 ? '2rem' : '0', 
                    paddingBottom: idx < arr.length - 1 ? '2rem' : '0', 
                    borderBottom: idx < arr.length - 1 ? '1px solid #e2e0d8' : 'none' 
                  }}
                >
                  {/* Left Side: Image */}
                  <motion.div 
                    className="search-result-image-wrapper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <img 
                      src={room.image} 
                      alt={room.title} 
                      className="search-result-room-image" 
                    />
                  </motion.div>

                  {/* Right Side: Details */}
                  <motion.div 
                    className="search-result-details-wrapper"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.8rem', marginBottom: '0.4rem' }}>
                      <h2 className="search-result-room-title" style={{ margin: 0 }}>{room.title}</h2>
                      <span style={{ backgroundColor: '#733527', color: '#ffffff', fontFamily: 'var(--font-base)', fontSize: '0.82rem', fontWeight: '700', padding: '0.3rem 0.8rem', borderRadius: '20px', flexShrink: 0 }}>
                        {room.quantity} {room.quantity === 1 ? 'habitación' : 'habitaciones'}
                      </span>
                    </div>
                    <p className="search-result-room-desc">{room.desc}</p>

                    <h3 className="search-result-section-heading">Servicios incluidos</h3>
                    {renderRoomIcons(room.title)}

                    <div style={{ marginTop: '0.8rem', fontSize: '0.92rem', color: '#4a483f', fontWeight: '600' }}>
                      Costo por este tipo de habitación: <strong style={{ color: '#151414', fontSize: '1.05rem', fontFamily: 'var(--font-condensed)' }}>S/ {(room.price * room.quantity * (room.nights || 1)).toFixed(2)}</strong>
                    </div>
                  </motion.div>
                </div>
              ))}

              {/* Shared Summary & Meta Footer */}
              <div style={{ borderTop: '2px solid #edeae0', paddingTop: '1.6rem', marginTop: '1.6rem' }}>
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
                  <span className="price-row-label">TOTAL GENERAL DE LA RESERVA</span>
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
                    onClick={() => {
                      if (onNavigateContact) onNavigateContact();
                    }}
                  >
                    Ayuda
                  </button>
                </div>
              </div>
            </div>
          )}
      {/* Print-only Boleta template */}
      {searchResult && (
        <div id="boleta-print-only-container">
          <div 
            style={{ 
              width: '740px', 
              padding: '1.2rem', 
              background: '#ffffff', 
              color: '#000000',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '11.5px',
              lineHeight: '1.25',
              boxSizing: 'border-box',
              margin: '0 auto'
            }}
          >
            {/* Main border box */}
            <div style={{ border: '1.5px solid #000000', padding: '1rem', minHeight: '600px', position: 'relative', boxSizing: 'border-box' }}>
              
              {/* Header section */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.6rem', color: '#000000' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '60%', verticalAlign: 'top' }}>
                      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '0.1rem' }}>HOSTAL KIN</div>
                      <div style={{ fontWeight: 'bold', fontSize: '11px', marginBottom: '0.4rem' }}>HOSTAL KIN S.A.C.</div>
                      <div style={{ fontSize: '10px', color: '#000000', lineHeight: '1.3' }}>
                        MZ. A LT. 1 EL BOSQUE
                        <br />
                        NUEVO CHIMBOTE - ANCASH - PERU
                      </div>
                    </td>
                    <td style={{ width: '40%', verticalAlign: 'top', paddingLeft: '1rem' }}>
                      <div style={{ border: '1.5px solid #000000', borderRadius: '2px', padding: '0.6rem', textAlign: 'center' }}>
                        <div style={{ fontWeight: 'bold', fontSize: '10px', letterSpacing: '0.5px' }}>BOLETA DE VENTA ELECTRONICA</div>
                        <div style={{ fontWeight: 'bold', fontSize: '11px', margin: '0.2rem 0' }}>RUC: 20609476941</div>
                        <div style={{ fontWeight: 'bold', fontSize: '12px' }}>{searchResult.boletaCode || 'EB01-138'}</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Separator Line */}
              <hr style={{ border: 'none', borderTop: '1.5px solid #000000', margin: '0.5rem 0' }} />

              {/* Metadata / Payer details */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.8rem', color: '#000000', fontSize: '11px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '135px', padding: '1px 0' }}>Fecha de Vencimiento</td>
                    <td style={{ width: '15px', textAlign: 'center' }}>:</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1px 0' }}>Fecha de Emisión</td>
                    <td style={{ textAlign: 'center' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{searchResult.boletaDate || new Date().toLocaleString('es-PE')}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1px 0' }}>Señor(es)</td>
                    <td style={{ textAlign: 'center' }}>:</td>
                    <td style={{ fontWeight: 'bold', textTransform: 'uppercase' }}>{searchResult.payerName || 'Jorge Gonzalo Nina Retamozo'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1px 0' }}>{searchResult.payerDocType || 'DNI'}</td>
                    <td style={{ textAlign: 'center' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>{searchResult.payerDocId || '002788537'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1px 0' }}>Tipo de Moneda</td>
                    <td style={{ textAlign: 'center' }}>:</td>
                    <td style={{ fontWeight: 'bold' }}>SOLES</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1px 0' }}>Observación</td>
                    <td style={{ textAlign: 'center' }}>:</td>
                    <td>-</td>
                  </tr>
                </tbody>
              </table>

              {/* Main Items Table */}
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '0.8rem', color: '#000000', fontSize: '11px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #000000', borderTop: '1px solid #000000' }}>
                    <th style={{ textAlign: 'right', padding: '0.2rem 0.4rem', width: '10%', fontWeight: 'bold' }}>Cantidad</th>
                    <th style={{ textAlign: 'center', padding: '0.2rem 0.4rem', width: '15%', fontWeight: 'bold' }}>Unidad Medida</th>
                    <th style={{ textAlign: 'left', padding: '0.2rem 0.4rem', width: '45%', fontWeight: 'bold' }}>Descripción</th>
                    <th style={{ textAlign: 'right', padding: '0.2rem 0.4rem', width: '12%', fontWeight: 'bold' }}>Valor Unitario(*)</th>
                    <th style={{ textAlign: 'right', padding: '0.2rem 0.4rem', width: '8%', fontWeight: 'bold' }}>Descuento(*)</th>
                    <th style={{ textAlign: 'right', padding: '0.2rem 0.4rem', width: '10%', fontWeight: 'bold' }}>Importe de Venta(**)</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const itemsToRender = searchResult.rooms || [];
                    
                    // Parse check-in and check-out to get number of nights
                    let checkoutNights = 1;
                    if (searchResult.checkIn && searchResult.checkOut) {
                      try {
                        const [inD, inM, inY] = searchResult.checkIn.split('/');
                        const [outD, outM, outY] = searchResult.checkOut.split('/');
                        const inDate = new Date(parseInt(inY), parseInt(inM) - 1, parseInt(inD));
                        const outDate = new Date(parseInt(outY), parseInt(outM) - 1, parseInt(outD));
                        checkoutNights = Math.max(1, Math.ceil(
                          (outDate.getTime() - inDate.getTime()) / (1000 * 60 * 60 * 24)
                        ));
                      } catch (e) {
                        checkoutNights = 1;
                      }
                    }

                    if (itemsToRender.length > 0) {
                      return itemsToRender.map((item, idx) => {
                        const itemTotal = item.price * item.quantity * checkoutNights;
                        const unitVal = (item.price * checkoutNights) / 1.18;
                        return (
                          <tr key={idx}>
                            <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>{item.quantity.toFixed(2)}</td>
                            <td style={{ textAlign: 'center', padding: '0.2rem 0.4rem' }}>UNIDAD</td>
                            <td style={{ textAlign: 'left', padding: '0.2rem 0.4rem', textTransform: 'uppercase' }}>{item.title} - {checkoutNights} {checkoutNights === 1 ? 'NOCHE' : 'NOCHES'}</td>
                            <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>{unitVal.toFixed(5)}</td>
                            <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>0.00</td>
                            <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>{itemTotal.toFixed(2)}</td>
                          </tr>
                        );
                      });
                    } else {
                      const roomTitle = searchResult.roomTitle || 'Habitación Matrimonial';
                      const roomTotal = searchResult.total;
                      const unitVal = roomTotal / 1.18;
                      return (
                        <tr>
                          <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>1.00</td>
                          <td style={{ textAlign: 'center', padding: '0.2rem 0.4rem' }}>UNIDAD</td>
                          <td style={{ textAlign: 'left', padding: '0.2rem 0.4rem', textTransform: 'uppercase' }}>{roomTitle} - {checkoutNights} {checkoutNights === 1 ? 'NOCHE' : 'NOCHES'}</td>
                          <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>{unitVal.toFixed(5)}</td>
                          <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>0.00</td>
                          <td style={{ textAlign: 'right', padding: '0.2rem 0.4rem' }}>{roomTotal.toFixed(2)}</td>
                        </tr>
                      );
                    }
                  })()}
                </tbody>
              </table>

              {/* Separator line after table */}
              <hr style={{ border: 'none', borderTop: '1.5px solid #000000', margin: '0.4rem 0' }} />

              {/* Tax info & Total Summary Grid */}
              <table style={{ width: '100%', borderCollapse: 'collapse', color: '#000000', fontSize: '11px' }}>
                <tbody>
                  <tr>
                    <td style={{ width: '60%', verticalAlign: 'top' }}>
                      <div style={{ fontSize: '9.5px', color: '#000000', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                        (*) Sin impuestos.
                        <br />
                        (**) Incluye impuestos, de ser Op. Gravada.
                      </div>
                      <div style={{ fontWeight: 'bold', fontSize: '10.5px' }}>
                        SON: {numeroALetras(searchResult.total)}
                      </div>
                    </td>
                    <td style={{ width: '40%', verticalAlign: 'top' }}>
                      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <tbody>
                          {(() => {
                            const checkoutTotal = searchResult.total;
                            const opGravada = checkoutTotal / 1.18;
                            const igv = checkoutTotal - opGravada;
                            return (
                              <>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Op. Gravada:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000', width: '110px' }}>S/ {opGravada.toFixed(2)}</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Op. Exonerada:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Op. Inafecta:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>ISC:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>IGV:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ {igv.toFixed(2)}</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Otros Cargos:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Otros Tributos:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Monto de Redondeo:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1px solid #000000' }}>S/ 0.00</td>
                                </tr>
                                <tr>
                                  <td style={{ textAlign: 'right', padding: '2px 6px', fontWeight: 'bold' }}>Importe Total:</td>
                                  <td style={{ textAlign: 'right', padding: '2px 8px', border: '1.5px solid #000000', fontWeight: 'bold', backgroundColor: '#f5f5f5' }}>S/ {checkoutTotal.toFixed(2)}</td>
                                </tr>
                              </>
                            );
                          })()}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* Footer Legal message box */}
              <div style={{ border: '1px solid #000000', padding: '0.4rem', fontSize: '9px', textAlign: 'center', lineHeight: '1.4', marginTop: '0.8rem', color: '#000000' }}>
                Esta es una representación impresa de la Boleta de Venta Electrónica, generada en el Sistema de la SUNAT. El Emisor
                Electrónico puede verificarla utilizando su clave SOL, el Adquirente o Usuario puede consultar su validez en SUNAT Virtual:
                <br />
                <span style={{ textDecoration: 'underline', color: '#0000ee' }}>www.sunat.gob.pe</span>, en Opciones sin Clave SOL/ Consulta de Validez del CPE.
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    </div>
  );
}

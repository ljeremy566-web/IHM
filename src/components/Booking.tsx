import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { 
  FaWifi, 
  FaTv, 
  FaBath, 
  FaWind, 
  FaCoffee, 
  FaSearch, 
  FaInfoCircle,
  FaUserFriends
} from 'react-icons/fa';
import type { CartItem } from '../App';
import DatePicker from './DatePicker';
import './Booking.css';

interface Room {
  id: number;
  title: string;
  desc: string;
  image: string;
  price: string;
  availableCount: number;
  icons: ReactNode[];
}
interface BookingProps {
  onAddToCart?: (roomTitle: string, price: number, image: string, quantity: number) => void;
  cart?: CartItem[];
  initialStep?: 'fecha' | 'pago';
  initialCheckoutType?: 'single' | 'cart';
}

export function Booking({ 
  onAddToCart, 
  cart = [], 
  initialStep = 'fecha', 
  initialCheckoutType = 'single'
}: BookingProps) {
  const [step, setStep] = useState<'fecha' | 'habitacion' | 'pago' | 'finalizado'>('fecha');
  const [checkoutType, setCheckoutType] = useState<'single' | 'cart'>('single');

  useEffect(() => {
    if (initialStep) {
      setStep(initialStep);
    }
  }, [initialStep]);

  useEffect(() => {
    if (initialCheckoutType) {
      setCheckoutType(initialCheckoutType);
    }
  }, [initialCheckoutType]);
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  const [fechaLlegada, setFechaLlegada] = useState('');
  const [fechaSalida, setFechaSalida] = useState('');

  useEffect(() => {
    if (fechaLlegada && fechaSalida && fechaSalida < fechaLlegada) {
      setFechaSalida(fechaLlegada);
    }
  }, [fechaLlegada]);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'book' | 'cart'>('book');
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [huespedes, setHuespedes] = useState<string[]>(['']);

  const getMaxGuests = (roomId: number) => {
    if (roomId === 1) return 1;
    if (roomId === 2) return 2;
    if (roomId === 3) return 3;
    return 2;
  };

  // Payment states
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape'>('card');
  const [yapeTab, setYapeTab] = useState<'num' | 'qr'>('qr');
  const [docType, setDocType] = useState('DNI');
  const [docOpen, setDocOpen] = useState(false);
  const [docId, setDocId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [yapeCode, setYapeCode] = useState(['', '', '', '', '', '']);

  const handleYapeCodeChange = (index: number, val: string) => {
    if (/^[0-9]?$/.test(val)) {
      const nextCode = [...yapeCode];
      nextCode[index] = val;
      setYapeCode(nextCode);
      if (val && index < 5) {
        const nextInput = document.getElementById(`yape-code-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
    }
  };
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Success states
  const [copied, setCopied] = useState(false);

  const openModal = (type: 'book' | 'cart', room: Room) => {
    setModalType(type);
    setSelectedRoom(room);
    const max = getMaxGuests(room.id);
    const prefilled = type === 'book'
      ? ['Jorge Gonzalo Nina Retamozo', ...Array(max - 1).fill('')]
      : ['Carlos Alberto Reyes Casusol', ...Array(max - 1).fill('')];
    setHuespedes(prefilled);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  const handleConfirmModal = () => {
    if (modalType === 'cart' && selectedRoom && onAddToCart) {
      const filledCount = huespedes.filter(h => h.trim()).length;
      const qty = filledCount || 1;
      onAddToCart(selectedRoom.title, parseFloat(selectedRoom.price), selectedRoom.image, qty);
      closeModal();
    }
    if (modalType === 'book' && selectedRoom) {
      setIsModalOpen(false);
      setStep('pago');
    }
  };

  // Format YYYY-MM-DD to DD/MM/YYYY for display
  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSelectedRoom(null);
    setStep('habitacion');
  };

  const ROOMS: Room[] = [
    {
      id: 1,
      title: "Habitación Simple",
      desc: "Pensada para quienes buscan comodidad y funcionalidad, nuestra Habitación Simple ofrece un espacio acogedor y bien equipado para disfrutar de una estadía tranquila. Perfecta para viajeros solos o estancias cortas.",
      image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      price: "70.00",
      availableCount: 10,
      icons: [
        <FaWifi key="wifi" title="Wi-Fi de alta velocidad" />,
        <FaTv key="tv" title="Televisor LED" />,
        <FaBath key="bath" title="Ducha con agua caliente" />
      ]
    },
    {
      id: 2,
      title: "Habitación Matrimonial",
      desc: "Diseñada para ofrecer confort y privacidad, nuestra Habitación Matrimonial es el espacio perfecto para parejas o viajeros que buscan un ambiente acogedor y relajante. Ideal para disfrutar de momentos de descanso.",
      image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop",
      price: "90.00",
      availableCount: 10,
      icons: [
        <FaWifi key="wifi" title="Wi-Fi de alta velocidad" />,
        <FaTv key="tv" title="Televisor LED" />,
        <FaBath key="bath" title="Ducha con agua caliente" />,
        <FaWind key="wind" title="Aire acondicionado" />
      ]
    },
    {
      id: 3,
      title: "Habitación Doble",
      desc: "Nuestra Habitación Doble está diseñada para ofrecer comodidad y amplitud, ideal para dos o hasta tres personas que buscan un espacio acogedor y funcional ya sea para amigos, familiares o pequeños grupos que viajan juntos.",
      image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
      price: "120.00",
      availableCount: 10,
      icons: [
        <FaWifi key="wifi" title="Wi-Fi de alta velocidad" />,
        <FaTv key="tv" title="Televisor LED" />,
        <FaBath key="bath" title="Ducha con agua caliente" />,
        <FaWind key="wind" title="Aire acondicionado" />,
        <FaCoffee key="coffee" title="Cafetera / Desayuno" />
      ]
    }
  ];

  return (
    <div className="booking-page">
      {/* Hero Section */}
      <div className="booking-hero">
        <div className="booking-hero-overlay"></div>
        <div className="booking-hero-content">
          <h1 className="booking-hero-title">Reserva</h1>
          <div className="booking-hero-divider"></div>
          <p className="booking-hero-subtitle">
            "Te ofrecemos la mejor experiencia que puedes imaginar"
          </p>
        </div>
      </div>

      {/* Timeline Steps */}
      <div className="container">
        <div className="booking-timeline">
          <div className="timeline-labels">
            <span className={`step-label ${step === 'fecha' || step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' ? 'completed' : ''}`}>Fecha</span>
            <span className={`step-label ${step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' && step !== 'habitacion' ? 'completed' : ''}`}>Habitación</span>
            <span className={`step-label ${step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}>Pago</span>
            <span className={`step-label ${step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}>Finalizado</span>
          </div>

          <div className="timeline-track">
            <div className="timeline-line">
              <div 
                className="timeline-line-active" 
                style={{ width: step === 'fecha' ? '12.5%' : step === 'habitacion' ? '37.5%' : step === 'pago' ? '62.5%' : '100%' }}
              ></div>
            </div>
            <div className="timeline-circles">
              <div className={`step-circle ${step === 'fecha' || step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' ? 'completed' : ''}`}></div>
              <div className={`step-circle ${step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' && step !== 'habitacion' ? 'completed' : ''}`}></div>
              <div className={`step-circle ${step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}></div>
              <div className={`step-circle ${step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}></div>
            </div>
          </div>
        </div>

        {/* Search Bar Container - Hidden in Step Finalizado */}
        {(step === 'fecha' || step === 'habitacion') && (
          <div className="booking-search-card">
            <form className="booking-search-form" onSubmit={handleSearch}>
              <DatePicker
                label="Fecha de Llegada"
                value={fechaLlegada}
                onChange={setFechaLlegada}
                minDate={todayStr}
                placeholder="Seleccionar fecha"
              />

              <DatePicker
                label="Fecha de Salida"
                value={fechaSalida}
                onChange={setFechaSalida}
                minDate={fechaLlegada || todayStr}
                placeholder="Seleccionar fecha"
              />

              <button type="submit" className="booking-search-btn">
                <span>Buscar</span>
                <FaSearch size={12} />
              </button>
            </form>
          </div>
        )}

        {/* Results / Payment / Success Area */}
        <div className="booking-results-area">
          {step === 'fecha' && (
            <div className="booking-initial-message">
              <p>Rellena tus datos y realiza la búsqueda</p>
            </div>
          )}

          {step === 'habitacion' && (
            <div className="room-results-list">
              {ROOMS.map((room) => (
                <div key={room.id} className="room-result-card">
                  {/* Left Column: Image */}
                  <div className="room-card-image-col">
                    <img src={room.image} alt={room.title} className="room-card-image" />
                    <FaInfoCircle className="room-card-info-icon" />
                  </div>

                  {/* Middle Column: Details */}
                  <div className="room-card-details-col">
                    <h2 className="room-card-title">{room.title}</h2>
                    <p className="room-card-desc">{room.desc}</p>
                    <div className="room-card-footer">
                      <div className="room-card-icons">
                        {room.icons.map((icon, idx) => (
                          <span key={idx} className="room-card-feature-icon">{icon}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Price & Actions */}
                  <div className="room-card-pricing-col">
                    <div className="room-pricing-info">
                      <span className="room-status-badge">DISPONIBLE</span>
                      <div className="room-price-container">
                        <span className="room-price-value">S/ {room.price}</span>
                      </div>
                      <span className="room-urgency-badge">¡Ultimas Habitaciones!</span>
                      <span className="room-card-availability">
                        Solo {room.availableCount} habitaciones disponibles
                      </span>
                    </div>
                    <div className="room-card-actions">
                      <button 
                        className="room-btn-book" 
                        type="button"
                        onClick={() => openModal('book', room)}
                      >
                        RESERVA AHORA
                      </button>
                      <button 
                        className="room-btn-cart" 
                        type="button"
                        onClick={() => openModal('cart', room)}
                      >
                        AÑADIR AL CARRITO
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 'pago' && (() => {
            const room = selectedRoom || ROOMS[1];
            const nights = fechaLlegada && fechaSalida
              ? Math.max(1, Math.ceil(
                  (new Date(fechaSalida).getTime() - new Date(fechaLlegada).getTime()) / (1000 * 60 * 60 * 24)
                ))
              : 1;
            let totalVal = 0;
            let sumPerNight = 0;

            if (checkoutType === 'cart') {
              sumPerNight = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
              totalVal = sumPerNight * nights;
            } else {
              const priceVal = parseFloat(room.price);
              totalVal = priceVal * nights;
            }
            
            return (
              <div className="payment-grid-layout fade-in">
                {/* Left Column: Summary Card */}
                {checkoutType === 'cart' ? (
                  <div className="payment-summary-card">
                    <div className="summary-header">
                      <h2 style={{ fontSize: '1.4rem', color: '#151414', fontFamily: 'var(--font-condensed)', fontWeight: '700' }}>Resumen de los gastos</h2>
                      <div className="cart-modal-divider" style={{ margin: '0.8rem 0' }}></div>
                    </div>
                    
                    <div className="summary-body">
                      <h4 style={{ fontFamily: 'var(--font-base)', textDecoration: 'underline', fontWeight: '800', color: '#151414', fontSize: '0.82rem', marginBottom: '1rem', textTransform: 'none' }}>Precio de Habitaciones por noche</h4>
                      {cart.map((item) => (
                        <div key={item.id} className="summary-row" style={{ border: 'none', borderBottom: '1px solid #d5d3cc', paddingBottom: '0.6rem', marginBottom: '1.2rem' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <span style={{ fontWeight: '700', color: '#151414', fontSize: '0.88rem' }}>{item.title}</span>
                            <span style={{ color: '#8f8d87', fontSize: '0.78rem' }}>Cantidad: {item.quantity}</span>
                          </div>
                          <span style={{ fontFamily: 'var(--font-condensed)', fontWeight: '700', color: '#151414', fontSize: '0.95rem', alignSelf: 'center' }}>S/ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                      
                      <h4 style={{ fontFamily: 'var(--font-base)', textDecoration: 'underline', fontWeight: '800', color: '#151414', fontSize: '0.82rem', marginTop: '1.4rem', marginBottom: '0.8rem', textTransform: 'none' }}>Tiempo de Estancia</h4>
                      <div className="summary-row">
                        <span>Total de noches</span>
                        <span style={{ fontWeight: '800' }}>{nights}</span>
                      </div>
                      <div className="summary-row" style={{ fontSize: '0.78rem', color: '#8f8d87', border: 'none', marginTop: '-0.5rem', marginBottom: '1.2rem' }}>
                        <span>({formatDateForDisplay(fechaLlegada)} - {formatDateForDisplay(fechaSalida)})</span>
                      </div>
                      
                      <div className="summary-total-row" style={{ borderTop: '1px solid #d5d3cc', paddingTop: '1.2rem' }}>
                        <span style={{ fontSize: '1rem', fontWeight: '800' }}>Total a pagar</span>
                        <span className="total-price-highlight" style={{ fontSize: '1.6rem' }}>S/ {totalVal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="payment-summary-card">
                    <div className="summary-header">
                      <h2>{room.title}</h2>
                      <p className="summary-dates">{formatDateForDisplay(fechaLlegada)} - {formatDateForDisplay(fechaSalida)}</p>
                      <div className="summary-guest-pill-wrapper">
                        <span className="summary-guest-pill">
                          <FaUserFriends className="guest-pill-icon" />
                          1 PERSONA
                        </span>
                      </div>
                      <div className="summary-divider"></div>
                    </div>

                    <div className="summary-body">
                      <h3>Resumen de la reserva</h3>
                      <div className="summary-divider"></div>
                      <div className="summary-row summary-detail-row">
                        <span>Precio por noche</span>
                        <span>S/ {(parseFloat(room.price) * 0.82).toFixed(2)}</span>
                      </div>
                      <div className="summary-row summary-detail-row">
                        <span>Cantidad de noches</span>
                        <span>{nights}</span>
                      </div>
                      <div className="summary-row">
                        <span>Subtotal</span>
                        <span>S/ {(parseFloat(room.price) * 0.82 * nights).toFixed(2)}</span>
                      </div>
                      <div className="summary-row">
                        <span>IGV (18%)</span>
                        <span>S/ {(parseFloat(room.price) * 0.18 * nights).toFixed(2)}</span>
                      </div>
                      <div className="summary-total-row">
                        <span>TOTAL A PAGAR</span>
                        <span className="total-price-highlight">S/ {totalVal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Right Column: Payment Form */}
                <div className="payment-form-card">
                  <div className="form-section-header">
                    <h3>Datos del titular</h3>
                    <span className="mandatory-label">Campos marcados con (*) son obligatorios</span>
                  </div>

                  <div className="holder-form-grid">
                    <div className="form-field">
                      <label style={{ color: '#c53030' }}>Documento de Identidad*</label>
                      <div className="doc-input-wrapper">
                        <div className="doc-custom-select" onClick={() => setDocOpen(!docOpen)}>
                          <span className="doc-selected-value">{docType}</span>
                          <span className="doc-arrow">▾</span>
                          {docOpen && (
                            <div className="doc-dropdown">
                              <div className="doc-option" onClick={() => { setDocType('DNI'); setDocOpen(false); }}>DNI</div>
                              <div className="doc-option" onClick={() => { setDocType('RUC'); setDocOpen(false); }}>RUC</div>
                            </div>
                          )}
                        </div>
                        <input 
                          type="text" 
                          placeholder="Ej: 12345678" 
                          value={docId} 
                          onChange={(e) => setDocId(e.target.value)}
                          className="doc-input"
                        />
                      </div>
                    </div>

                    <div className="form-field">
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="ejemplo@gmail.com" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label style={{ color: '#c53030' }}>Nombre*</label>
                      <input 
                        type="text" 
                        placeholder="Ej: John Alexander" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-field">
                      <label>Numero</label>
                      <input 
                        type="text" 
                        placeholder="Ej: 932527449" 
                        value={phone} 
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  {/* Payment Methods */}
                  <div className="payment-methods-section">
                    <h3>Metodos de pago</h3>
                    <div className="methods-selector-row">
                      <button 
                        type="button" 
                        className={`method-logo-btn ${paymentMethod === 'card' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('card')}
                      >
                        <span className="method-btn-text">Tarjeta</span>
                      </button>
                      <button 
                        type="button" 
                        className={`method-logo-btn ${paymentMethod === 'yape' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('yape')}
                      >
                        <span className="yape-pill-text">yape</span>
                      </button>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  {/* Payment Info Card Details */}
                  {paymentMethod === 'card' ? (
                    <>
                      <h3 className="payment-section-title">Informacion de pago</h3>
                      
                      <div className="form-field">
                        <label>Numero de tarjeta</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                        />
                      </div>

                      <div className="card-row-fields">
                        <div className="form-field flex-2">
                          <label>Fecha de vencimiento</label>
                          <input 
                            type="text" 
                            placeholder="MM / AA" 
                            value={expDate}
                            onChange={(e) => setExpDate(e.target.value)}
                          />
                        </div>
                        <div className="form-field flex-1">
                          <label>CVV</label>
                          <input 
                            type="text" 
                            placeholder="CVC" 
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="form-field">
                        <label>Nombre del titular</label>
                        <input 
                          type="text" 
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className={`yape-segmented ${yapeTab === 'qr' ? 'qr-active' : ''}`}>
                        <button 
                          type="button" 
                          className={`yape-seg-btn ${yapeTab === 'num' ? 'active' : ''}`}
                          onClick={() => setYapeTab('num')}
                        >
                          Numero
                        </button>
                        <button 
                          type="button" 
                          className={`yape-seg-btn ${yapeTab === 'qr' ? 'active' : ''}`}
                          onClick={() => setYapeTab('qr')}
                        >
                          Codigo QR
                        </button>
                      </div>

                      {yapeTab === 'qr' ? (
                        <div className="yape-qr-content">
                          <p className="yape-instruction">Escanee el codigo QR y complete el pago</p>
                          <div className="yape-qr-box">
                            <svg className="yape-qr-svg" viewBox="0 0 100 100">
                              <rect width="100" height="100" fill="white" />
                              {/* QR Code corners */}
                              <rect x="10" y="10" width="25" height="25" fill="#151414" />
                              <rect x="15" y="15" width="15" height="15" fill="white" />
                              <rect x="18" y="18" width="9" height="9" fill="#151414" />
                              
                              <rect x="65" y="10" width="25" height="25" fill="#151414" />
                              <rect x="70" y="15" width="15" height="15" fill="white" />
                              <rect x="73" y="18" width="9" height="9" fill="#151414" />
                              
                              <rect x="10" y="65" width="25" height="25" fill="#151414" />
                              <rect x="15" y="70" width="15" height="15" fill="white" />
                              <rect x="18" y="73" width="9" height="9" fill="#151414" />
                              
                              {/* QR Code random points */}
                              <rect x="45" y="20" width="10" height="10" fill="#151414" />
                              <rect x="40" y="40" width="20" height="20" fill="#151414" />
                              <rect x="45" y="45" width="10" height="10" fill="white" />
                              <rect x="75" y="45" width="10" height="15" fill="#151414" />
                              <rect x="15" y="45" width="15" height="10" fill="#151414" />
                              <rect x="70" y="70" width="15" height="15" fill="#151414" />
                              <rect x="75" y="75" width="5" height="5" fill="white" />
                            </svg>
                          </div>
                        </div>
                      ) : (
                        <div className="yape-num-content">
                          <h4 className="yape-num-heading">Ingresa tu numero de telefono</h4>
                          
                          <div className="form-field">
                            <label>Telefono</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 940 930 037" 
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          </div>
                          
                          <div className="form-field">
                            <label>Código de aprobación</label>
                            <div className="yape-code-grid">
                              {yapeCode.map((digit, idx) => (
                                <input
                                  key={idx}
                                  id={`yape-code-${idx}`}
                                  type="text"
                                  maxLength={1}
                                  value={digit}
                                  onChange={(e) => handleYapeCodeChange(idx, e.target.value)}
                                  className="yape-code-box"
                                  placeholder="•"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {!(paymentMethod === 'yape' && yapeTab === 'qr') && (
                    <button 
                      type="button" 
                      className="pay-now-btn"
                      onClick={() => setStep('finalizado')}
                    >
                      Pagar S/{totalVal.toFixed(0)}
                    </button>
                  )}
                </div>
              </div>
            );
          })()}

          {step === 'finalizado' && (
            <div className="success-container-card success-fade-in">
              <div className="success-icon-wrapper check-draw">
                <div className="success-circle">
                  <svg className="success-checkmark" viewBox="0 0 52 52">
                    <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
              </div>

              <h2 className="success-title text-stagger">Reserva Exitosa</h2>
              
              <div className="success-code-box text-stagger">
                <span className="code-box-label">Tu codigo de reserva es</span>
                <span className="code-box-value">9XY384-586KLM</span>
                <button 
                  type="button" 
                  className={`copy-code-btn ${copied ? 'copied' : ''}`}
                  onClick={() => {
                    navigator.clipboard.writeText('9XY384-586KLM');
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  <span>{copied ? '¡Copiado!' : 'Copiar código'}</span>
                </button>
              </div>

              <p className="success-description text-stagger">
                Con este codigo podras visualizar los detalles de tu reserva
              </p>
              <p className="success-urgency-note text-stagger">
                ¡No lo olvides!
              </p>

              <div className="success-actions-row buttons-stagger">
                <button 
                  className="success-btn-outline" 
                  type="button"
                  onClick={() => setStep('fecha')}
                >
                  Descargar
                </button>
                <button 
                  className="success-btn-solid" 
                  type="button"
                  onClick={() => setStep('fecha')}
                >
                  Ver mi reserva
                </button>
                <button 
                  className="success-btn-outline" 
                  type="button"
                  onClick={() => setStep('fecha')}
                >
                  Volver
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Guest Configuration Modal */}
      {isModalOpen && selectedRoom && (
        <div className="booking-modal-overlay" onClick={closeModal}>
          <div className="booking-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-container">
              <div className="modal-icon-circle">
                <FaUserFriends className="modal-users-icon" />
              </div>
            </div>

            <h2 className="modal-title">Registro de huespedes</h2>
            <p className="modal-subtitle">
              {selectedRoom.id === 1
                ? `Ingresa el nombre del huesped de la ${selectedRoom.title}`
                : `Ingresa el nombre de los huespedes de la ${selectedRoom.title}`}
            </p>

            <div className="modal-form">
              {huespedes.map((h, i) => (
                <div className="modal-input-field" key={i}>
                  <label>Huesped {i + 1}</label>
                  <input
                    type="text"
                    value={h}
                    onChange={(e) => {
                      const next = [...huespedes];
                      next[i] = e.target.value;
                      setHuespedes(next);
                    }}
                    placeholder="Ingrese DNI o Nombre Completo"
                  />
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="modal-btn-cancel" onClick={closeModal} type="button">
                CANCELAR
              </button>
              <button className="modal-btn-confirm" onClick={handleConfirmModal} type="button">
                {modalType === 'book' ? 'CONTINUAR' : 'GUARDAR'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

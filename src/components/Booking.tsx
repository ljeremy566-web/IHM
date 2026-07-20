import { useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { 
  FaWifi, 
  FaTv, 
  FaBath, 
  FaWind, 
  FaCoffee, 
  FaSearch, 
  FaInfoCircle,
  FaUserFriends,
  FaDownload,
  FaEye,
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationCircle,
  FaExclamationTriangle,
  FaChevronDown
} from 'react-icons/fa';
import type { CartItem } from '../App';
import DatePicker from './DatePicker';
import { RoomGalleryModal, type RoomGalleryData } from './RoomGalleryModal';
import yapeImg from '../img/logo-yape.png';
import './Booking.css';



const CardLogosSVG = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
    <svg width="26" height="16" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="32" rx="4" fill="#1A1F71"/>
      <path d="M19.8 22H16.7L18.6 10H21.7L19.8 22ZM33.5 10.3C32.9 10.1 32 9.9 30.9 9.9C27.6 9.9 25.3 11.6 25.3 14C25.3 15.8 26.9 16.8 28.2 17.4C29.5 18 29.9 18.4 29.9 19C29.9 19.9 28.8 20.3 27.7 20.3C26.1 20.3 25.2 20 24.4 19.6L23.9 21.9C24.8 22.3 26.4 22.6 28 22.6C31.5 22.6 33.8 20.9 33.8 18.4C33.8 16.9 32.8 15.7 30.7 14.7C29.5 14.1 28.8 13.7 28.8 13.1C28.8 12.5 29.5 12 30.8 12C31.8 12 32.6 12.2 33.2 12.5L33.5 10.3ZM41.4 10H38.9C38.1 10 37.5 10.2 37.2 11L32.7 22H35.9L36.5 20.2H40.5L40.9 22H43.7L41.4 10ZM37.4 17.8L39 13.2L39.9 17.8H37.4ZM15.5 10L12.5 18.2L12.1 16.3C11.6 14.6 10.1 12.7 8.3 11.7L11.1 22H14.4L19.4 10H15.5Z" fill="white"/>
    </svg>
    <svg width="26" height="16" viewBox="0 0 50 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="50" height="32" rx="4" fill="#0A0A0A"/>
      <circle cx="20" cy="16" r="9" fill="#EB001B"/>
      <circle cx="30" cy="16" r="9" fill="#F79E1B" fillOpacity="0.88"/>
    </svg>
  </div>
);

const RealisticQRCode = () => {
  const qrModules = [
    [1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,1,0,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,0,1,1,0,1,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,1,1,1,0,0,1,0,1,1,1,1,0,1,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,1,0,1,1,1,1,1,0,1,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,0,1,1,0,1,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1,0,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,0,1,1,1,1,0,1,0,1,1,0,1,1,0,1,1,1,1,0,1,1,0,1,1,1],
    [0,1,1,0,1,0,0,0,1,1,0,0,1,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,1],
    [1,0,1,1,0,1,1,0,0,1,0,1,0,1,1,1,0,1,1,0,1,1,0,1,1,0,1,0,1],
    [1,1,0,0,1,0,1,1,1,0,1,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1,0],
    [0,0,1,1,0,1,0,0,0,1,0,0,0,0,0,0,0,1,1,0,1,1,0,1,0,0,1,0,1],
    [1,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,1,0,1,0,1,0,1,1,0,1,0],
    [0,1,1,0,0,1,0,0,0,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,0,1,0,1],
    [1,0,1,1,1,0,1,1,1,0,1,0,0,0,0,0,1,0,1,0,1,0,1,0,1,1,0,1,0],
    [0,1,0,0,1,1,0,0,0,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,1],
    [1,1,0,1,0,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,0,1,0,0,1,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,1,0,1,1,0,1,0],
    [1,0,0,0,0,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,0,0,0,1,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0],
    [1,0,1,1,1,0,1,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,1,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0,0,1,0,0,1],
    [1,1,1,1,1,1,1,0,0,1,1,0,1,0,1,0,1,0,1,0,1,1,0,1,1,0,1,1,0]
  ];

  return (
    <div className="real-qr-card">
      <div className="real-qr-header" style={{ background: '#742284' }}>
        <span className="real-qr-header-title">ESCANEA Y YAPEA AQUÍ</span>
        <span className="real-qr-header-subtitle">HOSTAL KIN S.A.C.</span>
      </div>

      <div className="real-qr-canvas-wrapper">
        <svg className="real-qr-svg" viewBox="0 0 29 29" shapeRendering="crispEdges">
          <rect width="29" height="29" fill="#FFFFFF" />
          {qrModules.map((row, rIdx) =>
            row.map((cell, cIdx) => {
              if (rIdx >= 11 && rIdx <= 17 && cIdx >= 11 && cIdx <= 17) {
                return null;
              }
              return cell === 1 ? (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx}
                  y={rIdx}
                  width="1"
                  height="1"
                  fill="#151414"
                />
              ) : null;
            })
          )}
        </svg>

        <div className="real-qr-center-badge" style={{ borderColor: '#742284' }}>
          <img src={yapeImg} alt="Yape Logo" style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
        </div>
      </div>

      <div className="real-qr-details">
        <div className="qr-detail-row">
          <span className="qr-detail-label">Titular:</span>
          <span className="qr-detail-val">Hostal Kin S.A.C.</span>
        </div>
        <div className="qr-detail-row">
          <span className="qr-detail-label">Número:</span>
          <span className="qr-detail-val">940 930 037</span>
        </div>
      </div>

      <div className="real-qr-steps">
        <div className="qr-step">
          <span className="qr-step-num" style={{ background: '#742284' }}>1</span>
          <span>Abre tu app Yape</span>
        </div>
        <div className="qr-step">
          <span className="qr-step-num" style={{ background: '#742284' }}>2</span>
          <span>Escanea el código QR</span>
        </div>
        <div className="qr-step">
          <span className="qr-step-num" style={{ background: '#742284' }}>3</span>
          <span>Confirma el pago</span>
        </div>
      </div>
    </div>
  );
};

const ROOM_GALLERIES: Record<number, { url: string; category: string; caption: string }[]> = {
  1: [
    {
      url: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1600&auto=format&fit=crop',
      category: 'Cama Principal',
      caption: 'Cama individual ergonómica equipada con ropa de cama de alta calidad para un descanso impecable.'
    },
    {
      url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1600&auto=format&fit=crop',
      category: 'Baño Privado',
      caption: 'Baño privado completo con ducha de agua caliente las 24 horas y acabados higiénicos.'
    },
    {
      url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1600&auto=format&fit=crop',
      category: 'Escritorio & Trabajo',
      caption: 'Escritorio ejecutivo con iluminación dedicada e internet Wi-Fi de alta velocidad.'
    },
    {
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop',
      category: 'Vista & Iluminación',
      caption: 'Ventana con excelente entrada de luz natural y cortinas blackout para garantizar tranquilidad.'
    }
  ],
  2: [
    {
      url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1600&auto=format&fit=crop',
      category: 'Cama King Size',
      caption: 'Cama King Size acolchada de lujo con almohadas anatómicas, perfecta para el máximo descanso en pareja.'
    },
    {
      url: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?q=80&w=1600&auto=format&fit=crop',
      category: 'Baño de Lujo',
      caption: 'Baño de diseño con mampara de cristal, grifería moderna y ducha de agua caliente con alta presión.'
    },
    {
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1600&auto=format&fit=crop',
      category: 'Balcón & Vista',
      caption: 'Balcón privado con vista panorámica hacia los jardines interiores del hotel para momentos de relax.'
    },
    {
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1600&auto=format&fit=crop',
      category: 'Zona de Estar',
      caption: 'Zona de descanso confort con sillón amplio, Smart TV 55" y aire acondicionado regulable.'
    }
  ],
  3: [
    {
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop',
      category: 'Camas Dobles',
      caption: 'Dos camas de 2 plazas de máximo confort, espaciosas e independientes para compartir amena estadía.'
    },
    {
      url: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?q=80&w=1600&auto=format&fit=crop',
      category: 'Baño Espacioso',
      caption: 'Baño amplio equipado con espejo iluminado LED, toallas de cuerpo entero y set de amenities.'
    },
    {
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop',
      category: 'Vista Panorámica',
      caption: 'Iluminación natural mediante amplias ventanas con vista panorámica y ventilación fresca.'
    },
    {
      url: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?q=80&w=1600&auto=format&fit=crop',
      category: 'Amenities & Café',
      caption: 'Zona de amoblamiento con mesa auxiliar, cafetera italiana, minibar y amplio armario organizador.'
    }
  ]
};

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
  onUpdateCartQuantity?: (roomTitle: string, newQuantity: number) => void;
  cart?: CartItem[];
  initialStep?: 'fecha' | 'pago';
  initialCheckoutType?: 'single' | 'cart';
  onClearCart?: () => void;
  onBookingSuccess?: (details: any) => void;
  onStepChange?: (step: 'fecha' | 'habitacion' | 'pago' | 'finalizado') => void;
  onViewBooking?: () => void;
  onNavigateHome?: () => void;
}

export function Booking({ 
  onAddToCart, 
  onUpdateCartQuantity,
  cart = [], 
  initialStep = 'fecha', 
  initialCheckoutType = 'single',
  onClearCart,
  onBookingSuccess,
  onStepChange,
  onViewBooking,
  onNavigateHome
}: BookingProps) {
  const [step, setStep] = useState<'fecha' | 'habitacion' | 'pago' | 'finalizado'>('fecha');
  const [checkoutType, setCheckoutType] = useState<'single' | 'cart'>('single');

  useEffect(() => {
    if (onStepChange) {
      onStepChange(step);
    }
  }, [step, onStepChange]);

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
  const [galleryRoom, setGalleryRoom] = useState<RoomGalleryData | null>(null);

  const handleOpenGallery = (room: Room) => {
    const gallery = ROOM_GALLERIES[room.id] || [
      { url: room.image, category: 'Habitación', caption: room.desc }
    ];
    setGalleryRoom({
      id: room.id,
      title: room.title,
      desc: room.desc,
      image: room.image,
      price: room.price,
      gallery
    });
  };

  const getMaxGuests = (roomId: number) => {
    if (roomId === 1) return 1;
    if (roomId === 2) return 2;
    if (roomId === 3) return 3;
    return 2;
  };

  // Payment states & validation
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'yape'>('card');
  const [yapeTab, setYapeTab] = useState<'num' | 'qr'>('qr');
  const [docType, setDocType] = useState('DNI');
  const [docOpen, setDocOpen] = useState(false);
  const [docId, setDocId] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [yapeCode, setYapeCode] = useState(['', '', '', '', '', '']);
  const [cardNumber, setCardNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});

  const toggleExpandItem = (id: number) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Timeline Step Navigation Handler
  const handleTimelineStepClick = (targetStep: 'fecha' | 'habitacion' | 'pago') => {
    // Lock navigation if booking is completed
    if (step === 'finalizado') return;

    if (targetStep === 'fecha') {
      setStep('fecha');
    } else if (targetStep === 'habitacion' && (step === 'habitacion' || step === 'pago')) {
      setStep('habitacion');
    }
  };

  // Input Handlers with Real-time Restrictions & Validation
  const handleDocIdChange = (val: string) => {
    const digits = val.replace(/\D/g, '');
    const maxLen = docType === 'DNI' ? 8 : 11;
    const truncated = digits.slice(0, maxLen);
    setDocId(truncated);
    if (formSubmitted) validateField('docId', truncated);
  };

  const handleDocTypeSelect = (type: string) => {
    setDocType(type);
    setDocOpen(false);
    const maxLen = type === 'DNI' ? 8 : 11;
    const truncated = docId.slice(0, maxLen);
    setDocId(truncated);
    if (formSubmitted) validateField('docId', truncated, type);
  };

  const handleNameChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]/g, '');
    setName(cleaned);
    if (formSubmitted) validateField('name', cleaned);
  };

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 9);
    setPhone(digits);
    if (formSubmitted) validateField('phone', digits);
  };

  const handleEmailChange = (val: string) => {
    setEmail(val);
    if (formSubmitted) validateField('email', val);
  };

  const handleCardNumberChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    const formatted = digits.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
    if (formSubmitted) validateField('cardNumber', formatted);
  };

  const handleExpDateChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    let formatted = digits;
    if (digits.length >= 3) {
      formatted = `${digits.slice(0, 2)}/${digits.slice(2)}`;
    }
    setExpDate(formatted);
    if (formSubmitted) validateField('expDate', formatted);
  };

  const handleCvvChange = (val: string) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    setCvv(digits);
    if (formSubmitted) validateField('cvv', digits);
  };

  const handleCardNameChange = (val: string) => {
    const cleaned = val.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]/g, '');
    setCardName(cleaned);
    if (formSubmitted) validateField('cardName', cleaned);
  };

  const handleYapeCodeChange = (index: number, val: string) => {
    if (/^[0-9]?$/.test(val)) {
      const nextCode = [...yapeCode];
      nextCode[index] = val;
      setYapeCode(nextCode);
      if (val && index < 5) {
        const nextInput = document.getElementById(`yape-code-${index + 1}`);
        if (nextInput) (nextInput as HTMLInputElement).focus();
      }
      if (formSubmitted) validateField('yapeCode', nextCode.join(''));
    }
  };

  const validateField = (field: string, value: string, currentDocType = docType) => {
    setErrors((prev) => {
      const newErrs = { ...prev };
      if (field === 'docId') {
        if (!value.trim()) {
          newErrs.docId = 'El Documento de Identidad es obligatorio.';
        } else if (currentDocType === 'DNI' && value.length !== 8) {
          newErrs.docId = 'El DNI debe tener exactamente 8 dígitos.';
        } else if (currentDocType === 'RUC' && value.length !== 11) {
          newErrs.docId = 'El RUC debe tener exactamente 11 dígitos.';
        } else {
          delete newErrs.docId;
        }
      }
      if (field === 'name') {
        if (!value.trim()) {
          newErrs.name = 'El Nombre es obligatorio.';
        } else if (value.trim().length < 2) {
          newErrs.name = 'Ingrese su nombre completo.';
        } else {
          delete newErrs.name;
        }
      }
      if (field === 'phone') {
        if (!value.trim()) {
          newErrs.phone = 'El número de teléfono es obligatorio.';
        } else if (value.length !== 9) {
          newErrs.phone = 'El teléfono debe tener 9 dígitos.';
        } else {
          delete newErrs.phone;
        }
      }
      if (field === 'email') {
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          newErrs.email = 'Ingrese un correo electrónico válido.';
        } else {
          delete newErrs.email;
        }
      }
      if (field === 'cardNumber') {
        const rawDigits = value.replace(/\s/g, '');
        if (!rawDigits) {
          newErrs.cardNumber = 'El número de tarjeta es obligatorio.';
        } else if (rawDigits.length !== 16) {
          newErrs.cardNumber = 'La tarjeta debe tener 16 dígitos.';
        } else {
          delete newErrs.cardNumber;
        }
      }
      if (field === 'expDate') {
        if (!value.trim()) {
          newErrs.expDate = 'La fecha de vencimiento es obligatoria.';
        } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
          newErrs.expDate = 'Formato inválido (MM/AA).';
        } else {
          delete newErrs.expDate;
        }
      }
      if (field === 'cvv') {
        if (!value.trim()) {
          newErrs.cvv = 'El CVV es obligatorio.';
        } else if (value.length < 3) {
          newErrs.cvv = 'El CVV debe tener 3 o 4 dígitos.';
        } else {
          delete newErrs.cvv;
        }
      }
      if (field === 'cardName') {
        if (!value.trim()) {
          newErrs.cardName = 'El nombre del titular es obligatorio.';
        } else if (value.trim().length < 2) {
          newErrs.cardName = 'Ingrese el nombre impreso en la tarjeta.';
        } else {
          delete newErrs.cardName;
        }
      }
      if (field === 'yapeCode') {
        if (value.length !== 6) {
          newErrs.yapeCode = 'Ingrese el código de aprobación de 6 dígitos.';
        } else {
          delete newErrs.yapeCode;
        }
      }
      return newErrs;
    });
  };

  const validateAll = () => {
    const newErrs: Record<string, string> = {};

    if (!docId.trim()) {
      newErrs.docId = 'El Documento de Identidad es obligatorio.';
    } else if (docType === 'DNI' && docId.length !== 8) {
      newErrs.docId = 'El DNI debe tener exactamente 8 dígitos.';
    } else if (docType === 'RUC' && docId.length !== 11) {
      newErrs.docId = 'El RUC debe tener exactamente 11 dígitos.';
    }

    if (!name.trim()) {
      newErrs.name = 'El Nombre es obligatorio.';
    } else if (name.trim().length < 2) {
      newErrs.name = 'Ingrese su nombre completo.';
    }

    if (!phone.trim()) {
      newErrs.phone = 'El número de teléfono es obligatorio.';
    } else if (phone.length !== 9) {
      newErrs.phone = 'El teléfono debe tener 9 dígitos.';
    }

    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrs.email = 'Ingrese un correo electrónico válido.';
    }

    if (paymentMethod === 'card') {
      const rawDigits = cardNumber.replace(/\s/g, '');
      if (!rawDigits) {
        newErrs.cardNumber = 'El número de tarjeta es obligatorio.';
      } else if (rawDigits.length !== 16) {
        newErrs.cardNumber = 'La tarjeta debe tener 16 dígitos.';
      }

      if (!expDate.trim()) {
        newErrs.expDate = 'La fecha de vencimiento es obligatoria.';
      } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expDate)) {
        newErrs.expDate = 'Formato inválido (MM/AA).';
      }

      if (!cvv.trim()) {
        newErrs.cvv = 'El CVV es obligatorio.';
      } else if (cvv.length < 3) {
        newErrs.cvv = 'El CVV debe tener 3 o 4 dígitos.';
      }

      if (!cardName.trim()) {
        newErrs.cardName = 'El nombre del titular es obligatorio.';
      } else if (cardName.trim().length < 2) {
        newErrs.cardName = 'Ingrese el nombre impreso en la tarjeta.';
      }
    }

    if (paymentMethod === 'yape' && yapeTab === 'num') {
      if (yapeCode.join('').length !== 6) {
        newErrs.yapeCode = 'Ingrese el código de aprobación de 6 dígitos.';
      }
    }

    setErrors(newErrs);
    return Object.keys(newErrs).length === 0;
  };

  // Success states
  const [copied, setCopied] = useState(false);
  const [codeRevealed, setCodeRevealed] = useState(false);
  const BOOKING_CODE = '9XY384-586KLM';

  useEffect(() => {
    if (step === 'finalizado' && !codeRevealed) {
      const timer = setTimeout(() => setCodeRevealed(true), 600);
      return () => clearTimeout(timer);
    }
  }, [step, codeRevealed]);

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
            <span 
              className={`step-label ${step === 'fecha' || step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' ? 'completed' : ''} ${step !== 'finalizado' ? 'timeline-clickable' : 'timeline-locked'}`}
              onClick={() => handleTimelineStepClick('fecha')}
              title={step !== 'finalizado' ? 'Ir al paso de Fecha' : ''}
            >
              Fecha
            </span>
            <span 
              className={`step-label ${step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' && step !== 'habitacion' ? 'completed' : ''} ${step === 'pago' ? 'timeline-clickable' : step === 'finalizado' ? 'timeline-locked' : ''}`}
              onClick={() => handleTimelineStepClick('habitacion')}
              title={step === 'pago' ? 'Ir al paso de Habitación' : ''}
            >
              Habitación
            </span>
            <span className={`step-label ${step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}>
              Pago
            </span>
            <span className={`step-label ${step === 'finalizado' ? 'active' : ''} ${step === 'finalizado' ? 'completed' : ''}`}>
              Finalizado
            </span>
          </div>

          <div className="timeline-track">
            <div className="timeline-line">
              <div 
                className="timeline-line-active" 
                style={{ width: step === 'fecha' ? '12.5%' : step === 'habitacion' ? '37.5%' : step === 'pago' ? '62.5%' : '100%' }}
              ></div>
            </div>
            <div className="timeline-circles">
              <div 
                className={`step-circle ${step === 'fecha' || step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' ? 'completed' : ''} ${step !== 'finalizado' ? 'timeline-clickable' : 'timeline-locked'}`}
                onClick={() => handleTimelineStepClick('fecha')}
                title={step !== 'finalizado' ? 'Ir al paso de Fecha' : ''}
              ></div>
              <div 
                className={`step-circle ${step === 'habitacion' || step === 'pago' || step === 'finalizado' ? 'active' : ''} ${step !== 'fecha' && step !== 'habitacion' ? 'completed' : ''} ${step === 'pago' ? 'timeline-clickable' : step === 'finalizado' ? 'timeline-locked' : ''}`}
                onClick={() => handleTimelineStepClick('habitacion')}
                title={step === 'pago' ? 'Ir al paso de Habitación' : ''}
              ></div>
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
              {ROOMS.map((room) => {
                const cartItem = cart.find(item => item.title.toLowerCase() === room.title.toLowerCase());
                const currentQty = cartItem ? cartItem.quantity : 0;

                return (
                  <div key={room.id} className="room-result-card">
                    {/* Left Column: Image with Hover Overlay */}
                    <div 
                      className="room-card-image-col"
                      onClick={() => handleOpenGallery(room)}
                      title="Haga clic para ver más fotos de la habitación"
                    >
                      <img src={room.image} alt={room.title} className="room-card-image" />
                      <div className="room-card-image-hover-overlay">
                        <span>Más detalles del cuarto</span>
                      </div>
                      <FaInfoCircle className="room-card-info-icon" title="Ver galería de fotos" />
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

                        {currentQty > 0 ? (
                          <div className="room-cart-stepper">
                            <button 
                              type="button" 
                              className="stepper-btn stepper-minus"
                              onClick={() => {
                                if (onUpdateCartQuantity) {
                                  onUpdateCartQuantity(room.title, currentQty - 1);
                                }
                              }}
                              title="Reducir cantidad"
                            >
                              -
                            </button>
                            <span className="stepper-count">{currentQty}</span>
                            <button 
                              type="button" 
                              className="stepper-btn stepper-plus"
                              onClick={() => openModal('cart', room)}
                              title="Agregar otra habitación"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="room-btn-cart" 
                            type="button"
                            onClick={() => openModal('cart', room)}
                          >
                            AÑADIR AL CARRITO
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <div className="payment-step-wrapper fade-in">
                <div style={{ marginBottom: '1.4rem' }}>
                  <button 
                    type="button" 
                    className="booking-step-back-btn" 
                    onClick={() => setStep('habitacion')}
                  >
                    <FaArrowLeft />
                    Volver a elegir habitaciones
                  </button>
                </div>
                <div className="payment-grid-layout">
                {/* Left Column: Summary Card */}
                {checkoutType === 'cart' ? (
                  <div className="payment-summary-card">
                    <div className="summary-header">
                      <h2 style={{ fontSize: '1.4rem', color: '#151414', fontFamily: 'var(--font-condensed)', fontWeight: '700' }}>Resumen de los gastos</h2>
                      <div className="cart-modal-divider" style={{ margin: '0.8rem 0' }}></div>
                    </div>
                    
                    <div className="summary-body">
                      <h4 style={{ fontFamily: 'var(--font-base)', textDecoration: 'underline', fontWeight: '800', color: '#151414', fontSize: '0.82rem', marginBottom: '1rem', textTransform: 'none' }}>
                        Habitaciones reservadas (haz clic para ver detalle)
                      </h4>
                      {cart.map((item) => {
                        const isExpanded = !!expandedItems[item.id];
                        const basePricePerNight = item.price * 0.82;
                        const subtotalBase = basePricePerNight * item.quantity * nights;
                        const igvAmount = item.price * 0.18 * item.quantity * nights;
                        const totalItemVal = item.price * item.quantity * nights;

                        return (
                          <div key={item.id} className="summary-cart-item-block">
                            <div 
                              className={`summary-row summary-item-clickable ${isExpanded ? 'active-expanded' : ''}`}
                              onClick={() => toggleExpandItem(item.id)}
                            >
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <FaChevronDown className={`summary-expand-chevron ${isExpanded ? 'rotated' : ''}`} style={{ color: '#733527' }} />
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                  <span style={{ fontWeight: '700', color: '#151414', fontSize: '0.96rem' }}>{item.title}</span>
                                  <span style={{ color: '#686558', fontSize: '0.82rem', marginTop: '0.1rem' }}>Cantidad: {item.quantity} {item.quantity === 1 ? 'habitación' : 'habitaciones'}</span>
                                </div>
                              </div>
                              <div style={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ fontFamily: 'var(--font-condensed)', fontWeight: '700', color: '#151414', fontSize: '1.1rem' }}>S/ {(item.price * item.quantity).toFixed(2)}</span>
                              </div>
                            </div>

                            {/* Collapsible Dropdown Details */}
                            {isExpanded && (
                              <div className="summary-item-details-dropdown">
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a483f' }}>
                                  <span>Precio base por noche {item.quantity > 1 ? '(1 hab.)' : '(s/ IGV)'}:</span>
                                  <span>S/ {basePricePerNight.toFixed(2)}</span>
                                </div>
                                {item.quantity > 1 && (
                                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a483f' }}>
                                    <span>Habitaciones reservadas:</span>
                                    <span>{item.quantity}</span>
                                  </div>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a483f' }}>
                                  <span>Cantidad de noches:</span>
                                  <span>{nights}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a483f' }}>
                                  <span>Subtotal sin IGV {item.quantity > 1 ? `(${item.quantity} hab.)` : ''}:</span>
                                  <span>S/ {subtotalBase.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#4a483f' }}>
                                  <span>IGV 18% {item.quantity > 1 ? `(${item.quantity} hab.)` : ''}:</span>
                                  <span>S/ {igvAmount.toFixed(2)}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#151414', fontWeight: '800', borderTop: '1px dashed #d5d3cc', paddingTop: '0.5rem', marginTop: '0.2rem' }}>
                                  <span>Total {item.quantity > 1 ? `(${item.quantity} habitaciones)` : 'por esta habitación'}:</span>
                                  <span style={{ color: '#b30006', fontSize: '1rem' }}>S/ {totalItemVal.toFixed(2)}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
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

                  {formSubmitted && Object.keys(errors).length > 0 && (
                    <div className="form-validation-alert">
                      <FaExclamationTriangle className="alert-icon" />
                      <span>Por favor, complete correctamente los campos requeridos antes de continuar.</span>
                    </div>
                  )}

                  <div className="holder-form-grid">
                    <div className={`form-field ${errors.docId ? 'field-has-error' : ''}`}>
                      <label style={{ color: '#c53030' }}>Documento de Identidad*</label>
                      <div className="doc-input-wrapper">
                        <div className="doc-custom-select" onClick={() => setDocOpen(!docOpen)}>
                          <span className="doc-selected-value">{docType}</span>
                          <span className="doc-arrow">▾</span>
                          {docOpen && (
                            <div className="doc-dropdown">
                              <div className="doc-option" onClick={() => handleDocTypeSelect('DNI')}>DNI</div>
                              <div className="doc-option" onClick={() => handleDocTypeSelect('RUC')}>RUC</div>
                            </div>
                          )}
                        </div>
                        <input 
                          type="text" 
                          placeholder={docType === 'DNI' ? 'Ej: 12345678' : 'Ej: 20123456789'} 
                          value={docId} 
                          onChange={(e) => handleDocIdChange(e.target.value)}
                          className="doc-input"
                          maxLength={docType === 'DNI' ? 8 : 11}
                        />
                      </div>
                      {errors.docId && (
                        <span className="field-error-message">
                          <FaExclamationCircle className="field-error-icon" />
                          {errors.docId}
                        </span>
                      )}
                    </div>

                    <div className={`form-field ${errors.email ? 'field-has-error' : ''}`}>
                      <label>Email</label>
                      <input 
                        type="email" 
                        placeholder="ejemplo@gmail.com" 
                        value={email} 
                        onChange={(e) => handleEmailChange(e.target.value)}
                      />
                      {errors.email && (
                        <span className="field-error-message">
                          <FaExclamationCircle className="field-error-icon" />
                          {errors.email}
                        </span>
                      )}
                    </div>

                    <div className={`form-field ${errors.name ? 'field-has-error' : ''}`}>
                      <label style={{ color: '#c53030' }}>Nombre*</label>
                      <input 
                        type="text" 
                        placeholder="Ej: John Alexander" 
                        value={name} 
                        onChange={(e) => handleNameChange(e.target.value)}
                      />
                      {errors.name && (
                        <span className="field-error-message">
                          <FaExclamationCircle className="field-error-icon" />
                          {errors.name}
                        </span>
                      )}
                    </div>

                    <div className={`form-field ${errors.phone ? 'field-has-error' : ''}`}>
                      <label style={{ color: '#c53030' }}>Numero*</label>
                      <input 
                        type="text" 
                        placeholder="Ej: 932527449" 
                        value={phone} 
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        maxLength={9}
                      />
                      {errors.phone && (
                        <span className="field-error-message">
                          <FaExclamationCircle className="field-error-icon" />
                          {errors.phone}
                        </span>
                      )}
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
                        <CardLogosSVG />
                        <span className="method-btn-text">Tarjeta</span>
                      </button>
                      <button 
                        type="button" 
                        className={`method-logo-btn method-yape-btn ${paymentMethod === 'yape' ? 'active' : ''}`}
                        onClick={() => setPaymentMethod('yape')}
                      >
                        <img src={yapeImg} alt="Yape" style={{ height: '32px', width: 'auto', objectFit: 'contain' }} />
                        <span className="method-btn-text">Yape</span>
                      </button>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  {/* Payment Info Card Details */}
                  {paymentMethod === 'card' ? (
                    <div className="card-payment-form">
                      <h3 className="payment-section-title">Informacion de pago</h3>
                      
                      <div className={`form-field ${errors.cardNumber ? 'field-has-error' : ''}`}>
                        <label>Numero de tarjeta</label>
                        <input 
                          type="text" 
                          placeholder="0000 0000 0000 0000" 
                          value={cardNumber}
                          onChange={(e) => handleCardNumberChange(e.target.value)}
                          maxLength={19}
                        />
                        {errors.cardNumber && (
                          <span className="field-error-message">
                            <FaExclamationCircle className="field-error-icon" />
                            {errors.cardNumber}
                          </span>
                        )}
                      </div>

                      <div className="card-row-fields">
                        <div className={`form-field flex-2 ${errors.expDate ? 'field-has-error' : ''}`}>
                          <label>Fecha de vencimiento</label>
                          <input 
                            type="text" 
                            placeholder="MM / AA" 
                            value={expDate}
                            onChange={(e) => handleExpDateChange(e.target.value)}
                            maxLength={5}
                          />
                          {errors.expDate && (
                            <span className="field-error-message">
                              <FaExclamationCircle className="field-error-icon" />
                              {errors.expDate}
                            </span>
                          )}
                        </div>
                        <div className={`form-field flex-1 ${errors.cvv ? 'field-has-error' : ''}`}>
                          <label>CVV</label>
                          <input 
                            type="text" 
                            placeholder="CVC" 
                            value={cvv}
                            onChange={(e) => handleCvvChange(e.target.value)}
                            maxLength={4}
                          />
                          {errors.cvv && (
                            <span className="field-error-message">
                              <FaExclamationCircle className="field-error-icon" />
                              {errors.cvv}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className={`form-field ${errors.cardName ? 'field-has-error' : ''}`}>
                        <label>Nombre del titular</label>
                        <input 
                          type="text" 
                          placeholder="Ej: JOHN ALEXANDER"
                          value={cardName}
                          onChange={(e) => handleCardNameChange(e.target.value)}
                        />
                        {errors.cardName && (
                          <span className="field-error-message">
                            <FaExclamationCircle className="field-error-icon" />
                            {errors.cardName}
                          </span>
                        )}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="yape-segmented">
                        <button 
                          type="button" 
                          className={`yape-seg-btn ${yapeTab === 'num' ? 'active' : ''}`}
                          onClick={() => setYapeTab('num')}
                        >
                          Número
                        </button>
                        <button 
                          type="button" 
                          className={`yape-seg-btn ${yapeTab === 'qr' ? 'active' : ''}`}
                          onClick={() => setYapeTab('qr')}
                        >
                          Código QR
                        </button>
                      </div>

                      {yapeTab === 'qr' ? (
                        <div className="yape-qr-content">
                          <p className="yape-instruction">
                            Escanee el código QR con su app de Yape y complete el pago
                          </p>
                          <RealisticQRCode />
                        </div>
                      ) : (
                        <div className="yape-num-content">
                          <h4 className="yape-num-heading">
                            Ingresa tu numero de telefono para pago con Yape
                          </h4>
                          
                          <div className={`form-field ${errors.phone ? 'field-has-error' : ''}`}>
                            <label>Telefono</label>
                            <input 
                              type="text" 
                              placeholder="Ej: 940 930 037" 
                              value={phone}
                              onChange={(e) => handlePhoneChange(e.target.value)}
                              maxLength={9}
                            />
                            {errors.phone && (
                              <span className="field-error-message">
                                <FaExclamationCircle className="field-error-icon" />
                                {errors.phone}
                              </span>
                            )}
                          </div>
                          
                          <div className={`form-field ${errors.yapeCode ? 'field-has-error' : ''}`}>
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
                            {errors.yapeCode && (
                              <span className="field-error-message">
                                <FaExclamationCircle className="field-error-icon" />
                                {errors.yapeCode}
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {!(paymentMethod === 'yape' && yapeTab === 'qr') && (
                    <button 
                      type="button" 
                      className="pay-now-btn"
                      onClick={() => {
                        setFormSubmitted(true);
                        if (!validateAll()) {
                          return;
                        }
                        setStep('finalizado');
                        if (checkoutType === 'cart' && onClearCart) {
                          onClearCart();
                        }
                        if (onBookingSuccess) {
                          const room = selectedRoom || ROOMS[1];
                          onBookingSuccess({
                            code: '9XY384-586KLM',
                            roomTitle: checkoutType === 'cart' ? 'Habitación Matrimonial' : room.title,
                            roomDesc: checkoutType === 'cart' 
                              ? 'Diseñada para ofrecer confort y privacidad, nuestra Habitación Matrimonial es el espacio perfecto para parejas o viajeros que buscan un ambiente acogedor y relajante. Ideal para disfrutar de momentos de descanso.' 
                              : room.desc,
                            roomImage: checkoutType === 'cart' ? cart[0]?.image || room.image : room.image,
                            checkIn: formatDateForDisplay(fechaLlegada) || '20/10/2025',
                            checkOut: formatDateForDisplay(fechaSalida) || '25/10/2025',
                            guests: huespedes.filter(h => h.trim()).length > 0 ? huespedes.filter(h => h.trim()) : ['Jorge Gonzalo Nina Retamozo'],
                            total: totalVal
                          });
                        }
                      }}
                    >
                      Pagar S/{totalVal.toFixed(0)}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })()}

          {step === 'finalizado' && (
            <motion.div 
              className="success-container-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Success Icon — Checkmark with Pulse Halo */}
              <motion.div 
                className="success-icon-wrapper"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 120, damping: 14 }}
              >
                <div className="success-circle-halo"></div>
                <div className="success-circle">
                  <svg className="success-checkmark" viewBox="0 0 52 52">
                    <circle className="success-checkmark-circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="success-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                </div>
              </motion.div>

              {/* Badge */}
              <motion.div 
                className="success-header-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                RESERVA CONFIRMADA
              </motion.div>

              {/* Title */}
              <motion.h2 
                className="success-title"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              >
                Reserva exitosa
              </motion.h2>
              
              {/* Code Box with Typewriter */}
              <motion.div 
                className={`success-code-box ${copied ? 'code-box-copied' : ''}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="code-box-label">Tu código de reserva es</span>
                <span className="code-box-value" aria-label={BOOKING_CODE}>
                  {BOOKING_CODE.split('').map((char, i) => (
                    <span 
                      key={i} 
                      className="code-char"
                      style={{ animationDelay: codeRevealed ? `${i * 50}ms` : '0ms', opacity: codeRevealed ? undefined : 0 }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <button 
                  type="button" 
                  className={`copy-code-btn ${copied ? 'copied' : ''}`}
                  aria-label="Copiar código de reserva"
                  onClick={() => {
                    navigator.clipboard.writeText(BOOKING_CODE);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2200);
                  }}
                >
                  {copied ? (
                    <>
                      <FaCheckCircle className="copy-icon" />
                      <span>Copiado</span>
                    </>
                  ) : (
                    <>
                      <svg className="copy-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copiar código</span>
                    </>
                  )}
                </button>
              </motion.div>

              {/* Description */}
              <motion.p 
                className="success-description"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                Con este código podrás visualizar los detalles de tu reserva
              </motion.p>

              {/* Urgency Note */}
              <motion.p 
                className="success-urgency-note"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Conserve este código de reserva
              </motion.p>

              {/* Action Buttons */}
              <motion.div 
                className="success-actions-row"
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                <button 
                  className="success-btn-outline" 
                  type="button"
                  onClick={() => window.print()}
                >
                  <FaDownload className="btn-action-icon" />
                  <span>DESCARGAR</span>
                </button>
                <button 
                  className="success-btn-solid" 
                  type="button"
                  onClick={() => {
                    if (onViewBooking) onViewBooking();
                  }}
                >
                  <FaEye className="btn-action-icon" />
                  <span>VER MI RESERVA</span>
                </button>
                <button 
                  className="success-btn-outline" 
                  type="button"
                  onClick={() => {
                    if (onNavigateHome) onNavigateHome();
                  }}
                >
                  <FaArrowLeft className="btn-action-icon" />
                  <span>VOLVER</span>
                </button>
              </motion.div>
            </motion.div>
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

      {/* Room Photo Gallery Modal */}
      <RoomGalleryModal 
        room={galleryRoom} 
        onClose={() => setGalleryRoom(null)}
        onBookNow={(rm) => {
          const found = ROOMS.find(r => r.id === rm.id);
          if (found) openModal('book', found);
        }}
      />
    </div>
  );
}

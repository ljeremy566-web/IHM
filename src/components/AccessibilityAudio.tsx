import { useState, useEffect, useRef } from 'react';
import { FaVolumeUp, FaVolumeMute, FaHeadphones } from 'react-icons/fa';
import './AccessibilityAudio.css';

interface AccessibilityAudioProps {
  currentView: 'home' | 'booking' | 'contact' | 'searchBooking';
  bookingStep?: 'fecha' | 'habitacion' | 'pago' | 'finalizado';
  contactTab?: string;
}

export function AccessibilityAudio({ currentView, bookingStep = 'fecha', contactTab = 'contacto' }: AccessibilityAudioProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [hasUserEnabledAuto, setHasUserEnabledAuto] = useState<boolean>(() => {
    try {
      return localStorage.getItem('ihm_accessibility_audio') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [showTooltip, setShowTooltip] = useState(false);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  const getSummaryText = (): string => {
    if (currentView === 'home') {
      return "Inicio. Bienvenido a Hostal Kin. Ofrecemos habitaciones desde 70 soles con wifi, televisión LED y aire acondicionado. Puedes explorar nuestras habitaciones o realizar tu reserva.";
    }

    if (currentView === 'booking') {
      if (bookingStep === 'fecha') {
        return "Sección de Reservas. Selecciona tu fecha de llegada y salida para consultar habitaciones disponibles.";
      }
      if (bookingStep === 'habitacion') {
        return "Elección de habitaciones. Selecciona la cantidad deseada entre Habitación Simple, Matrimonial o Doble para añadir al carrito o continuar.";
      }
      if (bookingStep === 'pago') {
        return "Sección de Pago. Completa tus datos personales de contacto y selecciona pago con tarjeta o código QR de Yape.";
      }
      if (bookingStep === 'finalizado') {
        return "¡Reserva Confirmada! Tu reserva ha sido registrada con éxito. Puedes descargar tu boleta electrónica o ver tu reserva.";
      }
      return "Sección de Reservas de Hostal Kin.";
    }

    if (currentView === 'searchBooking') {
      return "Buscar Reserva. Ingresa tu código de reserva para consultar los detalles de tu estancia e imprimir tu boleta electrónica.";
    }

    if (currentView === 'contact') {
      if (contactTab === 'sobre-nosotros' || contactTab === 'nosotros') {
        return "Sobre nosotros. En Hostal KIN nos dedicamos a brindar un servicio de hospedaje pensado para tu comodidad, seguridad y tranquilidad en Nuevo Chimbote. Contamos con habitaciones seguras, limpias y funcionales, diseñadas para que te sientas como en casa con la atención cálida y personalizada de nuestro equipo.";
      }
      if (contactTab === 'cancelacion') {
        return "Política de cancelación. Puedes cancelar tu reserva sin penalización avisando con un mínimo de 24 horas de anticipación. Para cancelaciones fuera de plazo o no presentación, se aplicará el cobro de la primera noche de hospedaje.";
      }
      if (contactTab === 'privacidad') {
        return "Política de privacidad. En Hostal KIN garantizamos la protección de tus datos personales. La información solicitada se utiliza únicamente para el procesamiento de la reserva y el registro oficial de huéspedes.";
      }
      if (contactTab === 'preguntas') {
        return "Preguntas frecuentes. Primero: El horario de check-in inicia a las 2 de la tarde y el check-out es hasta las 12 del mediodía. Segundo: Aceptamos pagos con tarjetas de débito o crédito y pagos por código QR de Yape. Tercero: Para confirmar la reserva de cualquier habitación, es obligatorio ingresar el nombre de al menos un huésped principal.";
      }
      if (contactTab === 'contacto') {
        return "Atención al cliente. Consulta nuestros números telefónicos, WhatsApp, correo electrónico y formulario de contacto.";
      }
      if (contactTab === 'ubicanos') {
        return "Ubicación. Nos encontramos en Manzana A Lote 1 El Bosque, Nuevo Chimbote. Revisa el mapa interactivo y la ruta sugerida.";
      }
      return "Sección de Contáctanos y Políticas de Hostal KIN.";
    }

    return "Bienvenido a Hostal KIN.";
  };

  const stopSpeech = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
  };

  const startSpeech = (textToSpeak?: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const text = textToSpeak || getSummaryText();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-PE';
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    // Try to get a Spanish voice if available
    const voices = synthRef.current.getVoices();
    const spanishVoice = voices.find(v => v.lang.includes('es'));
    if (spanishVoice) {
      utterance.voice = spanishVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const toggleAudio = () => {
    if (isSpeaking) {
      stopSpeech();
      setHasUserEnabledAuto(false);
    } else {
      setHasUserEnabledAuto(true);
      startSpeech();
    }
  };

  // Automatically switch audio narration when view/step changes if narration was already active
  useEffect(() => {
    if (hasUserEnabledAuto || isSpeaking) {
      startSpeech();
    }
    // Cleanup on unmount
    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, [currentView, bookingStep, contactTab]);

  // Listen for targeted announcements (modal opens, validation errors, warnings)
  useEffect(() => {
    const handleAnnounce = (e: CustomEvent<string>) => {
      if (e.detail) {
        startSpeech(e.detail);
      }
    };

    window.addEventListener('accessibility-announce' as any, handleAnnounce);
    return () => {
      window.removeEventListener('accessibility-announce' as any, handleAnnounce);
    };
  }, []);

  return (
    <div className="accessibility-audio-wrapper">
      {/* Tooltip hint */}
      <div className={`audio-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span>{isSpeaking ? 'Detener lectura en voz alta' : 'Escuchar resumen accesible de esta sección'}</span>
      </div>

      {/* Main floating action button */}
      <button
        type="button"
        className={`accessibility-audio-btn ${isSpeaking ? 'speaking' : ''}`}
        onClick={toggleAudio}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        aria-label="Asistente de lectura de voz alta de accesibilidad"
        title="Accesibilidad: Escuchar resumen de la sección"
      >
        <div className="audio-btn-icon-box">
          {isSpeaking ? (
            <FaVolumeMute className="audio-icon pulse-mute" />
          ) : (
            <div className="audio-icon-combo">
              <FaHeadphones className="audio-headphone-icon" />
              <FaVolumeUp className="audio-speaker-icon" />
            </div>
          )}
        </div>

        {/* Animated Soundwaves indicator when speaking */}
        {isSpeaking && (
          <div className="soundwave-bar-container">
            <span className="wave-bar bar1"></span>
            <span className="wave-bar bar2"></span>
            <span className="wave-bar bar3"></span>
            <span className="wave-bar bar4"></span>
          </div>
        )}
      </button>
    </div>
  );
}

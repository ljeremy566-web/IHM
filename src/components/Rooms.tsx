import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import './Rooms.css';

const ROOMS = [
  { id: 1, title: "Habitación Simple", desc: "Comfortable habitación individual perfecta para viajeros solos.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop", details: "Nuestra habitación simple ofrece todo lo necesario para una estancia cómoda. Cama individual de alta calidad, escritorio de trabajo, baño privado con agua caliente y WiFi gratuito. Ideal para viajeros solos o de negocios que buscan confort y funcionalidad." },
  { id: 2, title: "Habitación Matrimonial", desc: "Ideal para 2 personas, disfruta de una cama king size.", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop", details: "Diseñada para parejas, cuenta con una cama king size premium, decoración elegante, baño privado con ducha de lujo, aire acondicionado y balcón con vista panorámica. Perfecta para escapadas románticas o lunas de miel." },
  { id: 3, title: "Habitación Doble", desc: "Espacio amplio con dos camas, ideal para compartirla.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop", details: "Espaciosa habitación con dos camas dobles, ideal para familias o amigos que viajan juntos. Cuenta con baño privado, televisor LED, escritorio, WiFi y amplio closet. La mejor opción para compartir momentos inolvidables." },
];

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
];

export function Rooms() {
  const [expanded, setExpanded] = useState<number | null>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const swiperRef = useRef<any>(null);
  const expandedRoom = ROOMS.find(r => r.id === expanded);

  const handleCardClick = (roomId: number) => {
    const roomIdx = roomId - 1;
    if (roomIdx === activeIdx) {
      setExpanded(roomId);
    } else {
      swiperRef.current?.slideToLoop(roomIdx);
    }
  };

  return (
    <section className="rooms-section">
      <div className="rooms-bg-layer rooms-bg-1" style={{ backgroundImage: `url(${BG_IMAGES[0]})` }}></div>
      <div className="rooms-bg-layer rooms-bg-2" style={{ backgroundImage: `url(${BG_IMAGES[1]})` }}></div>
      <div className="rooms-bg-layer rooms-bg-3" style={{ backgroundImage: `url(${BG_IMAGES[2]})` }}></div>
      <div className="rooms-bg-color"></div>

      <div className="container rooms-container">
        <h2 className="rooms-heading">Nuestras habitaciones</h2>
        <p className="rooms-subtitle">
          Durante tu estancia, disfruta de la comodidad que te mereces para unas vacaciones inolvidables
        </p>
      </div>

      <div className="fisheye-wrapper">
        <div className="fisheye-layout">
          <Swiper
            modules={[Navigation, Autoplay]}
            grabCursor
            centeredSlides
            slidesPerView={1.5}
            spaceBetween={20}
            loop
            autoplay={{ delay: 8000, disableOnInteraction: false }}
            navigation={{ prevEl: '.fisheye-nav-prev', nextEl: '.fisheye-nav-next' }}
            onSwiper={(sw) => { swiperRef.current = sw; }}
            onSlideChange={(sw) => setActiveIdx(sw.realIndex % ROOMS.length)}
            breakpoints={{
              769: { slidesPerView: 1.5, spaceBetween: 20 },
              0: { slidesPerView: 1.2, spaceBetween: 15 }
            }}
            className="fisheye-swiper"
          >
            {[...ROOMS, ...ROOMS].map((room, i) => (
              <SwiperSlide key={`${room.id}-${i}`}>
                <div className="fisheye-card" onClick={() => handleCardClick(room.id)}>
                  <img src={room.image} alt={room.title} className="fisheye-card-img" loading="lazy" />
                  <div className="fisheye-card-overlay"></div>
                  <div className="fisheye-card-info">
                    <h3 className="fisheye-card-title">{room.title}</h3>
                    <p className="fisheye-card-desc">{room.desc}</p>
                    <span className="fisheye-card-cta">
                      <span>Ver detalles</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fisheye-footer-row">
            <button className="fisheye-nav fisheye-nav-prev" aria-label="Anterior">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <div className="fisheye-dots">
              {ROOMS.map((room, i) => (
                <button
                  key={room.id}
                  className={`fisheye-dot${i === activeIdx ? ' fisheye-dot-active' : ''}`}
                  onClick={() => swiperRef.current?.slideToLoop(i)}
                  aria-label={`Habitación ${i + 1}`}
                />
              ))}
            </div>
            <button className="fisheye-nav fisheye-nav-next" aria-label="Siguiente">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      {expandedRoom && (
        <div className="fisheye-modal-overlay" onClick={() => setExpanded(null)}>
          <div className="fisheye-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fisheye-modal-close" onClick={() => setExpanded(null)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
            <div className="fisheye-modal-image">
              <img src={expandedRoom.image} alt={expandedRoom.title} />
              <div className="fisheye-modal-image-overlay"></div>
              <h3 className="fisheye-modal-title">{expandedRoom.title}</h3>
            </div>
            <div className="fisheye-modal-body">
              <p className="fisheye-modal-desc">{expandedRoom.desc}</p>
              <div className="fisheye-modal-divider"></div>
              <p className="fisheye-modal-details">{expandedRoom.details}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

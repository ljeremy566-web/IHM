import { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { FaInfoCircle } from 'react-icons/fa';
import { RoomGalleryModal, type RoomGalleryData } from './RoomGalleryModal';
import 'swiper/css';
import 'swiper/css/navigation';
import './Rooms.css';

const ROOMS = [
  { id: 1, title: "Habitación Simple", desc: "Comfortable habitación individual perfecta para viajeros solos.", image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop", details: "Nuestra habitación simple ofrece todo lo necesario para una estancia cómoda. Cama individual de alta calidad, escritorio de trabajo, baño privado con agua caliente y WiFi gratuito. Ideal para viajeros solos o de negocios que buscan confort y funcionalidad." },
  { id: 2, title: "Habitación Matrimonial", desc: "Ideal para 2 personas, disfruta de una cama king size.", image: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop", details: "Diseñada para parejas, cuenta con una cama king size premium, decoración elegante, baño privado con ducha de lujo, aire acondicionado y balcón con vista panorámica. Perfecta para escapadas románticas o lunas de miel." },
  { id: 3, title: "Habitación Doble", desc: "Espacio amplio con dos camas, ideal para compartirla.", image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop", details: "Espaciosa habitación con dos camas dobles, ideal para familias o amigos que viajan juntos. Cuenta con baño privado, televisor LED, escritorio, WiFi y amplio closet. La mejor opción para compartir momentos inolvidables." },
];

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

const BG_IMAGES = [
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2070&auto=format&fit=crop",
];

export function Rooms() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [galleryRoom, setGalleryRoom] = useState<RoomGalleryData | null>(null);
  const swiperRef = useRef<any>(null);

  const handleOpenGallery = (room: typeof ROOMS[0]) => {
    const gallery = ROOM_GALLERIES[room.id] || [
      { url: room.image, category: 'Habitación', caption: room.desc }
    ];
    setGalleryRoom({
      id: room.id,
      title: room.title,
      desc: room.desc,
      image: room.image,
      gallery
    });
  };

  const handleCardClick = (roomId: number) => {
    const roomIdx = roomId - 1;
    if (roomIdx === activeIdx) {
      const found = ROOMS.find(r => r.id === roomId);
      if (found) handleOpenGallery(found);
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
                  <div className="fisheye-card-hover-overlay">
                    <span>Más detalles del cuarto</span>
                  </div>
                  <FaInfoCircle className="fisheye-info-icon" title="Ver fotos del cuarto" />
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

      <RoomGalleryModal
        room={galleryRoom}
        onClose={() => setGalleryRoom(null)}
      />
    </section>
  );
}

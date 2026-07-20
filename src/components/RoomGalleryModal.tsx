import { useState, useEffect } from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes, FaCamera } from 'react-icons/fa';
import './RoomGalleryModal.css';

export interface GalleryPhoto {
  url: string;
  category: string;
  caption: string;
}

export interface RoomGalleryData {
  id: number;
  title: string;
  desc: string;
  image: string;
  price?: string;
  gallery: GalleryPhoto[];
}

interface RoomGalleryModalProps {
  room: RoomGalleryData | null;
  onClose: () => void;
  onBookNow?: (room: RoomGalleryData) => void;
}

export function RoomGalleryModal({ room, onClose, onBookNow }: RoomGalleryModalProps) {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    setActiveIdx(0);
  }, [room]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!room) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        setActiveIdx((prev) => (prev === 0 ? room.gallery.length - 1 : prev - 1));
      } else if (e.key === 'ArrowRight') {
        setActiveIdx((prev) => (prev === room.gallery.length - 1 ? 0 : prev + 1));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [room, onClose]);

  if (!room || !room.gallery || room.gallery.length === 0) return null;

  const currentPhoto = room.gallery[activeIdx];

  const handlePrev = () => {
    setActiveIdx((prev) => (prev === 0 ? room.gallery.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev === room.gallery.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-modal-backdrop" onClick={onClose}>
      <div className="gallery-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gallery-modal-header">
          <div className="gallery-header-info">
            <span className="gallery-badge">
              <FaCamera className="gallery-badge-icon" />
              Galería de Fotos
            </span>
            <h2 className="gallery-room-title">{room.title}</h2>
          </div>
          <button className="gallery-close-btn" onClick={onClose} aria-label="Cerrar galería">
            <FaTimes />
          </button>
        </div>

        {/* Carousel Area */}
        <div className="gallery-carousel-wrapper">
          <div className="gallery-main-slide-container">
            <img
              src={currentPhoto.url}
              alt={`${room.title} - ${currentPhoto.category}`}
              className="gallery-main-image"
            />

            {/* Hover overlay at the bottom with photo context message */}
            <div className="gallery-hover-overlay">
              <div className="gallery-hover-content">
                <span className="gallery-hover-category">{currentPhoto.category}</span>
                <p className="gallery-hover-caption">{currentPhoto.caption}</p>
              </div>
            </div>

            {/* Carousel Nav Buttons */}
            <button
              className="gallery-nav-btn gallery-nav-prev"
              onClick={handlePrev}
              aria-label="Foto anterior"
            >
              <FaChevronLeft />
            </button>
            <button
              className="gallery-nav-btn gallery-nav-next"
              onClick={handleNext}
              aria-label="Foto siguiente"
            >
              <FaChevronRight />
            </button>

            {/* Slide Counter */}
            <div className="gallery-counter">
              {activeIdx + 1} / {room.gallery.length}
            </div>
          </div>

          {/* Thumbnails Row */}
          <div className="gallery-thumbnails-row">
            {room.gallery.map((photo, i) => (
              <button
                key={i}
                className={`gallery-thumb-btn ${i === activeIdx ? 'active' : ''}`}
                onClick={() => setActiveIdx(i)}
              >
                <img src={photo.url} alt={photo.category} className="gallery-thumb-img" />
                <span className="gallery-thumb-label">{photo.category}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="gallery-modal-footer">
          <p className="gallery-footer-hint">
            Pasa el mouse sobre la foto para ver los detalles de cada espacio.
          </p>
          {onBookNow && (
            <button
              className="gallery-book-now-btn"
              onClick={() => {
                onClose();
                onBookNow(room);
              }}
            >
              Reservar esta habitación
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

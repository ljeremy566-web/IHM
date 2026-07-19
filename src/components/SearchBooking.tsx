import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './SearchBooking.css';

export function SearchBooking() {
  const [searchCode, setSearchCode] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [searchResult, setSearchResult] = useState<any>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) return;

    setHasSearched(true);
    // Simulate lookup of the successful booking code from the success screen
    if (searchCode.trim().toUpperCase() === '9XY384-586KLM') {
      setSearchResult({
        code: '9XY384-586KLM',
        room: 'Habitación Matrimonial',
        checkIn: '24/07/2026',
        checkOut: '27/07/2026',
        guests: ['Jorge Gonzalo Nina Retamozo'],
        total: 'S/ 270.00',
        status: 'Confirmada'
      });
    } else {
      setSearchResult(null);
    }
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
            <div className="search-no-results-card fade-in">
              <h3>No se encontraron resultados</h3>
              <p>Por favor verifique que el código ingresado sea el correcto e inténtelo de nuevo.</p>
            </div>
          )}

          {hasSearched && searchResult && (
            <div className="search-result-card-details fade-in">
              <div className="result-header">
                <h2>Reserva Encontrada</h2>
                <span className="result-status-badge">CONFIRMADA</span>
              </div>
              <div className="result-divider"></div>
              <div className="result-body-grid">
                <div className="result-field">
                  <span className="field-label">Código de Reserva</span>
                  <span className="field-value highlight">{searchResult.code}</span>
                </div>
                <div className="result-field">
                  <span className="field-label">Habitación</span>
                  <span className="field-value">{searchResult.room}</span>
                </div>
                <div className="result-field">
                  <span className="field-label">Fecha de Entrada</span>
                  <span className="field-value">{searchResult.checkIn}</span>
                </div>
                <div className="result-field">
                  <span className="field-label">Fecha de Salida</span>
                  <span className="field-value">{searchResult.checkOut}</span>
                </div>
                <div className="result-field full-width">
                  <span className="field-label">Huéspedes</span>
                  <span className="field-value">{searchResult.guests.join(', ')}</span>
                </div>
                <div className="result-field">
                  <span className="field-label">Total Pagado</span>
                  <span className="field-value price">{searchResult.total}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { FaShoppingCart, FaBars, FaBed, FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import type { CartItem } from '../App';
import './Header.css';

interface HeaderProps {
  currentView: 'home' | 'booking' | 'contact' | 'searchBooking';
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateSearchBooking: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onCheckoutCart: () => void;
}

export function Header({ 
  currentView, 
  onNavigateHome, 
  onNavigateContact,
  onNavigateSearchBooking,
  cart,
  onRemoveFromCart,
  onCheckoutCart
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
        <button className="header-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <FaBars size={20} />
        </button>

        <div className="logo" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          <div className="logo-mark">
            <span className="logo-symbol">K</span>
          </div>
          <span className="logo-text">KIN</span>
        </div>

        <nav className="nav-links">
          <a 
            href="#" 
            className={currentView === 'home' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); onNavigateHome(); }}
          >
            Inicio
          </a>
          <a 
            href="#" 
            className={currentView === 'searchBooking' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); onNavigateSearchBooking(); }}
          >
            Buscar Reserva
          </a>
          <a 
            href="#" 
            className={currentView === 'contact' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); onNavigateContact(); }}
          >
            Contactanos
          </a>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); onNavigateContact(); }}
          >
            Ubicación
          </a>
        </nav>
        
        <div className="header-btn-wrapper" style={{ position: 'relative' }}>
          <button className="header-btn" onClick={() => setIsCartOpen(!isCartOpen)}>
            <FaShoppingCart size={14} />
            <span className="header-btn-text">Mis Reservas</span>
            {cart.length > 0 && (
              <span className="cart-badge">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </button>
          
          {isCartOpen && (
            <div className="cart-dropdown-modal">
              <div className="cart-modal-header">
                <h2>Mis reservas</h2>
                <FaShoppingCart className="cart-modal-icon" />
              </div>
              <div className="cart-modal-divider"></div>
              
              <div className="cart-modal-items">
                {cart.length === 0 ? (
                  <p className="empty-cart-message">No tienes reservas activas</p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="cart-modal-item restructured">
                      <div className="cart-item-header">
                        <h3>{item.title}</h3>
                        <button 
                          type="button" 
                          className="cart-item-remove-btn"
                          onClick={() => onRemoveFromCart(item.id)}
                          title="Eliminar reserva"
                        >
                          <FaTrashAlt />
                        </button>
                      </div>
                      <div className="cart-item-meta">
                        <div className="cart-meta-pill">
                          <FaBed className="pill-icon" />
                          <span>{item.quantity} {item.quantity === 1 ? 'habitación' : 'habitaciones'}</span>
                        </div>
                        <div className="cart-meta-pill">
                          <FaCalendarAlt className="pill-icon" />
                          <span>{item.nights || 1} {item.nights === 1 ? 'noche' : 'noches'}</span>
                        </div>
                      </div>
                      <div className="cart-item-footer">
                        <span className="cart-item-rate">S/ {item.price.toFixed(2)} x noche</span>
                        <span className="cart-item-total">S/ {(item.price * item.quantity * (item.nights || 1)).toFixed(2)}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              <div className="cart-modal-divider"></div>
              
              <div className="cart-modal-subtotal">
                <span>Subtotal</span>
                <span className="cart-subtotal-value">
                  S/ {cart.reduce((sum, item) => sum + (item.price * item.quantity * (item.nights || 1)), 0).toFixed(2)}
                </span>
              </div>
              
              <div className="cart-modal-actions">
                <button 
                  type="button" 
                  className="cart-btn-outline"
                  onClick={() => setIsCartOpen(false)}
                >
                  Seguir comprando
                </button>
                <button 
                  type="button" 
                  className="cart-btn-primary"
                  onClick={() => {
                    setIsCartOpen(false);
                    onCheckoutCart();
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {menuOpen && (
        <nav className="mobile-dropdown" onClick={() => setMenuOpen(false)}>
          <a onClick={() => { onNavigateHome(); setMenuOpen(false); }}>Inicio</a>
          <a onClick={() => { onNavigateSearchBooking(); setMenuOpen(false); }}>Buscar Reserva</a>
          <a onClick={() => { onNavigateContact(); setMenuOpen(false); }}>Contactanos</a>
          <a onClick={() => { onNavigateContact(); setMenuOpen(false); }}>Ubicación</a>
        </nav>
      )}
    </header>
  );
}

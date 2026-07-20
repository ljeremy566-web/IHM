import { useState, useEffect } from 'react';
import { FaShoppingCart, FaBars, FaBed, FaCalendarAlt, FaTrashAlt } from 'react-icons/fa';
import type { CartItem } from '../App';
import logoKin from '../img/fbdfdabe-d455-4f4a-a1b9-a1799a8b2768.png';
import './Header.css';

interface HeaderProps {
  currentView: 'home' | 'booking' | 'contact' | 'searchBooking';
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateSearchBooking: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onCheckoutCart: () => void;
  onNavigateBooking: () => void;
  hideCart?: boolean;
}

export function Header({ 
  currentView, 
  onNavigateHome, 
  onNavigateContact,
  onNavigateSearchBooking,
  cart,
  onRemoveFromCart,
  onCheckoutCart,
  onNavigateBooking,
  hideCart = false
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartBumped, setCartBumped] = useState(false);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (totalItems > 0) {
      setCartBumped(true);
      const timer = setTimeout(() => setCartBumped(false), 350);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  return (
    <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
      <div className="container header-container">
        <button className="header-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
          <FaBars size={20} />
        </button>

        <div className="logo" onClick={onNavigateHome} style={{ cursor: 'pointer' }}>
          <img src={logoKin} alt="Hostal KIN" className="logo-img" />
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
            className={currentView === 'booking' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); onNavigateBooking(); }}
          >
            Reservar ahora
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
        </nav>
        
        {!hideCart && (
          <div className="header-btn-wrapper" style={{ position: 'relative' }}>
            <button 
              className={`header-btn ${cartBumped ? 'cart-bump' : ''}`} 
              onClick={() => setIsCartOpen(!isCartOpen)}
            >
              <FaShoppingCart size={14} />
              <span className="header-btn-text">Mis Reservas</span>
              {totalItems > 0 && (
                <span className="cart-badge">
                  {totalItems}
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
                    disabled={cart.length === 0}
                    onClick={() => {
                      if (cart.length === 0) return;
                      setIsCartOpen(false);
                      onCheckoutCart();
                    }}
                    style={{ 
                      opacity: cart.length === 0 ? 0.5 : 1, 
                      cursor: cart.length === 0 ? 'not-allowed' : 'pointer' 
                    }}
                  >
                    Continuar
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {menuOpen && (
        <nav className="mobile-dropdown" onClick={() => setMenuOpen(false)}>
          <a onClick={(e) => { e.preventDefault(); onNavigateHome(); setMenuOpen(false); }}>Inicio</a>
          <a onClick={(e) => { e.preventDefault(); onNavigateBooking(); setMenuOpen(false); }}>Reservar ahora</a>
          <a onClick={(e) => { e.preventDefault(); onNavigateSearchBooking(); setMenuOpen(false); }}>Buscar Reserva</a>
          <a onClick={(e) => { e.preventDefault(); onNavigateContact(); setMenuOpen(false); }}>Contactanos</a>
        </nav>
      )}
    </header>
  );
}

import { useState } from 'react';
import { FaIdCard, FaShoppingCart, FaTimesCircle } from 'react-icons/fa';
import type { CartItem } from '../App';
import './Header.css';

interface HeaderProps {
  currentView: 'home' | 'booking' | 'contact';
  onNavigateHome: () => void;
  onNavigateBooking: () => void;
  onNavigateContact: () => void;
  cart: CartItem[];
  onRemoveFromCart: (id: number) => void;
  onCheckoutCart: () => void;
}

export function Header({ 
  currentView, 
  onNavigateHome, 
  onNavigateBooking, 
  onNavigateContact,
  cart,
  onRemoveFromCart,
  onCheckoutCart
}: HeaderProps) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <header className="header">
      <div className="container header-container">
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
            className={currentView === 'booking' ? 'active' : ''} 
            onClick={(e) => { e.preventDefault(); onNavigateBooking(); }}
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
            <FaIdCard size={14} />
            <span>Mis Reservas</span>
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
                    <div key={item.id} className="cart-modal-item">
                      <img src={item.image} alt={item.title} className="cart-item-image" />
                      <div className="cart-item-info">
                        <h3>{item.title}</h3>
                        <div className="cart-item-price-row">
                          <span className="cart-item-qty">{item.quantity} X</span>
                          <span className="cart-item-price">S/ {(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <button 
                        type="button" 
                        className="cart-item-remove-btn"
                        onClick={() => onRemoveFromCart(item.id)}
                      >
                        <FaTimesCircle />
                      </button>
                    </div>
                  ))
                )}
              </div>
              
              <div className="cart-modal-divider"></div>
              
              <div className="cart-modal-subtotal">
                <span>Subtotal</span>
                <span className="cart-subtotal-value">
                  S/ {cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}
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
                  className="cart-btn-outline"
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
    </header>
  );
}

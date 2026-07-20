import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Divider } from './components/Divider';
import { Services } from './components/Services';
import { Rooms } from './components/Rooms';
import { Footer } from './components/Footer';
import { Booking } from './components/Booking';
import { Contact } from './components/Contact';
import { SearchBooking } from './components/SearchBooking';

export interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  quantity: number;
  nights?: number;
}

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'booking' | 'contact' | 'searchBooking'>('home');
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 1,
      title: 'Habitación simple',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop',
      price: 70,
      quantity: 1,
      nights: 2
    },
    {
      id: 2,
      title: 'Habitación matrimonial',
      image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=2070&auto=format&fit=crop',
      price: 90,
      quantity: 2,
      nights: 3
    },
    {
      id: 3,
      title: 'Habitación doble',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop',
      price: 120,
      quantity: 1,
      nights: 1
    }
  ]);

  const [bookingInitialStep, setBookingInitialStep] = useState<'fecha' | 'pago'>('fecha');
  const [checkoutType, setCheckoutType] = useState<'single' | 'cart'>('single');
  const [lastBooking, setLastBooking] = useState<any>(null);
  const [contactTab, setContactTab] = useState<string>('contacto');

  const navigateToHome = () => {
    setCurrentView('home');
    setCheckoutType('single');
    setBookingInitialStep('fecha');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToBooking = () => {
    setCheckoutType('single');
    setBookingInitialStep('fecha');
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContact = () => {
    setContactTab('contacto');
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToContactTab = (tab: string) => {
    setContactTab(tab);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToSearchBooking = () => {
    setCurrentView('searchBooking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCheckoutCart = () => {
    setCheckoutType('cart');
    setBookingInitialStep('pago');
    setCurrentView('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToCart = (roomTitle: string, price: number, image: string, quantity: number) => {
    setCart((prev) => {
      const existing = prev.find(item => item.title.toLowerCase() === roomTitle.toLowerCase());
      if (existing) {
        return prev.map(item => 
          item.title.toLowerCase() === roomTitle.toLowerCase()
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { id: Date.now(), title: roomTitle, price, image, quantity }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 16,
      scale: 0.99
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.16, 1, 0.3, 1] as const
      }
    },
    exit: {
      opacity: 0,
      y: -12,
      scale: 0.99,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as const
      }
    }
  };

  return (
    <div className="app">
      <Header 
        currentView={currentView} 
        onNavigateHome={navigateToHome} 
        onNavigateContact={navigateToContact}
        onNavigateSearchBooking={navigateToSearchBooking}
        onNavigateBooking={navigateToBooking}
        cart={cart}
        onRemoveFromCart={removeFromCart}
        onCheckoutCart={handleCheckoutCart}
      />
      <main style={{ minHeight: '80vh', overflowX: 'hidden', paddingTop: currentView === 'home' ? 0 : '75px' }}>
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Hero onBookingClick={navigateToBooking} />
              <Divider />
              <Services />
              <Divider />
              <Rooms />
              <Divider />
            </motion.div>
          )}
          {currentView === 'booking' && (
            <motion.div
              key="booking"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Booking 
                onAddToCart={addToCart} 
                cart={cart}
                initialStep={bookingInitialStep}
                initialCheckoutType={checkoutType}
                onBookingSuccess={(details) => setLastBooking(details)}
              />
            </motion.div>
          )}
          {currentView === 'contact' && (
            <motion.div
              key="contact"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <Contact initialTab={contactTab} />
            </motion.div>
          )}
          {currentView === 'searchBooking' && (
            <motion.div
              key="searchBooking"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SearchBooking 
                lastBooking={lastBooking} 
                onNavigateHome={navigateToHome} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer 
        onNavigateHome={navigateToHome}
        onNavigateBooking={navigateToBooking}
        onNavigateSearchBooking={navigateToSearchBooking}
        onNavigateContact={navigateToContact}
        onNavigateContactTab={navigateToContactTab}
      />
    </div>
  );
}

export default App;

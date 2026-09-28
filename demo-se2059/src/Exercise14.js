import React, { useState, useContext, createContext } from 'react';

// ==========================================
// 1. THEME CONTEXT
// ==========================================
const themes = {
  light: {
    name: 'Light',
    foreground: "#000000",
    background: "#eeeeee"
  },
  dark: {
    name: 'Dark',
    foreground: "#ffffff",
    background: "#61dafb"
  }
};

const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prev => prev === themes.light ? themes.dark : themes.light);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

function ThemeButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div 
      className="p-4 rounded text-center"
      style={{ 
        backgroundColor: theme.background === '#eeeeee' ? '#333740' : '#1e293b', 
        border: '1px solid rgba(255,255,255,0.1)'
      }}
    >
      <p className="small text-white-50 mb-3">
        Theme hiện tại: <strong>{theme.name}</strong> (Màu nút: <code>{theme.background}</code>, Chữ: <code>{theme.foreground}</code>)
      </p>

      <button 
        onClick={toggleTheme}
        style={{
          backgroundColor: theme.background,
          color: theme.foreground,
          border: '1px solid rgba(0,0,0,0.2)',
          padding: '8px 24px',
          borderRadius: '4px',
          fontSize: '15px',
          fontWeight: '600',
          cursor: 'pointer',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
        }}
      >
        Toggle Theme
      </button>
    </div>
  );
}

// ==========================================
// 2 & 3. CART CONTEXT & REAL-TIME CART
// ==========================================
const DISHES_DATA = [
  {
    "id": 0,
    "name": "Uthappizza",
    "image": "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&q=80",
    "category": "mains",
    "label": "Hot",
    "price": "4.99",
    "featured": true,
    "description": "A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives, ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer."
  },
  {
    "id": 1,
    "name": "Zucchipakoda",
    "image": "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?w=500&q=80",
    "category": "appetizer",
    "label": "",
    "price": "1.99",
    "featured": false,
    "description": "Deep fried Zucchini coated with mildly spiced Chickpea flour batter accompanied with a sweet-tangy tamarind sauce"
  },
  {
    "id": 2,
    "name": "Vadonut",
    "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=500&q=80",
    "category": "appetizer",
    "label": "New",
    "price": "1.99",
    "featured": false,
    "description": "A quintessential ConFusion experience, is it a vada or is it a donut?"
  },
  {
    "id": 3,
    "name": "Elaicheese Cake",
    "image": "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=500&q=80",
    "category": "dessert",
    "label": "",
    "price": "2.99",
    "featured": false,
    "description": "A delectable, semi-sweet New York Style Cheese Cake, with Graham cracker crust and spiced with Indian cardamoms"
  }
];

const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (dish) => {
    setCartItems(prev => {
      const exist = prev.find(item => item.id === dish.id);
      if (exist) {
        return prev.map(item =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...dish, quantity: 1 }];
    });
  };

  const removeFromCart = (dishId) => {
    setCartItems(prev => prev.filter(item => item.id !== dishId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalValue = cartItems.reduce((sum, item) => sum + item.quantity * parseFloat(item.price), 0).toFixed(2);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, totalCount, totalValue }}>
      {children}
    </CartContext.Provider>
  );
}

function DishesList() {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="row g-3">
      {DISHES_DATA.map(dish => (
        <div key={dish.id} className="col-12 col-sm-6">
          <div className="card h-100 border shadow-sm">
            <img src={dish.image} alt={dish.name} className="card-img-top" style={{ height: '130px', objectFit: 'cover' }} />
            <div className="card-body p-3 d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-1">
                <h6 className="fw-bold mb-0 text-dark">
                  {dish.name}
                  {dish.label && (
                    <span className={`badge ms-2 ${dish.label === 'Hot' ? 'bg-danger' : 'bg-primary'}`} style={{ fontSize: '10px' }}>
                      {dish.label}
                    </span>
                  )}
                </h6>
                <span className="badge bg-success">${dish.price}</span>
              </div>
              <p className="text-secondary small mb-3 flex-grow-1" style={{ fontSize: '12px' }}>
                {dish.description}
              </p>
              <button 
                className="btn btn-sm btn-outline-primary w-100"
                onClick={() => addToCart(dish)}
              >
                + Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function Cart() {
  const { cartItems, removeFromCart, clearCart, totalCount, totalValue } = useContext(CartContext);

  return (
    <div className="card p-3 shadow-sm border">
      <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
        <h6 className="fw-bold mb-0 text-dark">Your Cart</h6>
        <span className="badge bg-primary rounded-pill px-3 py-1">
          {totalCount} món
        </span>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-muted text-center py-4 mb-0 small">
          Giỏ hàng trống. Hãy nhấn "Add to Cart"!
        </p>
      ) : (
        <div>
          <ul className="list-unstyled mb-3" style={{ maxHeight: '200px', overflowY: 'auto' }}>
            {cartItems.map(item => (
              <li key={item.id} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                <div>
                  <div className="fw-semibold small">{item.name}</div>
                  <div className="text-muted" style={{ fontSize: '12px' }}>
                    ${item.price} &times; {item.quantity} = ${(parseFloat(item.price) * item.quantity).toFixed(2)}
                  </div>
                </div>
                <button 
                  className="btn btn-sm btn-outline-danger py-0 px-2"
                  style={{ fontSize: '12px' }}
                  onClick={() => removeFromCart(item.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="d-flex justify-content-between align-items-center border-top pt-2 mb-3">
            <span className="fw-bold">Total Value:</span>
            <span className="fw-bold text-success fs-5">${totalValue}</span>
          </div>

          <button 
            className="btn btn-sm btn-danger w-100"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </div>
      )}
    </div>
  );
}

export default function Exercise14() {
  return (
    <div style={{ maxWidth: '880px', margin: '0 auto', padding: '30px 20px 80px', color: '#1a1a1a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '6px' }}>Exercise 14: React Hook (useContext)</h1>
        <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
        <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#334155', marginBottom: '8px' }}>Objectives and Outcomes</h2>
        <p style={{ color: '#475569', fontSize: '0.95rem', marginBottom: 0 }}>
          <code>useContext</code> is a React hook that allows you to consume a Context within a functional component. Context provides a way to pass data through the component tree without having to pass props manually at every level.
        </p>
      </div>

      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '16px' }}>Exercises</h3>

      {/* Bài 1 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">1. Create a theme using the useContext hook in React.</h4>
        <p className="text-secondary small">Sử dụng <code>ThemeContext</code> và <code>ThemeProvider</code> để đổi theme Light/Dark cho nút bấm.</p>

        <div style={{ backgroundColor: '#1e1e1e', color: '#d4d4d4', borderRadius: '6px', padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', marginBottom: '14px' }}>
          <div><span style={{ color: '#569cd6' }}>const</span> themes = &#123; light: &#123; background: <span style={{ color: '#ce9178' }}>"#eeeeee"</span> &#125;, dark: &#123; background: <span style={{ color: '#ce9178' }}>"#61dafb"</span> &#125; &#125;;</div>
          <div><span style={{ color: '#569cd6' }}>const</span> ThemeContext = createContext();</div>
          <div><span style={{ color: '#6a9955' }}>// Consumer sử dụng useContext(ThemeContext)</span></div>
        </div>

        <ThemeProvider>
          <ThemeButton />
        </ThemeProvider>
      </div>

      {/* Bài 2 & 3 */}
      <div className="card shadow-sm border-0 p-4 mb-4">
        <h4 className="fw-bold mb-2">2 & 3. Simple Cart Application (Real-time count & value)</h4>
        <p className="text-secondary small">Quản lý giỏ hàng toàn cục qua <code>CartContext</code>, cập nhật số lượng và tổng tiền theo thời gian thực.</p>

        <CartProvider>
          <div className="row g-4 mt-2">
            <div className="col-12 col-md-7">
              <h6 className="fw-bold text-dark mb-3">Menu Dishes</h6>
              <DishesList />
            </div>
            <div className="col-12 col-md-5">
              <h6 className="fw-bold text-dark mb-3">Real-time Cart</h6>
              <Cart />
            </div>
          </div>
        </CartProvider>
      </div>

      <div className="card shadow-sm border-0 p-4 text-center">
        <h5 className="fw-bold mb-2">Conclusion</h5>
        <p className="text-secondary small mb-0">In conclusion, the useContext hook in React provides a straightforward way to consume a Context within functional components.</p>
      </div>
    </div>
  );
}

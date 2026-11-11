import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import AuthPage from './pages/AuthPage';
import MainDashboard from './pages/MainDashboard';
import Toast from './components/Toast';
import './App.css';

function App() {
  // Theme & Session State (Dùng sessionStorage để mỗi tab có thể đăng nhập độc lập: Admin & User song song)
  const [theme, setTheme] = useState(() => localStorage.getItem('toy_share_theme') || 'light');
  const [currentUser, setCurrentUser] = useState(() => {
    const sessionUser = sessionStorage.getItem('toy_share_user');
    if (sessionUser) return JSON.parse(sessionUser);

    // Chuyển đổi dữ liệu cũ từ localStorage sang sessionStorage nếu có
    const localUser = localStorage.getItem('toy_share_user');
    if (localUser) {
      sessionStorage.setItem('toy_share_user', localUser);
      localStorage.removeItem('toy_share_user');
      return JSON.parse(localUser);
    }
    return null;
  });

  // Toast Notification State
  const [toasts, setToasts] = useState([]);

  // Apply Theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('toy_share_theme', theme);
  }, [theme]);

  // Toggle Theme
  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Auth Callbacks
  const handleLoginSuccess = (userData) => {
    setCurrentUser(userData);
    sessionStorage.setItem('toy_share_user', JSON.stringify(userData));
    localStorage.removeItem('toy_share_user');
    showToast(`Đăng nhập thành công! Chào mừng ${userData.displayName || userData.username}.`, 'success');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('toy_share_user');
    localStorage.removeItem('toy_share_user');
    showToast('Đã đăng xuất khỏi hệ thống.', 'info');
  };

  // 🟢 HÀM CẬP NHẬT USER (Dùng khi mượn/trả đồ làm thay đổi Điểm Uy Tín hoặc số lượng mượn)
  const handleUpdateUser = (updatedUserData) => {
    setCurrentUser(updatedUserData);
    sessionStorage.setItem('toy_share_user', JSON.stringify(updatedUserData));
  };

  // Toast Helper
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Not Logged In View
  if (!currentUser) {
    return (
      <div className="app-container" style={{ minHeight: '100vh', justifyContent: 'center' }}>
        <Navbar currentUser={null} theme={theme} toggleTheme={toggleTheme} />
        <AuthPage onLoginSuccess={handleLoginSuccess} />
        <Toast toasts={toasts} onClose={removeToast} />
      </div>
    );
  }

  // Logged In Dashboard View
  return (
    <div className="app-container">
      <MainDashboard 
        currentUser={currentUser}
        onUpdateUser={handleUpdateUser} // 🟢 Truyền hàm cập nhật user xuống Dashboard
        onLogout={handleLogout}
        theme={theme}
        toggleTheme={toggleTheme}
        showToast={showToast}
      />
      <Toast toasts={toasts} onClose={removeToast} />
    </div>
  );
}

export default App;
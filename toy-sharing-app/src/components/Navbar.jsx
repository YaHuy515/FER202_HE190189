/**
 * 🧭 COMPONENT: Navbar (Thanh Điều Hướng + Badge Uy Tín + Theme Toggle)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Hiển thị thương hiệu, thông tin user, điểm uy tín, hạng thành viên, chuyển theme & Đăng xuất.
 */
import React from 'react';

// 🟢 Hàm hỗ trợ xác định Hạng và Giới hạn mượn dựa trên Điểm Uy Tín
const getReputationTier = (score = 100) => {
  if (score >= 120) return { name: 'VVIP', maxBorrows: 5, color: '#9b59b6', bg: '#f3e8ff', badge: '💎' };
  if (score >= 100) return { name: 'Vàng', maxBorrows: 4, color: '#d97706', bg: '#fef3c7', badge: '🥇' };
  if (score >= 80) return { name: 'Bạc', maxBorrows: 3, color: '#4b5563', bg: '#f3f4f6', badge: '🥈' };
  if (score >= 50) return { name: 'Đồng', maxBorrows: 2, color: '#c2410c', bg: '#ffedd5', badge: '🥉' };
  return { name: 'Bị khóa', maxBorrows: 0, color: '#dc2626', bg: '#fee2e2', badge: '🚫' };
};

function Navbar({ currentUser, onLogout, theme, toggleTheme }) {
  // 🟢 Lấy thông tin user an toàn
  const actualUser = currentUser?.user || currentUser;
  const displayName = actualUser?.displayName || actualUser?.username || 'Thành viên';
  const score = actualUser?.reputationScore ?? 100;
  const userTier = getReputationTier(score);

  return (
    <nav className="navbar glass-panel animate-fade-in" style={{
      display: 'flex',
      justify: 'space-between',
      alignItems: 'center',
      padding: '12px 24px',
      marginBottom: '20px'
    }}>
      {/* 🏷️ THƯƠNG HIỆU */}
      <div className="brand">
        <div className="brand-title">
          <h1 style={{ margin: 0, fontSize: '22px', color: 'var(--primary, #7c3aed)' }}>🧩 ToyShare</h1>
          <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Hệ thống chia sẻ đồ chơi trẻ em</p>
        </div>
      </div>

      {/* ⚡ HÀNH ĐỘNG & THÔNG TIN USER */}
      <div className="navbar-actions" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        
        {/* 🌙 NÚT ĐỔI GIAO DIỆN (THEME TOGGLE) */}
        {toggleTheme && (
          <button 
            onClick={toggleTheme}
            style={{
              border: '1px solid var(--border-color, #e5e7eb)',
              background: 'var(--bg-primary, #ffffff)',
              color: 'var(--text-main, #1f2937)',
              padding: '6px 12px',
              borderRadius: '20px',
              cursor: 'pointer',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            title={theme === 'dark' ? 'Chuyển sang Chế độ Sáng' : 'Chuyển sang Chế độ Tối'}
          >
            {theme === 'dark' ? '☀️ Sáng' : '🌙 Tối'}
          </button>
        )}

        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            
            {/* 👤 TÊN USER */}
            <div style={{
              background: 'var(--bg-primary, #ffffff)',
              padding: '6px 12px',
              borderRadius: '12px',
              border: '1px solid var(--border-color, #e5e7eb)',
              fontSize: '13px',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span>👤 Chào,</span>
              <strong style={{ color: 'var(--primary, #7c3aed)' }}>{displayName}</strong>
            </div>

            {/* ⭐ BADGE UY TÍN & HẠNG */}
            <div 
              title={`Hạng ${userTier.name} - Mượn tối đa ${userTier.maxBorrows} món`}
              style={{
                background: userTier.bg,
                color: userTier.color,
                padding: '6px 12px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 'bold',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                border: `1px solid ${userTier.color}33`
              }}
            >
              <span>⭐ {score} điểm</span>
              <span>|</span>
              <span>{userTier.badge} {userTier.name}</span>
            </div>

            {/* 🚪 NÚT ĐĂNG XUẤT */}
            <button 
              className="btn btn-secondary" 
              onClick={onLogout}
              style={{ 
                padding: '6px 14px', 
                fontSize: '13px',
                borderRadius: '12px',
                cursor: 'pointer'
              }}
              title="Đăng xuất khỏi hệ thống"
            >
              🚪 Đăng xuất
            </button>
          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
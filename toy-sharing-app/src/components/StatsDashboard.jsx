/**
 * 📊 COMPONENT: StatsDashboard (Bảng Thống Kê Tổng Quan)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Tính toán và hiển thị các con số thống kê nhanh của thư viện đồ chơi.
 * 📈 Chỉ số: Tổng số đồ chơi, số lượng đồ chơi có sẵn và số lượng đang được mượn.
 */

import React from 'react';

function StatsDashboard({ toys = [] }) {
  const totalToys = toys.length;
  const availableToys = toys.filter(toy => toy.status === 'Available').length;
  const borrowedToys = toys.filter(toy => toy.status === 'Borrowed').length;

  return (
    <div className="stats-grid">
      <div className="stat-card glass-panel animate-fade-in" style={{ animationDelay: '0.05s' }}>
        <div className="stat-icon total">🧸</div>
        <div className="stat-info">
          <h3>Tổng số đồ chơi</h3>
          <p>{totalToys}</p>
        </div>
      </div>
      
      <div className="stat-card glass-panel animate-fade-in" style={{ animationDelay: '0.1s' }}>
        <div className="stat-icon available">✨</div>
        <div className="stat-info">
          <h3>Sẵn sàng cho mượn</h3>
          <p>{availableToys}</p>
        </div>
      </div>
      
      <div className="stat-card glass-panel animate-fade-in" style={{ animationDelay: '0.15s' }}>
        <div className="stat-icon borrowed">🤝</div>
        <div className="stat-info">
          <h3>Đang được mượn</h3>
          <p>{borrowedToys}</p>
        </div>
      </div>
    </div>
  );
}

export default StatsDashboard;

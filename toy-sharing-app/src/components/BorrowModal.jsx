/**
 * 🤝 COMPONENT: BorrowModal (Form Đăng Ký Mượn Đồ Chơi)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Hiển thị hộp thoại (Popup Portal) để User chọn ngày mượn/trả và xác nhận mượn đồ.
 * 📅 Tự động hóa: Tự thiết lập mặc định ngày mượn là Hôm nay và ngày trả là +7 ngày.
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

function BorrowModal({ isOpen, onClose, toy, onSubmit }) {
  const [borrowDate, setBorrowDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split('T')[0];
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      const defaultReturn = nextWeek.toISOString().split('T')[0];

      setBorrowDate(today);
      setReturnDate(defaultReturn);
      setNote('');
    }
  }, [isOpen]);

  if (!isOpen || !toy) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(returnDate) <= new Date(borrowDate)) {
      alert('Ngày trả phải sau ngày mượn!');
      return;
    }
    onSubmit({
      toyId: toy.id,
      toyName: toy.name,
      borrowDate,
      returnDate,
      note: note.trim()
    });
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '480px' }}>
        <div className="modal-header">
          <h2> Đăng Ký Mượn Đồ Chơi</h2>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'var(--bg-primary, #f8f9fa)',
          padding: '12px',
          borderRadius: '10px',
          marginBottom: '16px'
        }}>
          <img 
            src={toy.imageUrl} 
            alt={toy.name} 
            style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '8px' }} 
          />
          <div>
            <h4 style={{ margin: 0, fontSize: '15px' }}>{toy.name}</h4>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>
              Chủ sở hữu: <strong>{toy.owner}</strong>
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div className="form-group">
              <label>Ngày mượn *</label>
              <input 
                type="date" 
                className="form-control" 
                value={borrowDate} 
                onChange={(e) => setBorrowDate(e.target.value)}
                required 
              />
            </div>

            <div className="form-group">
              <label>Ngày dự kiến trả *</label>
              <input 
                type="date" 
                className="form-control" 
                value={returnDate} 
                min={borrowDate}
                onChange={(e) => setReturnDate(e.target.value)}
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label>Ghi chú</label>
            <textarea 
              className="form-control" 
              rows="3" 
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn-primary">Xác Nhận Mượn</button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default BorrowModal;
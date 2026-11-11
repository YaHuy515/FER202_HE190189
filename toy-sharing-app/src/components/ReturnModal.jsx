/**
 * ↩️ COMPONENT: ReturnModal (Hộp Thoại Xác Nhận Trả Đồ Chơi)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Hiển thị popup xác nhận hoàn trả đồ chơi và cập nhật lại trạng thái.
 * ⚠️ Tự động bảo trì: Cảnh báo tự động chuyển sang "Bảo trì" nếu đồ chơi đạt giới hạn số lần mượn (`maxBorrows`).
 */

import React from 'react';
import ReactDOM from 'react-dom';

function ReturnModal({ isOpen, onClose, toy, onConfirm }) {
  if (!isOpen || !toy) return null;

  const currentBorrows = toy.currentBorrows || 0;
  const maxBorrows = toy.maxBorrows || 5;
  const isGoingToMaintenance = (currentBorrows + 1) >= maxBorrows;

  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '450px' }}>
        
        <div className="modal-header" style={{ marginBottom: '16px' }}>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>📦 Xác Nhận Trả Đồ Chơi</h2>
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
              Người mượn hiện tại: <strong>{toy.borrowedBy || 'Thành viên'}</strong>
            </p>
          </div>
        </div>

        <div style={{ fontSize: '14px', color: 'var(--text-color, #333)', marginBottom: '20px', lineHeight: '1.5' }}>
          <p style={{ margin: '0 0 8px 0' }}>Bạn có chắc chắn muốn xác nhận nhận lại món đồ chơi này?</p>
          
          {isGoingToMaintenance ? (
            <div style={{ padding: '10px', background: '#fff3cd', color: '#856404', borderRadius: '6px', fontSize: '13px' }}>
              ⚠️ <strong>Lưu ý:</strong> Món đồ chơi này sẽ đạt mốc <strong>{maxBorrows}/{maxBorrows}</strong> lần mượn và sẽ tự động chuyển sang trạng thái 🔧 <strong>Bảo trì</strong>.
            </div>
          ) : (
            <p style={{ margin: 0, fontSize: '13px', color: '#666' }}>
              Số lần mượn sau khi trả: <strong>{currentBorrows + 1}/{maxBorrows}</strong>
            </p>
          )}
        </div>

        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
          <button 
            type="button" 
            className="btn btn-primary" 
            style={{ background: '#28a745', borderColor: '#28a745' }}
            onClick={() => onConfirm(toy.id)}
          >
            Xác Nhận Trả
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}

export default ReturnModal;
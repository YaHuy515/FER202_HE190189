/**
 * 🔔 COMPONENT: Toast (Thông Báo Tạm Thời / Pop-up Notification)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Hiển thị các thông báo nhanh (thành công, cảnh báo, thông tin) ở góc màn hình.
 * ⚡ Thao tác: Cho phép người dùng chủ động đóng thông báo bằng nút đóng (×).
 */

import React from 'react';

function Toast({ toasts = [], onClose }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast glass-panel ${toast.type || 'info'}`}>
          <span className="toast-icon">
            {toast.type === 'success' && '✅'}
            {toast.type === 'info' && 'ℹ️'}
            {toast.type === 'danger' && '⚠️'}
          </span>
          <span className="toast-message">{toast.message}</span>
          <button className="toast-close" onClick={() => onClose(toast.id)}>
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;

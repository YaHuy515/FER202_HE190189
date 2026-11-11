/**
 * 📋 COMPONENT: BorrowHistoryTable (Bảng Lịch Sử Mượn Trả)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Hiển thị danh sách lịch sử mượn/trả đồ chơi.
 * 🛡️ Phân quyền: Admin xem tất cả lượt mượn; User chỉ xem của chính mình.
 * ⚡ Thao tác: Cho phép User bấm nút "Trả đồ chơi" đối với các món đang mượn.
 */

import React from 'react';

// Nhận thêm prop currentUser từ component cha truyền xuống để lọc dữ liệu
function BorrowHistoryTable({ history = [], onReturn, role, currentUser }) {
  
  const isAdmin = role?.toLowerCase() === 'admin';
  const isParent = !isAdmin;

  // BƯỚC LỌC DỮ LIỆU: Admin xem tất cả, User chỉ xem lịch sử của chính mình
  const filteredHistory = history.filter((record) => {
    if (isAdmin) return true; // Admin thấy hết
    return (record.borrowerId && record.borrowerId === currentUser?.id) || 
           (record.borrowerName && record.borrowerName === currentUser?.displayName);
  });

  // Nếu sau khi lọc mà không có bản ghi nào phù hợp
  if (filteredHistory.length === 0) {
    return (
      <div className="glass-panel animate-fade-in" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>
        📋 {isAdmin ? "Thư viện chưa ghi nhận bất kỳ lịch sử mượn trả nào." : "Bạn chưa có lịch sử mượn trả đồ chơi nào."}
      </div>
    );
  }

  // Hàm helper tính ngày trả dự kiến (7 ngày sau ngày mượn)
  const getDisplayReturnDate = (record) => {
    if (record.status === 'Returned' || record.returnDate) {
      return record.returnDate;
    }
    
    if (record.expectedReturnDate) {
      return record.expectedReturnDate;
    }

    try {
      const borrow = new Date(record.borrowDate);
      borrow.setDate(borrow.getDate() + 7);
      return borrow.toISOString().split('T')[0];
    } catch (e) {
      return record.borrowDate;
    }
  };

  return (
    <div className="table-wrapper glass-panel animate-fade-in">
      <table className="history-table">
        <thead>
          <tr>
            <th>🧸 Tên Đồ Chơi</th>
            <th>👤 Người Mượn</th>
            <th>📅 Ngày Mượn</th>
            <th>↩️ Ngày Trả</th>
            <th>🏷️ Trạng Thái</th>
            {/* HƯỚNG 1: Chỉ User (parent) mới nhìn thấy tiêu đề cột Thao tác */}
            {isParent && <th>⚡ Thao Tác</th>}
          </tr>
        </thead>
        <tbody>
          {/* Đảo ngược danh sách đã lọc để hiển thị lượt mượn mới nhất lên đầu */}
          {[...filteredHistory].reverse().map((record) => (
            <tr key={record.id}>
              <td style={{ fontWeight: '600' }}>{record.toyName}</td>
              <td>{record.borrowerName}</td>
              <td>{record.borrowDate}</td>
              
              <td style={record.status === 'Active' ? { color: '#e67e22', fontWeight: '500' } : {}}>
                {getDisplayReturnDate(record)}
              </td>

              <td>
                <span className={`badge ${record.status === 'Active' ? 'badge-warning' : 'badge-success'}`}>
                  {record.status === 'Active' ? 'Đang mượn' : 'Đã trả'}
                </span>
              </td>
              
              {/* HƯỚNG 1: Chỉ User (parent) mới được render cột chứa nút Trả đồ chơi */}
              {isParent && (
                <td>
                  {record.status === 'Active' ? (
                    <button 
                      className="btn btn-secondary"
                      onClick={() => onReturn(record.toyId)}
                      style={{ padding: '6px 12px', fontSize: '13px' }}
                    >
                      Trả đồ chơi
                    </button>
                  ) : (
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Hoàn thành</span>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowHistoryTable;
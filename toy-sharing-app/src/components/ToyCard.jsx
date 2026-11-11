/**
 * 🧸 COMPONENT: ToyCard (Thẻ Hiển Thị Đồ Chơi + Kiểm Tra Điểm Uy Tín, Duyệt Bài Admin & Portal Đánh Giá)
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// 🟢 Hàm hỗ trợ xác định Hạng và Giới hạn mượn dựa trên Điểm Uy Tín
const getReputationTier = (score = 100) => {
  if (score >= 120) return { name: 'VVIP', maxBorrows: 5, color: '#9b59b6', badge: '💎' };
  if (score >= 100) return { name: 'Vàng', maxBorrows: 4, color: '#f1c40f', badge: '🥇' };
  if (score >= 80) return { name: 'Bạc', maxBorrows: 3, color: '#bdc3c7', badge: '🥈' };
  if (score >= 50) return { name: 'Đồng', maxBorrows: 2, color: '#e67e22', badge: '🥉' };
  return { name: 'Bị khóa', maxBorrows: 0, color: '#e74c3c', badge: '🚫' };
};

function ToyCard({ 
  toy, 
  role, 
  currentUser, 
  hasBorrowed = false, // 👈 Đã mượn món này mới được đánh giá
  onEdit, 
  onDelete, 
  onBorrow, 
  onReturn, 
  onToggleMaintenance,
  onAddReview,
  onApprove, // 👈 Mới: Hàm xử lý Admin duyệt bài
  onReject   // 👈 Mới: Hàm xử lý Admin từ chối bài
}) {
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviews, setReviews] = useState(toy?.reviews || []);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  // 🟢 Cập nhật state reviews nếu prop toy.reviews thay đổi
  useEffect(() => {
    setReviews(toy?.reviews || []);
  }, [toy?.reviews]);

  const isPending = toy?.status === 'Pending';
  const isBorrowed = toy?.status === 'Borrowed';
  const isMaintenance = toy?.status === 'Maintenance';
  const isAdmin = role?.toLowerCase() === 'admin';

  // 🛠️ Chuẩn hóa chuỗi so sánh
  const normalizeStr = (str) => {
    if (!str) return '';
    return str.toString().normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  };

  // 🟢 Thông tin User & Điểm uy tín
  const actualUser = currentUser?.user || currentUser;
  const reputationScore = actualUser?.reputationScore ?? 100;
  const currentlyBorrowed = actualUser?.currentlyBorrowedCount ?? 0;
  const userTier = getReputationTier(reputationScore);

  // 🟢 Kiểm tra tư cách mượn đồ
  const isBlocked = reputationScore < 50;
  const isBorrowLimitReached = currentlyBorrowed >= userTier.maxBorrows;

  // 🟢 Kiểm tra chính chủ đồ chơi & lượt mượn hiện tại
  const currentDisplayName = normalizeStr(actualUser?.displayName);
  const currentUsername = normalizeStr(actualUser?.username);
  const toyOwner = normalizeStr(toy?.owner);

  const isOwner = Boolean(
    toyOwner !== '' && (toyOwner === currentDisplayName || toyOwner === currentUsername)
  );

  const currentUserName = actualUser?.displayName || actualUser?.username || '';
  const isMyBorrow = currentUserName && toy?.borrowedBy && 
    normalizeStr(currentUserName) === normalizeStr(toy.borrowedBy);

  // 🟢 Tính điểm đánh giá trung bình
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + Number(r.rating), 0) / reviews.length).toFixed(1)
    : 0;

  // 🟢 Gửi đánh giá
  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!hasBorrowed) {
      alert('Bạn cần phải mượn món đồ chơi này trước thì mới có thể gửi đánh giá!');
      return;
    }

    const newReview = {
      id: Date.now().toString(),
      userName: actualUser?.displayName || actualUser?.username || 'Người dùng',
      rating: Number(rating),
      comment: comment.trim() || 'Chỉ chấm điểm sao (không có bình luận)',
      isVerifiedBorrower: true,
      createdAt: new Date().toLocaleDateString('vi-VN') + ' ' + new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    setComment('');
    setRating(5);

    if (onAddReview) {
      onAddReview(toy.id, updatedReviews);
    }
  };

  return (
    <div className={`toy-card glass-panel ${isPending ? 'pending-card' : ''}`} style={{ position: 'relative', display: 'flex', flexDirection: 'column', height: '100%' }}>
      
      {/* 🛠️ NÚT SỬA & XÓA DÀNH RIÊNG CHO ADMIN (Ẩn khi bài đang ở trạng thái chờ duyệt) */}
      {isAdmin && !isPending && (
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 10,
          display: 'flex',
          gap: '6px',
          background: 'rgba(255, 255, 255, 0.9)',
          padding: '4px 6px',
          borderRadius: '20px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
        }}>
          <button title="Chỉnh sửa" onClick={(e) => { e.stopPropagation(); onEdit(toy); }} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>✏️</button>
          <button title="Xóa" onClick={(e) => { e.stopPropagation(); onDelete(toy.id); }} style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '14px' }}>🗑️</button>
        </div>
      )}

      {/* 🖼️ HÌNH ẢNH & BADGE TRẠNG THÁI */}
      <div className="toy-image-wrapper" style={{ position: 'relative', height: '160px', overflow: 'hidden', borderRadius: '12px 12px 0 0' }}>
        <img 
          src={toy?.imageUrl} 
          alt={toy?.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=500&auto=format&fit=crop';
          }}
        />
        <span className={`status-badge ${toy?.status?.toLowerCase()}`} style={{
          position: 'absolute',
          bottom: '10px',
          left: '10px',
          padding: '4px 10px',
          borderRadius: '12px',
          fontSize: '12px',
          fontWeight: 'bold',
          color: '#fff',
          background: isPending ? '#f39c12' : isBorrowed ? '#e74c3c' : isMaintenance ? '#e67e22' : '#2ecc71'
        }}>
          {isPending ? '⏳ Chờ Admin duyệt' : isBorrowed ? 'Đang mượn' : isMaintenance ? '🔧 Bảo trì' : 'Có sẵn'}
        </span>
      </div>

      {/* 📄 THÔNG TIN CHI TIẾT */}
      <div className="toy-content" style={{ padding: '14px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div className="toy-tags" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', marginBottom: '8px' }}>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ color: '#8e44ad', fontWeight: '500' }}>📌 {toy?.category}</span>
            <span style={{ color: '#d35400', fontWeight: '500' }}>👶 {toy?.ageRange}</span>
          </div>
          
          <button 
            onClick={() => setShowReviewModal(true)} 
            style={{ border: 'none', background: '#fff3cd', color: '#856404', padding: '3px 8px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            ⭐ {averageRating > 0 ? averageRating : 'Mới'} ({reviews.length})
          </button>
        </div>

        <h3 className="toy-title" style={{ fontSize: '16px', margin: '0 0 8px 0', flexGrow: 1 }}>
          {toy?.name}
        </h3>

        {isBorrowed && (
          <p style={{ fontSize: '12px', color: '#e67e22', margin: '0 0 8px 0', background: '#fef5e7', padding: '4px 8px', borderRadius: '6px' }}>
            🤝 Đang mượn bởi: <strong>{toy?.borrowedBy || 'Thành viên'}</strong>
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#7f8c8d', borderTop: '1px solid #eee', paddingTop: '8px', marginBottom: '12px' }}>
          <span>📊 Trạng thái: <strong>{isPending ? 'Chờ duyệt' : isBorrowed ? 'Mượn' : isMaintenance ? 'Bảo trì' : 'Trống'}</strong></span>
          <span>📊 Lượt mượn: <strong>{toy?.currentBorrows || 0}/{toy?.maxBorrows || 5}</strong></span>
        </div>

        {/* 👤 CHỦ SỞ HỮU & NÚT THAO TÁC */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '12px', color: isOwner ? '#27ae60' : '#666', fontWeight: isOwner ? 'bold' : 'normal' }}>
            👤 {isOwner ? 'Me' : (toy?.owner || 'Chưa rõ')}
          </span>

          <div style={{ display: 'flex', gap: '6px' }}>
            {/* 🟢 KHỐI DUYỆT BÀI OPTION 1 DÀNH CHO ADMIN */}
            {isPending ? (
              isAdmin ? (
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button 
                    onClick={() => onApprove && onApprove(toy)}
                    style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    ✅ Duyệt
                  </button>
                  <button 
                    onClick={() => onReject && onReject(toy)}
                    style={{ background: '#e74c3c', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}
                  >
                    ❌ Từ chối
                  </button>
                </div>
              ) : (
                <span style={{ fontSize: '12px', color: '#e67e22', fontStyle: 'italic', fontWeight: '500' }}>
                  ⏳ Đang chờ duyệt...
                </span>
              )
            ) : (
              /* Các nút thao tác bình thường khi bài đã duyệt */
              <>
                <button 
                  onClick={() => setShowReviewModal(true)}
                  style={{ background: '#f0f2f5', border: '1px solid #ddd', padding: '6px 10px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: '500' }}
                  title="Xem và viết đánh giá"
                >
                  💬 Đánh giá
                </button>

                {isAdmin ? (
                  <>
                    {isBorrowed && <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); onReturn(toy); }}>↩️ Thu hồi</button>}
                    {isMaintenance ? (
                      <button className="btn btn-success" onClick={() => onToggleMaintenance(toy)} style={{ background: '#27ae60', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>✅ Xong bảo trì</button>
                    ) : (
                      !isBorrowed && <button className="btn btn-warning" onClick={() => onToggleMaintenance(toy)} style={{ background: '#f39c12', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '12px' }}>🔧 Bảo trì</button>
                    )}
                  </>
                ) : (
                  <>
                    {isBorrowed ? (
                      isMyBorrow ? (
                        <button className="btn btn-secondary" onClick={(e) => { e.stopPropagation(); onReturn(toy); }}>↩️ Trả đồ</button> 
                      ) : (
                        <button className="btn btn-outline-secondary" disabled style={{ opacity: 0.6, cursor: 'not-allowed', fontSize: '12px' }}>🔒 Đang mượn</button>
                      )
                    ) : isMaintenance ? (
                      <button className="btn btn-primary" disabled style={{ opacity: 0.6, cursor: 'not-allowed', fontSize: '12px' }}>🔧 Bảo trì</button>
                    ) : isBlocked ? (
                      <button className="btn btn-danger" disabled style={{ opacity: 0.6, cursor: 'not-allowed', fontSize: '12px' }} title="Tài khoản bị khóa mượn do điểm uy tín quá thấp (<50)">🚫 Bị khóa</button>
                    ) : isBorrowLimitReached ? (
                      <button className="btn btn-secondary" disabled style={{ opacity: 0.6, cursor: 'not-allowed', fontSize: '12px' }} title={`Đã đạt giới hạn mượn ${userTier.maxBorrows} món (${userTier.badge} ${userTier.name})`}>⚠️ Hết lượt</button>
                    ) : (
                      <button className="btn btn-primary" onClick={() => onBorrow(toy)}>🤝 Mượn</button>
                    )}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* 🌟 MODAL DÙNG PORTAL HIỂN THỊ CHUẨN GIỮA MÀN HÌNH */}
      {showReviewModal && ReactDOM.createPortal(
        <div 
          onClick={() => setShowReviewModal(false)}
          style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(4px)',
            zIndex: 99999,
            display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '16px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#ffffff',
              padding: '24px',
              borderRadius: '24px',
              maxWidth: '480px',
              width: '100%',
              maxHeight: '85vh',
              overflowY: 'auto',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* NÚT ĐÓNG */}
            <button 
              onClick={() => setShowReviewModal(false)}
              style={{
                position: 'absolute', top: '16px', right: '16px',
                border: 'none', background: '#f0f2f5', width: '32px', height: '32px',
                borderRadius: '50%', cursor: 'pointer', fontSize: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >
              ✕
            </button>

            <h3 style={{ margin: '0 0 4px 0', fontSize: '20px', color: '#1a1a1a' }}>
              ⭐ Đánh giá & Bình luận
            </h3>
            <p style={{ margin: '0 0 16px 0', color: '#666', fontSize: '13px' }}>
              Sản phẩm: <strong style={{ color: '#6c5ce7' }}>{toy?.name}</strong>
            </p>

            {/* FORM GỬI ĐÁNH GIÁ (CHỈ DÀNH CHO NGƯỜI ĐÃ HOẶC ĐANG MƯỢN) */}
            {hasBorrowed ? (
              <form onSubmit={handleSubmitReview} style={{ marginBottom: '20px', background: '#f8f9fa', padding: '16px', borderRadius: '16px', border: '1px solid #edf2f7' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px', color: '#16a34a', fontSize: '12px', fontWeight: 'bold' }}>
                  <span>✓</span> Bạn đã trải nghiệm món này - Hãy chia sẻ cảm nhận nhé:
                </div>
                <div style={{ marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label style={{ fontSize: '13px', fontWeight: 'bold', color: '#4a5568' }}>Chọn mức đánh giá:</label>
                  <select 
                    value={rating} 
                    onChange={(e) => setRating(e.target.value)}
                    style={{ padding: '6px 12px', borderRadius: '10px', border: '1px solid #cbd5e0', background: '#fff', fontSize: '13px', cursor: 'pointer' }}
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5/5 - Rất thích)</option>
                    <option value="4">⭐⭐⭐⭐ (4/5 - Hài lòng)</option>
                    <option value="3">⭐⭐⭐ (3/5 - Bình thường)</option>
                    <option value="2">⭐⭐ (2/5 - Chưa ưng ý)</option>
                    <option value="1">⭐ (1/5 - Kém)</option>
                  </select>
                </div>

                <textarea 
                  rows="3" 
                  placeholder="Nhập cảm nhận của bạn (không bắt buộc)..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  style={{
                    width: '100%', padding: '12px', borderRadius: '12px',
                    border: '1px solid #e2e8f0', background: '#fff',
                    boxSizing: 'border-box', marginBottom: '12px',
                    fontSize: '13px', resize: 'none', outline: 'none'
                  }}
                />

                <button 
                  type="submit" 
                  style={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #6366f1 100%)',
                    color: '#fff', border: 'none', padding: '10px 16px',
                    borderRadius: '12px', width: '100%', cursor: 'pointer',
                    fontWeight: 'bold', fontSize: '14px', boxShadow: '0 4px 12px rgba(124, 58, 237, 0.3)'
                  }}
                >
                  Gửi đánh giá
                </button>
              </form>
            ) : (
              <div style={{
                marginBottom: '20px',
                background: '#fffbeb',
                border: '1px solid #fef3c7',
                padding: '16px',
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '12px'
              }}>
                <span style={{ fontSize: '24px', lineHeight: 1 }}>🔒</span>
                <div>
                  <strong style={{ fontSize: '14px', color: '#92400e', display: 'block', marginBottom: '4px' }}>
                    Chưa đủ điều kiện đánh giá
                  </strong>
                  <span style={{ fontSize: '13px', color: '#b45309', lineHeight: '1.4', display: 'block' }}>
                    Chỉ thành viên <strong>đã hoặc đang mượn</strong> món đồ chơi này mới có thể viết nhận xét & chấm điểm sao. Bạn hãy mượn đồ chơi để trải nghiệm trước nhé!
                  </span>
                </div>
              </div>
            )}

            <hr style={{ border: 'none', borderTop: '1px dashed #e2e8f0', margin: '20px 0' }} />

            {/* DANH SÁCH BÌNH LUẬN */}
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#2d3748', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>💬 Tất cả bình luận</span>
              <span style={{ fontSize: '12px', color: '#a0aec0', fontWeight: 'normal' }}>{reviews.length} đánh giá</span>
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {reviews.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '20px 0', color: '#a0aec0', fontSize: '13px' }}>
                  Chưa có đánh giá nào.
                </div>
              ) : (
                reviews.map(rev => (
                  <div key={rev.id} style={{ background: '#f8f9fa', padding: '12px 14px', borderRadius: '12px', borderLeft: '3px solid #7c3aed' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <strong style={{ fontSize: '13px', color: '#2d3748' }}>👤 {rev.userName}</strong>
                        {rev.isVerifiedBorrower && (
                          <span style={{ fontSize: '10px', background: '#dcfce7', color: '#15803d', padding: '1px 6px', borderRadius: '10px', fontWeight: 'bold' }}>
                            ✓ Đã mượn
                          </span>
                        )}
                      </div>
                      <span style={{ color: '#f59e0b', fontSize: '12px' }}>{'⭐'.repeat(rev.rating)}</span>
                    </div>
                    <p style={{ margin: '0 0 6px 0', fontSize: '13px', color: '#4a5568', lineHeight: '1.4' }}>{rev.comment}</p>
                    <span style={{ fontSize: '10px', color: '#a0aec0' }}>{rev.createdAt}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>,
        document.body
      )}

    </div>
  );
}

export default ToyCard;
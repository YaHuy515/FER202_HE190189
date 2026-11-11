/**
 * 🛠️ UTILS: reputation.js - Quản lý Logic Điểm Uy Tín & Phân Hạng
 */

// 1. Hàm lấy thông tin Hạng thành viên dựa trên điểm
export const getUserTierInfo = (score = 100) => {
  if (score >= 120) {
    return {
      tier: 'VVIP',
      label: '🌟 VVIP',
      color: '#8e44ad',
      bgColor: '#f3e5f5',
      maxBorrows: 5,
      maxDays: 14,
      canBorrow: true
    };
  } else if (score >= 80) {
    return {
      tier: 'NORMAL',
      label: '🟢 Bình Thường',
      color: '#27ae60',
      bgColor: '#e8f8f5',
      maxBorrows: 3,
      maxDays: 7,
      canBorrow: true
    };
  } else if (score >= 50) {
    return {
      tier: 'WARNING',
      label: '🟡 Cảnh Báo',
      color: '#d35400',
      bgColor: '#fef5e7',
      maxBorrows: 1,
      maxDays: 3,
      canBorrow: true
    };
  } else {
    return {
      tier: 'BLOCKED',
      label: '🔴 Khóa Quyền Mượn',
      color: '#c0392b',
      bgColor: '#fadbd8',
      maxBorrows: 0,
      maxDays: 0,
      canBorrow: false
    };
  }
};

// 2. Hàm kiểm tra xem User có đủ điều kiện bấm mượn món đồ này không
export const checkBorrowEligibility = (user) => {
  const score = user?.reputationScore ?? 100;
  const currentBorrows = user?.currentlyBorrowedCount ?? 0;
  const tierInfo = getUserTierInfo(score);

  if (!tierInfo.canBorrow) {
    return {
      allowed: false,
      reason: `Tài khoản của bạn chỉ còn ${score} điểm uy tín (Dưới 50). Quyền mượn đã bị khóa tự động!`
    };
  }

  if (currentBorrows >= tierInfo.maxBorrows) {
    return {
      allowed: false,
      reason: `Hạng ${tierInfo.label} chỉ được mượn tối đa ${tierInfo.maxBorrows} món cùng lúc. Bạn đã mượn ${currentBorrows} món!`
    };
  }

  return {
    allowed: true,
    maxDays: tierInfo.maxDays
  };
};

// 3. Hàm tính toán cộng/trừ điểm khi Trả đồ
export const calculateReturnScore = (dueDateStr, isDamaged = false) => {
  let scoreChange = 0;
  let reason = '';
  const now = new Date();
  const dueDate = new Date(dueDateStr);

  if (isDamaged) {
    scoreChange -= 30;
    reason = 'Đồ chơi bị hỏng/mất phụ kiện (-30 điểm)';
  } else if (now > dueDate) {
    // Tính số ngày quá hạn
    const diffTime = Math.abs(now - dueDate);
    const overdueDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    scoreChange -= overdueDays * 10; // -10 điểm/ngày
    reason = `Trả quá hạn ${overdueDays} ngày (-${overdueDays * 10} điểm)`;
  } else {
    scoreChange += 5; // Trả đúng hạn
    reason = 'Trả đồ đúng hạn & giữ gìn tốt (+5 điểm)';
  }

  return { scoreChange, reason };
};
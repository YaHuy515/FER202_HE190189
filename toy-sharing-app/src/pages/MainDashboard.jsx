/**
 * 📊 PAGE: MainDashboard (Trang Quản Lý & Bảng Điều Khiển Chính)
 * ------------------------------------------------------------------
 * 🎯 Chức năng chính:
 *   - Quản lý danh sách đồ chơi (Thêm, Sửa, Xóa, Mượn, Trả, Bảo trì).
 *   - [CẬP NHẬT 2]: Thêm luồng duyệt đồ chơi (Duyệt: handleApproveToy / Từ chối: handleRejectToy).
 *   - Cập nhật handleFormSubmit: Đồ chơi đăng mới sẽ ở trạng thái 'Pending'.
 *   - Cập nhật filteredToys: Phân quyền hiển thị (Thành viên chỉ thấy đồ chơi 'Available'/'Borrowed'/'Maintenance' hoặc món do mình tạo 'Pending'; Admin/Mod thấy tất cả để duyệt).
 */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import StatsDashboard from '../components/StatsDashboard';
import ToyCard from '../components/ToyCard';
import ToyFormModal from '../components/ToyFormModal';
import BorrowHistoryTable from '../components/BorrowHistoryTable';
import BorrowModal from '../components/BorrowModal';
import ReturnModal from '../components/ReturnModal';

const API_TOYS = 'http://localhost:9999/toys';
const API_HISTORY = 'http://localhost:9999/history';
const API_USERS = 'http://localhost:9999/users';

function MainDashboard({ currentUser, onUpdateUser, onLogout, theme, toggleTheme, showToast }) {
  // Data States
  const [toys, setToys] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Modal States
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingToy, setEditingToy] = useState(null);

  // Modal Borrow/Return States
  const [selectedToyForBorrow, setSelectedToyForBorrow] = useState(null);
  const [isBorrowModalOpen, setIsBorrowModalOpen] = useState(false);
  const [selectedToyForReturn, setSelectedToyForReturn] = useState(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  // Fetch from json-server API
  const fetchData = async () => {
    setLoading(true);
    try {
      const [toysRes, historyRes] = await Promise.all([
        axios.get(API_TOYS),
        axios.get(API_HISTORY)
      ]);
      setToys(toysRes.data);
      setHistory(historyRes.data);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      showToast('Lỗi kết nối máy chủ API! Vui lòng kiểm tra json-server.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Reset Filters
  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setAgeFilter('');
    setStatusFilter('');
  };

  // =========================================================================
  // 🟢 1. CẬP NHẬT: handleFormSubmit (Đồ chơi đăng mới sẽ chờ duyệt 'Pending')
  // =========================================================================
  const handleFormSubmit = async (formData) => {
    try {
      if (editingToy) {
        // Edit mode API
        const response = await axios.put(`${API_TOYS}/${editingToy.id}`, {
          ...editingToy,
          ...formData
        });
        setToys(prev => prev.map(t => t.id === editingToy.id ? response.data : t));

        // Sync toyName in history logs parallelly
        const relatedLogs = history.filter(log => log.toyId === editingToy.id);
        if (relatedLogs.length > 0) {
          await Promise.all(
            relatedLogs.map(log => axios.patch(`${API_HISTORY}/${log.id}`, { toyName: formData.name }))
          );
          const historyRes = await axios.get(API_HISTORY);
          setHistory(historyRes.data);
        }
        
        showToast(`Đã cập nhật thông tin đồ chơi "${formData.name}"!`, 'success');
      } else {
        // Add mode API: Đồ chơi mới đăng mặc định là trạng thái 'Pending' (Chờ duyệt)
        const isAdminOrMod = currentUser?.role?.toLowerCase() === 'admin' || currentUser?.role?.toLowerCase() === 'moderator';
        const initialStatus = isAdminOrMod ? 'Available' : 'Pending';

        const newToy = {
          ...formData,
          status: initialStatus, // 'Pending' nếu là User, 'Available' nếu Admin/Mod tự đăng
          owner: currentUser?.displayName || 'Thành viên ToyShare',
          ownerId: currentUser?.id,
          borrowedBy: null,
          borrowedById: null,
          borrowedDate: null,
          currentBorrows: 0,
          maxBorrows: formData.maxBorrows || 5,
          createdAt: new Date().toISOString()
        };

        const response = await axios.post(API_TOYS, newToy);
        setToys(prev => [response.data, ...prev]);

        if (initialStatus === 'Pending') {
          showToast(`Đã gửi đồ chơi "${formData.name}". Vui lòng chờ Admin/Mod phê duyệt! ⏳`, 'info');
        } else {
          // Cộng điểm uy tín nếu Admin đăng trực tiếp
          if (currentUser?.id) {
            const currentScore = currentUser.reputationScore ?? 45;
            const userRes = await axios.patch(`${API_USERS}/${currentUser.id}`, {
              reputationScore: currentScore + 5
            });
            if (onUpdateUser) onUpdateUser(userRes.data);
          }
          showToast(`Đã đăng thành công đồ chơi "${formData.name}"! 🎉`, 'success');
        }
      }

      setIsFormOpen(false);
      setEditingToy(null);
    } catch (err) {
      console.error(err);
      showToast('Thao tác lưu đồ chơi thất bại!', 'danger');
    }
  };

  // =========================================================================
  // 🟢 2. BỔ SUNG: handleApproveToy (Duyệt bài đăng)
  // =========================================================================
  const handleApproveToy = async (toy) => {
    try {
      // 1. Chuyển trạng thái đồ chơi thành 'Available'
      const response = await axios.patch(`${API_TOYS}/${toy.id}`, {
        status: 'Available'
      });

      // 2. Cộng +5 điểm uy tín cho Chủ sở hữu đồ chơi (Owner)
      if (toy.ownerId) {
        try {
          const ownerRes = await axios.get(`${API_USERS}/${toy.ownerId}`);
          const ownerUser = ownerRes.data;
          const newScore = (ownerUser.reputationScore ?? 45) + 5;

          const updatedOwnerRes = await axios.patch(`${API_USERS}/${toy.ownerId}`, {
            reputationScore: newScore
          });

          // Nếu người được duyệt chính là user đang đăng nhập
          if (toy.ownerId === currentUser?.id && onUpdateUser) {
            onUpdateUser(updatedOwnerRes.data);
          }
        } catch (e) {
          console.warn('Không tìm thấy thông tin user để cộng điểm:', e);
        }
      }

      // 3. Cập nhật State UI
      setToys(prev => prev.map(t => t.id === toy.id ? response.data : t));
      showToast(`Đã phê duyệt đồ chơi "${toy.name}" thành công! (+5 điểm cho chủ món đồ) 🎉`, 'success');

    } catch (err) {
      console.error(err);
      showToast('Lỗi khi phê duyệt đồ chơi!', 'danger');
    }
  };

  // =========================================================================
  // 🟢 3. BỔ SUNG: handleRejectToy (Từ chối / Xóa bài đăng bị từ chối)
  // =========================================================================
  const handleRejectToy = async (toyOrId) => {
    const targetToy = typeof toyOrId === 'object' ? toyOrId : toys.find(t => t.id === toyOrId);
    const toyId = targetToy ? targetToy.id : toyOrId;
    const toyName = targetToy ? targetToy.name : 'bài đăng';

    const confirmReject = window.confirm(`Bạn có chắc chắn muốn từ chối/xóa bài đăng "${toyName}"?`);
    if (!confirmReject) return;

    try {
      await axios.delete(`${API_TOYS}/${toyId}`);
      setToys(prev => prev.filter(t => t.id !== toyId));
      showToast(`Đã từ chối và gỡ bỏ bài đăng "${toyName}".`, 'warning');
    } catch (err) {
      console.error(err);
      showToast('Không thể từ chối bài đăng!', 'danger');
    }
  };

  // Delete Toy
  const handleDeleteToy = async (toyId) => {
    const toyToDelete = toys.find(t => t.id === toyId);
    if (!toyToDelete) return;

    if (toyToDelete.status === 'Borrowed') {
      showToast('Không thể xóa đồ chơi đang trong trạng thái mượn!', 'danger');
      return;
    }

    const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa đồ chơi "${toyToDelete.name}"?`);
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_TOYS}/${toyId}`);
      setToys(prev => prev.filter(t => t.id !== toyId));
      showToast(`Đã xóa đồ chơi khỏi thư viện!`, 'danger');
    } catch (err) {
      console.error(err);
      showToast('Không thể thực hiện hành động xóa đồ chơi!', 'danger');
    }
  };

  // Toggle Maintenance (Bật / Tắt trạng thái Bảo trì)
  const handleToggleMaintenance = async (toyOrId) => {
    const targetToy = typeof toyOrId === 'object' ? toyOrId : toys.find(t => t.id === toyOrId);
    if (!targetToy) return;

    if (targetToy.status === 'Borrowed') {
      showToast('Không thể bảo trì đồ chơi đang được mượn!', 'danger');
      return;
    }

    const isCurrentlyMaintenance = targetToy.status === 'Maintenance';
    const nextStatus = isCurrentlyMaintenance ? 'Available' : 'Maintenance';
    const updatePayload = {
      status: nextStatus,
      ...(isCurrentlyMaintenance ? { currentBorrows: 0 } : {})
    };

    try {
      const response = await axios.patch(`${API_TOYS}/${targetToy.id}`, updatePayload);
      setToys(prev => prev.map(t => t.id === targetToy.id ? response.data : t));
      if (nextStatus === 'Maintenance') {
        showToast(`Đã chuyển đồ chơi "${targetToy.name}" sang trạng thái 🔧 Bảo trì!`, 'warning');
      } else {
        showToast(`Đã hoàn tất bảo trì "${targetToy.name}"! Đồ chơi hiện đã sẵn sàng cho mượn.`, 'success');
      }
    } catch (err) {
      console.error(err);
      showToast('Không thể cập nhật trạng thái bảo trì!', 'danger');
    }
  };

  // Add / Save Review
  const handleAddReview = async (toyId, updatedReviews) => {
    try {
      await axios.patch(`${API_TOYS}/${toyId}`, { reviews: updatedReviews });
      setToys(prev => prev.map(t => t.id === toyId ? { ...t, reviews: updatedReviews } : t));
      showToast('Cảm ơn bạn đã gửi đánh giá! ⭐', 'success');
    } catch (err) {
      console.error('Error saving review:', err);
      showToast('Không thể lưu đánh giá!', 'danger');
    }
  };

  // Open Form modal for editing
  const openEditModal = (toy) => {
    if (toy.status === 'Borrowed') {
      showToast('Không thể sửa thông tin đồ chơi đang được mượn!', 'danger');
      return;
    }
    setEditingToy(toy);
    setIsFormOpen(true);
  };

  // Mở BorrowModal
  const handleOpenBorrowModal = (toy) => {
    if (toy.status === 'Pending') {
      showToast('Đồ chơi này đang chờ duyệt, chưa thể mượn!', 'warning');
      return;
    }
    if (toy.status === 'Borrowed') {
      showToast('Đồ chơi này đang được mượn!', 'danger');
      return;
    }
    if (toy.status === 'Maintenance') {
      showToast('Đồ chơi đang trong quá trình bảo trì!', 'danger');
      return;
    }
    setSelectedToyForBorrow(toy);
    setIsBorrowModalOpen(true);
  };

  // Xác nhận mượn
  const handleConfirmBorrow = async (borrowData) => {
    const borrowerName = currentUser?.displayName || 'Thành viên ToyShare';

    try {
      const toyResponse = await axios.patch(`${API_TOYS}/${borrowData.toyId}`, {
        status: 'Borrowed',
        borrowedBy: borrowerName,
        borrowedById: currentUser?.id,
        borrowedDate: borrowData.borrowDate,
        returnDate: borrowData.returnDate
      });

      const newLog = {
        id: 'hist-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        toyId: borrowData.toyId,
        toyName: borrowData.toyName,
        borrowerName: borrowerName,
        borrowerId: currentUser?.id,
        borrowDate: borrowData.borrowDate,
        returnDate: borrowData.returnDate,
        note: borrowData.note || '',
        status: 'Active'
      };
      const logResponse = await axios.post(API_HISTORY, newLog);

      setToys(prev => prev.map(t => t.id === borrowData.toyId ? toyResponse.data : t));
      setHistory(prev => [logResponse.data, ...prev]);

      showToast(`Đã gửi yêu cầu mượn "${borrowData.toyName}" thành công!`, 'success');
      setIsBorrowModalOpen(false);
      setSelectedToyForBorrow(null);
    } catch (err) {
      console.error(err);
      showToast('Thao tác mượn đồ chơi thất bại!', 'danger');
    }
  };

  // Mở ReturnModal
  const handleOpenReturnModal = (toy) => {
    setSelectedToyForReturn(toy);
    setIsReturnModalOpen(true);
  };

  // Xác nhận trả đồ chơi
  const handleConfirmReturn = async (toyId) => {
    const toy = toys.find(t => t.id === toyId);
    if (!toy) return;

    const todayStr = new Date().toLocaleDateString('vi-VN');
    const activeLog = history.find(log => log.toyId === toyId && log.status === 'Active');

    const nextBorrows = (toy.currentBorrows || 0) + 1;
    const maxLimit = toy.maxBorrows || 5;
    const nextStatus = nextBorrows >= maxLimit ? 'Maintenance' : 'Available';

    try {
      const toyResponse = await axios.patch(`${API_TOYS}/${toyId}`, {
        status: nextStatus,
        borrowedBy: null,
        borrowedById: null,
        borrowedDate: null,
        currentBorrows: nextBorrows
      });

      if (activeLog) {
        await axios.patch(`${API_HISTORY}/${activeLog.id}`, {
          status: 'Returned',
          actualReturnDate: todayStr
        });
      }

      const BONUS_POINTS = 5;
      const borrowerId = activeLog?.borrowerId || toy.borrowedById || currentUser?.id;

      if (borrowerId) {
        const userRes = await axios.get(`${API_USERS}/${borrowerId}`);
        const borrowerUser = userRes.data;
        const currentScore = borrowerUser.reputationScore ?? 45;

        const updatedUserRes = await axios.patch(`${API_USERS}/${borrowerId}`, {
          reputationScore: currentScore + BONUS_POINTS
        });

        if (borrowerId === currentUser?.id && onUpdateUser) {
          onUpdateUser(updatedUserRes.data);
        }
      }

      setToys(prev => prev.map(t => t.id === toyId ? toyResponse.data : t));

      const historyRes = await axios.get(API_HISTORY);
      setHistory(historyRes.data);

      setIsReturnModalOpen(false);
      setSelectedToyForReturn(null);

      if (nextStatus === 'Maintenance') {
        showToast(`Đã nhận lại "${toy.name}". Người mượn nhận được +${BONUS_POINTS} điểm. Sản phẩm đạt giới hạn mượn và chuyển sang 🔧 BẢO TRÌ!`, 'info');
      } else {
        showToast(`Xác nhận trả đồ chơi "${toy.name}" thành công! +${BONUS_POINTS} điểm uy tín cho người mượn.`, 'success');
      }

    } catch (err) {
      console.error(err);
      showToast('Lỗi khi thực hiện trả đồ chơi!', 'danger');
    }
  };

  // =========================================================================
  // 🟢 4. CẬP NHẬT: filteredToys (Phân quyền & Lọc trạng thái duyệt)
  // =========================================================================
  const role = currentUser?.role;
  const isAdminOrMod = role?.toLowerCase() === 'admin' || role?.toLowerCase() === 'moderator';

  const filteredToys = toys.filter(toy => {
    // A. Lọc theo Phân quyền hiển thị (Visibility Check):
    // 1. Admin / Moderator: Thấy được tất cả bao gồm 'Pending'
    // 2. User thường: Chỉ thấy đồ chơi công khai ('Available', 'Borrowed', 'Maintenance') 
    //    HOẶC thấy đồ chơi 'Pending' DO CHÍNH HỌ ĐĂNG.
    if (!isAdminOrMod) {
      if (toy.status === 'Pending' && toy.ownerId !== currentUser?.id) {
        return false;
      }
    }

    // B. Lọc theo Từ khóa tìm kiếm:
    const nameMatch = toy.name ? toy.name.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const descMatch = toy.description ? toy.description.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    const matchesSearch = nameMatch || descMatch;

    // C. Lọc theo Thể loại, Độ tuổi & Trạng thái:
    const matchesCategory = categoryFilter === '' || toy.category === categoryFilter;
    const matchesAge = ageFilter === '' || toy.ageRange === ageFilter;
    const matchesStatus = statusFilter === '' || toy.status === statusFilter;

    return matchesSearch && matchesCategory && matchesAge && matchesStatus;
  });

  const categories = [...new Set(toys.map(t => t.category).filter(Boolean))];
  const ageRanges = ['Dưới 1 tuổi', '1 - 3 tuổi', '3 - 6 tuổi', 'Trên 6 tuổi'];

  return (
    <div className="animate-fade-in" style={{ width: '100%' }}>
      <Navbar 
        currentUser={currentUser} 
        onLogout={onLogout} 
        theme={theme} 
        toggleTheme={toggleTheme} 
      />

      <StatsDashboard toys={toys} />

      {/* TOOLBAR SEARCH & FILTERS */}
      <div className="toolbar glass-panel" style={{ padding: '16px 20px', borderRadius: 'var(--radius-md)' }}>
        <div className="search-filters">
          <div className="search-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              className="form-control search-input" 
              placeholder="Tìm đồ chơi theo tên, mô tả..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          </div>

          <select 
            className="form-control filter-select"
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="">Tất cả thể loại</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            className="form-control filter-select"
            value={ageFilter}
            onChange={e => setAgeFilter(e.target.value)}
          >
            <option value="">Tất cả độ tuổi</option>
            {ageRanges.map(age => <option key={age} value={age}>{age}</option>)}
          </select>

          <select 
            className="form-control filter-select"
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Available">Có sẵn (Sẵn sàng)</option>
            <option value="Borrowed">Đang được mượn</option>
            <option value="Maintenance">🔧 Đang bảo trì</option>
            <option value="Pending">⏳ Chờ duyệt</option>
          </select>

          {(searchQuery || categoryFilter || ageFilter || statusFilter) && (
            <button 
              className="btn btn-outline" 
              onClick={handleResetFilters}
              title="Đặt lại bộ lọc"
            >
              🔄 Xóa lọc
            </button>
          )}
        </div>

        {currentUser && (
          <button 
            className="btn btn-primary"
            onClick={() => {
              setEditingToy(null);
              setIsFormOpen(true);
            }}
            style={{ whiteSpace: 'nowrap' }}
          >
            ➕ Đăng Đồ Chơi Mới
          </button>
        )}
      </div>

      {/* TOYS LIST SECTION */}
      <div className="section-title">
        <span>🎮 Danh Sách Đồ Chơi</span>
        <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--text-muted)' }}>
          (Hiển thị {filteredToys.length} / {toys.length} sản phẩm)
        </span>
      </div>

      {loading ? (
        <div className="text-center my-4" style={{ padding: '40px' }}>
          <p>⏳ Đang tải dữ liệu đồ chơi từ server...</p>
        </div>
      ) : filteredToys.length === 0 ? (
        <div className="empty-state glass-panel">
          <span className="empty-icon">🧩</span>
          <h3>Không tìm thấy đồ chơi phù hợp</h3>
          <p>Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh các bộ lọc phía trên.</p>
          <button className="btn btn-secondary mt-2" onClick={handleResetFilters}>
            Xóa tất cả bộ lọc
          </button>
        </div>
      ) : (
        <div className="toys-grid">
          {filteredToys.map(toy => {
            // Kiểm tra xem user hiện tại đã từng mượn hoặc đang mượn món đồ chơi này chưa
            const currentUserId = currentUser?.id;
            const currentDisplayName = currentUser?.displayName?.trim()?.toLowerCase();

            const hasBorrowedInHistory = history.some(h => 
              h.toyId === toy.id && (
                (currentUserId && h.borrowerId === currentUserId) ||
                (currentDisplayName && h.borrowerName?.trim()?.toLowerCase() === currentDisplayName)
              )
            );

            const isCurrentlyBorrowing = (
              (currentUserId && toy.borrowedById === currentUserId) ||
              (currentDisplayName && toy.borrowedBy?.trim()?.toLowerCase() === currentDisplayName)
            );

            const hasBorrowed = Boolean(hasBorrowedInHistory || isCurrentlyBorrowing);

            return (
              <ToyCard 
                key={toy.id} 
                toy={toy} 
                currentUser={currentUser}
                role={role} 
                hasBorrowed={hasBorrowed}
                onEdit={openEditModal} 
                onDelete={handleDeleteToy} 
                onBorrow={handleOpenBorrowModal}
                onReturn={() => handleOpenReturnModal(toy)}
                onToggleMaintenance={handleToggleMaintenance}
                onFinishMaintenance={handleToggleMaintenance}
                onAddReview={handleAddReview}
                /* Đã truyền thêm 2 hàm duyệt xuống ToyCard */
                onApprove={handleApproveToy}
                onReject={handleRejectToy}
              />
            );
          })}
        </div>
      )}

      {/* HISTORY TABLE SECTION */}
      <div className="section-title" style={{ marginTop: '20px' }}>
        <span>📋 Lịch Sử Mượn Trả Đồ Chơi</span>
      </div>

      <BorrowHistoryTable 
        history={history} 
        onReturn={(toyId) => {
          const toy = toys.find(t => t.id === toyId);
          if (toy) handleOpenReturnModal(toy);
        }} 
        role={role}
        currentUser={currentUser}
      />

      {/* MODALS SECTION */}
      <ToyFormModal 
        isOpen={isFormOpen} 
        onClose={() => {
          setIsFormOpen(false);
          setEditingToy(null);
        }}
        onSubmit={handleFormSubmit}
        toy={editingToy}
      />

      <BorrowModal 
        isOpen={isBorrowModalOpen}
        onClose={() => {
          setIsBorrowModalOpen(false);
          setSelectedToyForBorrow(null);
        }}
        toy={selectedToyForBorrow}
        onSubmit={handleConfirmBorrow}
      />

      <ReturnModal 
        isOpen={isReturnModalOpen}
        onClose={() => {
          setIsReturnModalOpen(false);
          setSelectedToyForReturn(null);
        }}
        toy={selectedToyForReturn}
        onConfirm={handleConfirmReturn}
      />
    </div>
  );
}

export default MainDashboard;
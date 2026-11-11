/**
 * 📝 COMPONENT: ToyFormModal (Hộp Thoại Thêm / Sửa Đồ Chơi)
 * ------------------------------------------------------------------
 * 🎯 Chức năng: Form nhập thông tin chi tiết đồ chơi (tên, người sở hữu, thể loại, độ tuổi, mô tả, hình ảnh).
 * 🖼️ Hình ảnh: Cho phép chọn từ danh sách ảnh mẫu có sẵn hoặc nhập link URL tùy chỉnh.
 */

import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const PRESET_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1515488042361-404e9250afef?w=400', label: 'Tàu hỏa gỗ' },
  { url: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400', label: 'Lego xếp hình' },
  { url: 'https://images.unsplash.com/photo-1559251606-c623743a6d76?w=400', label: 'Gấu bông' },
  { url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?w=400', label: 'Cờ vua / Boardgame' },
  { url: 'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=400', label: 'Nhà búp bê' },
  { url: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=400', label: 'Robot thông minh' }
];

const CATEGORIES = [
  'Lắp ráp & Xếp hình',
  'Xe cộ & Vận động',
  'Búp bê & Thú bông',
  'Trí tuệ & Board game',
  'Sáng tạo & Nghệ thuật',
  'Đồ chơi khoa học',
  'Khác'
];

const AGE_RANGES = [
  'Dưới 1 tuổi',
  '1 - 3 tuổi',
  '3 - 6 tuổi',
  'Trên 6 tuổi'
];

function ToyFormModal({ isOpen, onClose, onSubmit, toy = null }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [ageRange, setAgeRange] = useState(AGE_RANGES[2]);
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [owner, setOwner] = useState('');
  const [customImage, setCustomImage] = useState(false);

  useEffect(() => {
    if (toy) {
      setName(toy.name);
      setDescription(toy.description);
      setCategory(toy.category);
      setAgeRange(toy.ageRange);
      setImageUrl(toy.imageUrl);
      setOwner(toy.owner);
      const isPreset = PRESET_IMAGES.some(p => p.url === toy.imageUrl);
      setCustomImage(!isPreset);
    } else {
      setName('');
      setDescription('');
      setCategory(CATEGORIES[0]);
      setAgeRange(AGE_RANGES[2]);
      setImageUrl(PRESET_IMAGES[0].url);
      setOwner('');
      setCustomImage(false);
    }
  }, [toy, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !owner.trim()) {
      alert('Vui lòng điền đầy đủ thông tin!');
      return;
    }
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      category,
      ageRange,
      imageUrl,
      owner: owner.trim()
    });
  };

  // 2. Bọc phần return bằng ReactDOM.createPortal
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{toy ? '✏️ Cập Nhật Đồ Chơi' : '🧸 Đăng Đồ Chơi Mới'}</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="modal-toy-name">Tên đồ chơi *</label>
            <input 
              id="modal-toy-name"
              type="text" 
              className="form-control" 
              value={name} 
              onChange={e => setName(e.target.value)} 
              placeholder="Ví dụ: Lego tàu hỏa siêu cấp"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="modal-toy-owner">Người sở hữu *</label>
            <input 
              id="modal-toy-owner"
              type="text" 
              className="form-control" 
              value={owner} 
              onChange={e => setOwner(e.target.value)} 
              placeholder="Ví dụ: Minh Hải..."
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="form-group">
              <label htmlFor="modal-toy-category">Thể loại</label>
              <select 
                id="modal-toy-category"
                className="form-control" 
                value={category} 
                onChange={e => setCategory(e.target.value)}
              >
                {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="modal-toy-age">Độ tuổi thích hợp</label>
              <select 
                id="modal-toy-age"
                className="form-control" 
                value={ageRange} 
                onChange={e => setAgeRange(e.target.value)}
              >
                {AGE_RANGES.map(age => <option key={age} value={age}>{age}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="modal-toy-description">Mô tả chi tiết</label>
            <textarea 
              id="modal-toy-description"
              className="form-control" 
              rows="3" 
              value={description} 
              onChange={e => setDescription(e.target.value)}
              placeholder="Ghi chú về phụ kiện đi kèm, mô tả trạng thái mới/cũ..."
            />
          </div>

          <div className="form-group">
            <label>Ảnh đồ chơi</label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={!customImage} 
                  onChange={() => {
                    setCustomImage(false);
                    setImageUrl(PRESET_IMAGES[0].url);
                  }} 
                />
                Ảnh mẫu có sẵn
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  checked={customImage} 
                  onChange={() => setCustomImage(true)} 
                />
                Đường link ảnh tùy chọn
              </label>
            </div>

            {!customImage ? (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 1fr)', 
                gap: '8px',
                background: 'var(--bg-primary)',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                {PRESET_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setImageUrl(img.url)}
                    style={{
                      height: '50px',
                      borderRadius: '4px',
                      overflow: 'hidden',
                      border: imageUrl === img.url ? '3px solid var(--primary)' : '1px solid var(--border-color)',
                      padding: 0,
                      cursor: 'pointer',
                      transition: 'var(--transition)'
                    }}
                    title={img.label}
                  >
                    <img src={img.url} alt={img.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            ) : (
              <input 
                type="url" 
                className="form-control" 
                value={imageUrl} 
                onChange={e => setImageUrl(e.target.value)} 
                placeholder="Ví dụ: https://link-anh-cua-ban.png"
              />
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn btn-primary">{toy ? 'Lưu thay đổi' : 'Đăng đồ chơi'}</button>
          </div>
        </form>
      </div>
    </div>,
    document.body // 3. Đưa modal ra ngoài body
  );
}

export default ToyFormModal;
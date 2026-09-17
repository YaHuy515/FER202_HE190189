import React, { useState } from 'react';
import StudentManagement from './StudentManagement';
import Exsercise4 from './Exsercise4';

function App() {
  // Mặc định hiển thị Student Management giao diện chuẩn 100% theo đề bài
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div>
      {/* Nút chuyển đổi nhanh ở góc màn hình để không làm ảnh hưởng giao diện gốc */}
      <div style={{ position: 'fixed', top: '12px', right: '16px', zIndex: 9999 }}>
        {activeTab === 'student' ? (
          <button
            onClick={() => setActiveTab('ex4')}
            style={{
              backgroundColor: '#ffffff',
              color: '#475569',
              border: '1px solid #cbd5e1',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
              cursor: 'pointer'
            }}
          >
            Chuyển sang Exercise 4 ➔
          </button>
        ) : (
          <button
            onClick={() => setActiveTab('student')}
            style={{
              backgroundColor: '#2563eb',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              padding: '6px 14px',
              fontSize: '12.5px',
              fontWeight: '600',
              boxShadow: '0 2px 6px rgba(37,99,235,0.25)',
              cursor: 'pointer'
            }}
          >
            ← Về Student Management
          </button>
        )}
      </div>

      {/* Hiển thị bài tập được chọn */}
      {activeTab === 'student' ? <StudentManagement /> : <Exsercise4 />}
    </div>
  );
}

export default App;
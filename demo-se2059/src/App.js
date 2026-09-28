import React, { useState } from 'react';
import StudentManagement from './StudentManagement';
import Exsercise4 from './Exsercise4';
import Exercise12 from './Exercise12';
import Exercise13 from './Exercise13';
import Exercise14 from './Exercise14';
import Exercise15 from './Exercise15';

function App() {
  const [activeTab, setActiveTab] = useState('ex15');

  return (
    <div>
      {/* Nút chuyển đổi nhanh ở góc màn hình để tiện xem bài tập */}
      <div style={{ position: 'fixed', top: '12px', right: '16px', zIndex: 9999, display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button
          onClick={() => setActiveTab('student')}
          style={{
            backgroundColor: activeTab === 'student' ? '#2563eb' : '#ffffff',
            color: activeTab === 'student' ? '#ffffff' : '#475569',
            border: activeTab === 'student' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Student Management
        </button>

        <button
          onClick={() => setActiveTab('ex4')}
          style={{
            backgroundColor: activeTab === 'ex4' ? '#2563eb' : '#ffffff',
            color: activeTab === 'ex4' ? '#ffffff' : '#475569',
            border: activeTab === 'ex4' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Exercise 4
        </button>

        <button
          onClick={() => setActiveTab('ex12')}
          style={{
            backgroundColor: activeTab === 'ex12' ? '#2563eb' : '#ffffff',
            color: activeTab === 'ex12' ? '#ffffff' : '#475569',
            border: activeTab === 'ex12' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Exercise 12 (useState)
        </button>

        <button
          onClick={() => setActiveTab('ex13')}
          style={{
            backgroundColor: activeTab === 'ex13' ? '#2563eb' : '#ffffff',
            color: activeTab === 'ex13' ? '#ffffff' : '#475569',
            border: activeTab === 'ex13' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Exercise 13 (useEffect)
        </button>

        <button
          onClick={() => setActiveTab('ex14')}
          style={{
            backgroundColor: activeTab === 'ex14' ? '#2563eb' : '#ffffff',
            color: activeTab === 'ex14' ? '#ffffff' : '#475569',
            border: activeTab === 'ex14' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Exercise 14 (useContext)
        </button>

        <button
          onClick={() => setActiveTab('ex15')}
          style={{
            backgroundColor: activeTab === 'ex15' ? '#2563eb' : '#ffffff',
            color: activeTab === 'ex15' ? '#ffffff' : '#475569',
            border: activeTab === 'ex15' ? 'none' : '1px solid #cbd5e1',
            borderRadius: '6px',
            padding: '6px 12px',
            fontSize: '12.5px',
            fontWeight: '600',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
            cursor: 'pointer'
          }}
        >
          Exercise 15 (useReducer)
        </button>
      </div>

      {/* Hiển thị bài tập được chọn */}
      {activeTab === 'student' && <StudentManagement />}
      {activeTab === 'ex4' && <Exsercise4 />}
      {activeTab === 'ex12' && <Exercise12 />}
      {activeTab === 'ex13' && <Exercise13 />}
      {activeTab === 'ex14' && <Exercise14 />}
      {activeTab === 'ex15' && <Exercise15 />}
    </div>
  );
}

export default App;
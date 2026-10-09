import React, { useState } from 'react';
import StudentManagement from './StudentManagement';
import Exsercise4 from './Exsercise4';
import Exercise12 from './Exercise12';
import Exercise13 from './Exercise13';
import Exercise14 from './Exercise14';
import Exercise15 from './Exercise15';
import Exercise16 from './Exercise16';
import Exercise17 from './Exercise17';
import Exercise18 from './Exercise18';
import Exercise19 from './Exercise19';
import Exercise20 from './Exercise20';
import Exercise21 from './Exercise21';
import Exercise22 from './Exercise22';

const exerciseTabs = [
  { id: 'student', label: 'Student Mgmt' },
  { id: 'ex4', label: 'Ex 4' },
  { id: 'ex12', label: 'Ex 12 (useState)' },
  { id: 'ex13', label: 'Ex 13 (useEffect)' },
  { id: 'ex14', label: 'Ex 14 (useContext)' },
  { id: 'ex15', label: 'Ex 15 (useReducer)' },
  { id: 'ex16', label: 'Ex 16 (Event Handling)' },
  { id: 'ex17', label: 'Ex 17 (Render & Commit)' },
  { id: 'ex18', label: 'Ex 18 (State Snapshot)' },
  { id: 'ex19', label: 'Ex 19 (PropTypes)' },
  { id: 'ex20', label: 'Ex 20 (Decoupling Route)' },
  { id: 'ex21', label: 'Ex 21 (Route ResourceID)' },
  { id: 'ex22', label: 'Ex 22 (Optional Params & Link)' },
];

function App() {
  const [activeTab, setActiveTab] = useState('ex22');

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Thanh chọn Exercise nhỏ gọn dạng hàng ngang ở trên cùng */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          backgroundColor: '#ffffff',
          borderBottom: '2px solid #e2e8f0',
          boxShadow: '0 2px 4px rgba(0,0,0,0.04)',
          padding: '8px 16px'
        }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between flex-wrap gap-2 px-0">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-dark" style={{ fontSize: '13px', whiteSpace: 'nowrap' }}>
              📚 FER202 Exercises:
            </span>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-1">
            {exerciseTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    backgroundColor: isActive ? '#2563eb' : '#ffffff',
                    color: isActive ? '#ffffff' : '#475569',
                    border: isActive ? '1px solid #2563eb' : '1px solid #cbd5e1',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '11.5px',
                    fontWeight: isActive ? '700' : '500',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease-in-out',
                    boxShadow: isActive ? '0 1px 3px rgba(37,99,235,0.3)' : 'none',
                    whiteSpace: 'nowrap'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#f1f5f9';
                      e.currentTarget.style.borderColor = '#94a3b8';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = '#ffffff';
                      e.currentTarget.style.borderColor = '#cbd5e1';
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Vùng hiển thị nội dung bài tập nằm hoàn toàn bên dưới thanh chọn */}
      <div className="pb-5 pt-3">
        {activeTab === 'student' && <StudentManagement />}
        {activeTab === 'ex4' && <Exsercise4 />}
        {activeTab === 'ex12' && <Exercise12 />}
        {activeTab === 'ex13' && <Exercise13 />}
        {activeTab === 'ex14' && <Exercise14 />}
        {activeTab === 'ex15' && <Exercise15 />}
        {activeTab === 'ex16' && <Exercise16 />}
        {activeTab === 'ex17' && <Exercise17 />}
        {activeTab === 'ex18' && <Exercise18 />}
        {activeTab === 'ex19' && <Exercise19 />}
        {activeTab === 'ex20' && <Exercise20 />}
        {activeTab === 'ex21' && <Exercise21 />}
        {activeTab === 'ex22' && <Exercise22 />}
      </div>
    </div>
  );
}

export default App;
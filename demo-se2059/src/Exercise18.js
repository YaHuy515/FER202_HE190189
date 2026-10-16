import React, { useState } from 'react';

// Component minh họa trực quan kèm bảng thông báo trạng thái Snapshot
function InteractiveSnapshotDemo() {
  const [count, setCount] = useState(0);
  const [snapshot, setSnapshot] = useState(null);
  const [message, setMessage] = useState('Chưa có snapshot nào được lưu.');

  const handleIncrement = () => {
    setCount(prev => prev + 1);
    setMessage(`Đã tăng Count lên ${count + 1}`);
  };

  const handleSnapshot = () => {
    setSnapshot(count);
    setMessage(`📸 Đã lưu Snapshot giá trị: ${count}`);
  };

  const handleRestore = () => {
    if (snapshot !== null) {
      setCount(snapshot);
      setMessage(`🔄 Đã khôi phục Count về Snapshot: ${snapshot}`);
    } else {
      setMessage('⚠️ Chưa có snapshot nào để khôi phục! Hãy nhấn "Take Snapshot" trước.');
    }
  };

  return (
    <div className="p-4 rounded border bg-white shadow-sm text-center" style={{ maxWidth: '520px', margin: '0 auto' }}>
      <h3 className="fw-bold text-dark mb-2">State as a Snapshot Demo</h3>
      <p className="fs-4 text-primary fw-bold mb-3">Count: {count}</p>
      
      <div className="btn-group mb-3" role="group">
        <button type="button" className="btn btn-outline-primary fw-semibold" onClick={handleIncrement}>
          Increment
        </button>
        <button type="button" className="btn btn-outline-success fw-semibold" onClick={handleSnapshot}>
          Take Snapshot
        </button>
        <button 
          type="button" 
          className="btn btn-outline-warning fw-semibold" 
          onClick={handleRestore}
          disabled={snapshot === null}
        >
          Restore Snapshot
        </button>
      </div>

      <div className="p-3 rounded text-start" style={{ backgroundColor: '#f1f5f9', border: '1px solid #cbd5e1' }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="small text-secondary fw-bold">Trạng thái Snapshot trong bộ nhớ:</span>
          <span className={`badge ${snapshot !== null ? 'bg-success' : 'bg-secondary'}`}>
            {snapshot !== null ? `Snapshot = ${snapshot}` : 'null'}
          </span>
        </div>
        <div className="small text-dark mt-2 fw-medium">
          <i className="bi bi-info-circle me-1 text-primary"></i>
          {message}
        </div>
      </div>
    </div>
  );
}

function Exercise18() {
  return (
    <div className="container py-4" style={{ maxWidth: '860px' }}>
      {/* Header Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 18: Demo about State as a Snapshot</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            In this example, we'll create a simple counter component that allows you to take a snapshot of the current count value and restore it later.
          </p>
        </div>
      </div>

      {/* Exercises Card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <p className="text-secondary">
            Create a new React component called <code>SnapshotDemo</code>. In this component, we use the <code>useState</code> hook to create two state variables: <code>count</code> and <code>snapshot</code>.
          </p>
          <ul className="text-secondary mb-4" style={{ paddingLeft: '20px' }}>
            <li className="mb-2">
              <strong>handleIncrement</strong>: Increases the count value by 1 when the "Increment" button is clicked.
            </li>
            <li className="mb-2">
              <strong>handleSnapshot</strong>: Takes a snapshot of the current count value and stores it in the snapshot state when the "Take Snapshot" button is clicked.
            </li>
            <li className="mb-2">
              <strong>handleRestore</strong>: Restores the count value from the snapshot state when the "Restore Snapshot" button is clicked, but only if a snapshot is available.
            </li>
          </ul>

          {/* Hướng dẫn các bước thử nghiệm */}
          <div className="alert alert-info py-2 px-3 mb-4" style={{ fontSize: '0.9rem' }}>
            <strong>💡 Cách kiểm tra các nút hoạt động:</strong>
            <ol className="mb-0 mt-1 ps-3">
              <li>Nhấn nút <strong>Increment</strong> nhiều lần (ví dụ đếm lên <code>Count: 5</code>).</li>
              <li>Nhấn <strong>Take Snapshot</strong> để lưu mốc 5 vào bộ nhớ <code>snapshot</code>.</li>
              <li>Nhấn tiếp <strong>Increment</strong> (ví dụ tăng tiếp lên <code>Count: 10</code>).</li>
              <li>Nhấn <strong>Restore Snapshot</strong> &rarr; Count sẽ được khôi phục tức thì về <code>5</code>!</li>
            </ol>
          </div>

          {/* Live Output Container */}
          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - SNAPSHOT DEMO (WITH VISUAL FEEDBACK)
              </span>
              <span className="badge bg-primary">React 18 StrictMode</span>
            </div>

            <div className="card-body p-4 text-center" style={{ backgroundColor: '#f8fafc' }}>
              <InteractiveSnapshotDemo />
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion Card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            Using state as a snapshot allows you to save and restore specific states of your component. In this demo, we save the count value as a snapshot and restore it if a snapshot is available. This concept can be useful when you want to implement features like undo/redo functionality or save and restore user input in forms.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise18;

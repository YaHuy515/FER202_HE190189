import React, { useState } from 'react';
import RenderAndCommitDemo from './Component/RenderAndCommitDemo';

// Visualizer component for Render and Commit steps with Light & Crisp Theme
function RenderCommitExplainer({ currentCount }) {
  return (
    <div className="card bg-white text-dark p-4 mt-4 border shadow-sm text-start">
      <h5 className="text-primary fw-bold mb-3 text-center">
        React Render & Commit Process Breakdown
      </h5>

      {/* Step 1: Trigger */}
      <div className="p-3 mb-3 rounded" style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderLeft: '5px solid #f59e0b' }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-bold text-dark">
            1. Trigger Phase
          </span>
          <span className="badge bg-warning text-dark px-2 py-1">State Change</span>
        </div>
        <p className="text-secondary mb-0" style={{ fontSize: '0.92rem' }}>
          Người dùng nhấn <strong>Increment</strong> &rarr; gọi hàm <code>setCount(count + 1)</code> &rarr; thông báo cho React rằng component cần render lại.
        </p>
      </div>

      {/* Step 2: Render */}
      <div className="p-3 mb-3 rounded" style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderLeft: '5px solid #3b82f6' }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-bold text-dark">
            2. Render Phase (Reconciliation)
          </span>
          <span className="badge bg-primary px-2 py-1">Diffing Virtual DOM</span>
        </div>
        <p className="text-secondary mb-0" style={{ fontSize: '0.92rem' }}>
          React gọi hàm <code>RenderAndCommitDemo()</code>. React tính toán JSX, tạo cây Virtual DOM mới và so sánh (diff) với Virtual DOM trước đó để tìm điểm thay đổi.
        </p>
      </div>

      {/* Step 3: Commit */}
      <div className="p-3 rounded" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '5px solid #10b981' }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <span className="fw-bold text-dark">
            3. Commit Phase
          </span>
          <span className="badge bg-success px-2 py-1">Real DOM Update</span>
        </div>
        <p className="text-secondary mb-0" style={{ fontSize: '0.92rem' }}>
          React cập nhật <strong>chỉ đúng phần thay đổi</strong> lên DOM thật của trình duyệt (cập nhật số đếm trong thẻ <code>&lt;p&gt;Count: {currentCount}&lt;/p&gt;</code>).
        </p>
      </div>
    </div>
  );
}

function Exercise17() {
  const [showExplainer, setShowExplainer] = useState(true);

  return (
    <div className="container py-4" style={{ maxWidth: '860px' }}>
      {/* Header card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 17: Demo about Render and Commit</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            In this exercise, through a simple demo that illustrates the concepts of rendering and committing in React.
          </p>
        </div>
      </div>

      {/* Exercises card */}
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <ul className="text-secondary mb-4" style={{ paddingLeft: '20px' }}>
            <li className="mb-2">
              Create a new React component called <code>RenderAndCommitDemo</code>. This component will have a button that, when clicked, changes the state and triggers a re-rendering.
            </li>
            <li className="mb-2">
              Render the <code>RenderAndCommitDemo</code> component in the root of our application.
            </li>
          </ul>

          {/* Live Output Container (Bright/Light Theme) */}
          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - RENDER AND COMMIT DEMO
              </span>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowExplainer(!showExplainer)}
              >
                {showExplainer ? 'Hide Breakdown' : 'Show Breakdown'}
              </button>
            </div>

            <div className="card-body p-4 text-center" style={{ backgroundColor: '#f8fafc' }}>
              <div 
                className="p-4 rounded border bg-white shadow-sm d-inline-block text-center" 
                style={{ minWidth: '320px', maxWidth: '480px' }}
              >
                <RenderAndCommitDemo />
              </div>

              {showExplainer && <RenderCommitExplainer currentCount="N" />}
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion card */}
      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            In this demo, when the button is clicked and the state is updated, React triggers the reconciliation process. It compares the previous virtual DOM with the updated virtual DOM and determines that the count value has changed. React then applies the necessary changes to the actual DOM, updating the displayed count value on the screen.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise17;

import React, { useState } from 'react';
import EventHandlingDemo from './EventHandlingDemo';

// Extended demo component with Light & Crisp Theme
function ExtendedEventShowcase() {
  const [textInput, setTextInput] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [lastKey, setLastKey] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmittedText(textInput);
  };

  return (
    <div className="card bg-white text-dark p-4 mt-4 border shadow-sm text-start" style={{ maxWidth: '650px', margin: '0 auto' }}>
      <h5 className="text-primary fw-bold mb-3 text-center">
        Extended Event Handling Demos
      </h5>
      
      {/* 1. onChange & onSubmit */}
      <form onSubmit={handleFormSubmit} className="mb-3 p-3 rounded" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <label className="form-label text-dark small fw-bold">
          1. Form Events (<code>onChange</code> & <code>onSubmit</code>):
        </label>
        <div className="input-group">
          <input 
            type="text" 
            className="form-control"
            placeholder="Type text and submit..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          />
          <button className="btn btn-primary" type="submit">Submit</button>
        </div>
        {submittedText && (
          <div className="mt-2 text-success small fw-semibold">
            Submitted value: <strong>{submittedText}</strong>
          </div>
        )}
      </form>

      {/* 2. onMouseEnter / onMouseLeave */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="p-3 mb-3 rounded text-center"
        style={{
          backgroundColor: isHovered ? '#dbeafe' : '#f8fafc',
          border: '1px dashed #3b82f6',
          cursor: 'pointer',
          transition: 'all 0.2s ease'
        }}
      >
        <div className="fw-bold mb-1 text-dark">
          2. Mouse Events (<code>onMouseEnter</code> / <code>onMouseLeave</code>)
        </div>
        <span className="small text-secondary">
          {isHovered ? 'Mouse is inside the box! 🎯' : 'Hover over this area to trigger event 🖱️'}
        </span>
      </div>

      {/* 3. onKeyDown */}
      <div className="p-3 rounded" style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0' }}>
        <label className="form-label text-dark small fw-bold">
          3. Keyboard Event (<code>onKeyDown</code>):
        </label>
        <input 
          type="text" 
          className="form-control"
          placeholder="Click here and press any key..."
          onKeyDown={(e) => setLastKey(`${e.key} (Code: ${e.code})`)}
        />
        {lastKey && (
          <div className="mt-2 text-primary small fw-semibold">
            Last key pressed: <code>{lastKey}</code>
          </div>
        )}
      </div>
    </div>
  );
}

function Exercise16() {
  const [showExtended, setShowExtended] = useState(false);

  return (
    <div className="container py-4" style={{ maxWidth: '860px' }}>
      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h2 className="fw-bold text-dark mb-2">Exercise 16: Demo about Event Handling</h2>
          <hr style={{ borderTop: '2px solid #0f172a', margin: '10px 0 16px' }} />
          <h5 className="fst-italic text-secondary">Objectives and Outcomes</h5>
          <p className="text-muted mb-0">
            This exercise is a demo that showcases event handling in React.
          </p>
        </div>
      </div>

      <div className="card shadow-sm mb-4 border" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h4 className="fw-bold text-dark mb-3">Exercises</h4>
          <ul className="text-secondary mb-4" style={{ paddingLeft: '20px' }}>
            <li className="mb-2">
              Create a functional component called <code>EventHandlingDemo</code>. Inside the component, we use the <code>useState</code> hook to initialize and manage a <code>count</code> state variable.
            </li>
            <li className="mb-2">
              Define a function called <code>handleButtonClick</code> that increments the count state when the button is clicked. This function is called in the <code>onClick</code> event handler of the button.
            </li>
          </ul>

          <div className="card border rounded overflow-hidden">
            <div className="card-header d-flex justify-content-between align-items-center bg-light border-bottom px-3 py-2">
              <span className="fw-bold text-secondary" style={{ fontSize: '0.85rem' }}>
                LIVE OUTPUT - EVENT HANDLING DEMO
              </span>
              <button 
                className="btn btn-sm btn-outline-primary"
                onClick={() => setShowExtended(!showExtended)}
              >
                {showExtended ? 'Hide Extensions' : 'Show Extended Events'}
              </button>
            </div>
            <div className="card-body p-4 text-center" style={{ backgroundColor: '#f8fafc' }}>
              <div 
                className="p-4 rounded border bg-white shadow-sm d-inline-block text-center" 
                style={{ minWidth: '320px', maxWidth: '480px' }}
              >
                <EventHandlingDemo />
              </div>

              {showExtended && <ExtendedEventShowcase />}
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm border text-center" style={{ backgroundColor: '#ffffff' }}>
        <div className="card-body p-4">
          <h5 className="fst-italic text-secondary">Conclusion</h5>
          <p className="text-muted mb-0" style={{ fontSize: '0.95rem' }}>
            This demo showcases a simple event handling scenario in React. You can extend and modify it to handle different events and perform various actions based on user interaction.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Exercise16;

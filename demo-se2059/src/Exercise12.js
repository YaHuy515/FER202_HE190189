import React, { useState } from 'react';

export default function Exercise12() {
  // State bài 1
  const [count, setCount] = useState(0);

  // State bài 2
  const [text, setText] = useState('');

  // State bài 3
  const [isVisible, setIsVisible] = useState(false);

  // State bài 4
  const [todos, setTodos] = useState(['Học lập trình .NET', 'Học lập trình Java']);
  const [inputTask, setInputTask] = useState('');

  const handleAddTodo = (e) => {
    e.preventDefault();
    const trimmed = inputTask.trim();
    if (trimmed) {
      setTodos([...todos, trimmed]);
      setInputTask('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  // State bài 5
  const [selectedColor, setSelectedColor] = useState('Select a color');
  const colorMap = {
    'Red': '#e74c3c',
    'Blue': '#0033ff',
    'Green': '#2ecc71',
    'Yellow': '#f1c40f'
  };
  const currentColorCode = colorMap[selectedColor] || 'transparent';

  // State bài 6
  const initialItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  const [searchQuery, setSearchQuery] = useState('');
  const filteredItems = initialItems.filter(item =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // State bài 7
  const [dndItems, setDndItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']);
  const [draggingIndex, setDraggingIndex] = useState(null);

  const handleDragStart = (e, index) => {
    setDraggingIndex(index);
    e.dataTransfer.setData('text/plain', index);
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    if (draggingIndex === null || draggingIndex === targetIndex) return;
    const updated = [...dndItems];
    const [moved] = updated.splice(draggingIndex, 1);
    updated.splice(targetIndex, 0, moved);
    setDndItems(updated);
    setDraggingIndex(null);
  };

  return (
    <div style={{ maxWidth: '820px', margin: '0 auto', padding: '40px 20px 80px', color: '#1a1a1a', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ fontSize: '1.85rem', fontWeight: 700, marginBottom: '8px' }}>
        Exercise 12: React Hook (useState)
      </h1>
      <hr style={{ borderTop: '2px solid #333', margin: '10px 0 20px' }} />

      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#222', marginBottom: '8px' }}>
          Objectives and Outcomes
        </h2>
        <p style={{ color: '#333', fontSize: '0.95rem' }}>
          <strong>useState</strong> is a React hook that allows you to add state to functional components in React. 
          By using the <code>useState</code> hook, you can easily introduce and manage state in your functional components, 
          allowing them to maintain and update data over time.
        </p>
      </div>

      <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#222', marginBottom: '20px' }}>
        Exercises
      </h2>

      {/* Bài 1: Counter */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          1. Creating a simple counter component that increments a number every time a button is clicked.
        </div>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>Expectations:</div>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Every time the button is clicked, the number should increment by 1</li>
          <li>Display the current number state as the text element</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '320px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button 
            style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px', padding: '6px 18px', fontSize: '14px', cursor: 'pointer', marginBottom: '20px' }}
            onClick={() => setCount(prev => prev + 1)}
          >
            Increment
          </button>
          <div style={{ fontSize: '1.45rem' }}>Count: {count}</div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 2: Controlled Input */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          2. Controlled Input Field
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Create an input field component that allows a user to type in text and displays the text in real-time.
        </p>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>Expectations:</div>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Every time the user types something in the input field, the text should update in the text element</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <input 
            type="text" 
            style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px', padding: '5px 10px', fontSize: '14px', marginBottom: '20px', width: '220px' }}
            placeholder="abc"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ fontSize: '1.25rem' }}>Input text: {text}</div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 3: Toggle Visibility */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          3. Toggle Visibility
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Creating a component that toggles the visibility of a piece of text when a button is clicked.
        </p>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>Expectations:</div>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Initially, the text should be hidden and there is only show button</li>
          <li>When the button is clicked, the text should become visible and hide button is changed</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '320px', minHeight: '160px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <button 
            style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px', padding: '6px 18px', fontSize: '14px', cursor: 'pointer', marginBottom: '14px' }}
            onClick={() => setIsVisible(prev => !prev)}
          >
            {isVisible ? 'Hide' : 'Show'}
          </button>
          {isVisible && <div style={{ fontSize: '1.25rem' }}>Toggle me!</div>}
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 4: Todo List */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          4. Todo List
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Creating a simple Todo List component that allows users to add new items to the list and delete items once they are completed. The Todo List should have the following features:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>An input field for adding new todo items</li>
          <li>A button to submit the new todo item</li>
          <li>Display the list of todo items</li>
          <li>A delete button next to each todo item to remove it from the list</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '440px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <form onSubmit={handleAddTodo} style={{ display: 'flex', gap: '8px', width: '100%', justifyContent: 'center' }}>
            <input 
              type="text"
              style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px', padding: '5px 10px', fontSize: '14px', flex: 1 }}
              placeholder="Please enter a Task"
              value={inputTask}
              onChange={(e) => setInputTask(e.target.value)}
            />
            <button 
              type="submit" 
              style={{ backgroundColor: '#e65c53', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', fontSize: '13px', cursor: 'pointer' }}
            >
              Add Todo
            </button>
          </form>

          <div style={{ backgroundColor: '#fff', color: '#212529', borderRadius: '4px', padding: '14px 18px', width: '100%', maxWidth: '320px', marginTop: '14px' }}>
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '0.9rem', color: '#555', marginBottom: '8px' }}>
              Todo List
            </div>
            {todos.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: '1px solid #eee' }}>
                <span style={{ fontSize: '0.9rem' }}>{item}</span>
                <button 
                  onClick={() => handleDeleteTodo(idx)}
                  style={{ backgroundColor: '#e65c53', color: '#fff', border: 'none', padding: '2px 8px', borderRadius: '4px', fontSize: '11px', cursor: 'pointer' }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 5: Color Switcher */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          5. Color Switcher
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Creating a simple Color Switcher component that allows users to change the background color of a div by selecting a color from a dropdown list.
        </p>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>Expectations:</div>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Create a dropdown list with a few color options (e.g., red, blue, green, yellow)</li>
          <li>When a color is selected from the dropdown, the background color of the div should change to the selected color</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '420px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', width: '100%' }}>
            <select 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #ccc', fontSize: '14px' }}
            >
              <option value="Select a color">Select a color</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Green">Green</option>
              <option value="Yellow">Yellow</option>
            </select>

            <div 
              style={{
                width: '110px',
                height: '110px',
                borderRadius: '3px',
                border: '1px solid rgba(255,255,255,0.2)',
                backgroundColor: currentColorCode,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'background-color 0.2s'
              }}
            >
              {currentColorCode !== 'transparent' ? (
                <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '14px', textShadow: '0 1px 2px rgba(0,0,0,0.8)' }}>
                  {selectedColor}
                </span>
              ) : (
                <span style={{ color: '#888', fontSize: '11px' }}>Color Box</span>
              )}
            </div>
          </div>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 6: Search Filter */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          6. Search Filter
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Creating a simple Search Filter component that allows users to filter a list of items based on their search input.
        </p>
        <div style={{ fontSize: '0.95rem', fontStyle: 'italic', fontWeight: 600, marginBottom: '4px' }}>Expectations:</div>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Create an input field for users to type in their search query</li>
          <li>Display the list of items and filter them based on the user's search input</li>
        </ul>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '24px 20px', maxWidth: '340px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <input 
            type="text"
            style={{ backgroundColor: '#fff', border: '1px solid #ced4da', borderRadius: '4px', padding: '5px 10px', fontSize: '14px', width: '100%', marginBottom: '16px' }}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <ul style={{ listStyleType: 'disc', margin: 0, paddingLeft: '20px', fontSize: '1.15rem' }}>
            {filteredItems.map((item, idx) => (
              <li key={idx} style={{ padding: '3px 0' }}>{item}</li>
            ))}
          </ul>
        </div>
        <hr style={{ border: 0, borderTop: '1px solid #e0e0e0', margin: '30px 0' }} />
      </div>

      {/* Bài 7: Drag and Drop List */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>
          7. Drag and Drop List
        </div>
        <p style={{ fontSize: '0.95rem', color: '#333', marginBottom: '8px' }}>
          Creating a simple Drag and Drop List component that allows users to reorder a list of items by dragging and dropping them. The Drag and Drop List should have the following features:
        </p>
        <ul style={{ paddingLeft: '20px', marginBottom: '16px', fontSize: '0.92rem', color: '#333' }}>
          <li>Display the list of items</li>
          <li>Allow users to drag and drop items to reorder the list</li>
        </ul>

        <div style={{ fontSize: '0.88rem', color: '#555', marginBottom: '12px' }}>
          <strong>Hint:</strong> Kéo mục và thả vào vị trí mong muốn để đổi thứ tự (sử dụng sự kiện <code>onDragStart</code>, <code>onDragOver</code>, <code>onDrop</code> và <code>splice</code> của ES6).
        </div>

        <div style={{ backgroundColor: '#282c34', color: '#fff', borderRadius: '6px', padding: '20px', maxWidth: '320px', display: 'flex', flexDirection: 'column', width: '100%' }}>
          {dndItems.map((item, idx) => (
            <div 
              key={item}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, idx)}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '6px 12px',
                marginBottom: '6px',
                borderRadius: '4px',
                backgroundColor: draggingIndex === idx ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                border: draggingIndex === idx ? '1px dashed #fff' : '1px solid rgba(255,255,255,0.2)',
                cursor: 'grab',
                userSelect: 'none'
              }}
            >
              <span>• {item}</span>
              <span style={{ fontSize: '11px', color: '#aaa' }}>drag ↕</span>
            </div>
          ))}
        </div>
      </div>

      {/* Conclusion */}
      <div style={{ marginTop: '40px', paddingTop: '10px' }}>
        <h2 style={{ fontSize: '1.15rem', fontStyle: 'italic', fontWeight: 600, color: '#222', marginBottom: '8px' }}>
          Conclusion
        </h2>
        <p style={{ color: '#333', fontSize: '0.95rem' }}>
          After learning about <code>useState</code> in React Hook, you should now have a good understanding 
          of how to add and manage state in functional components.
        </p>
      </div>
    </div>
  );
}

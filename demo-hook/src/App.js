import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  useReducer,
} from 'react';
import './App.css';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import {
  todoReducer,
  defaultTodos,
  TODO_ACTIONS,
} from './reducers/todoReducer';
import TodoItem from './components/TodoItem';

function TodoApp() {
  // 1. useContext: Quản lý Theme (Dark / Light Mode)
  const { theme, toggleTheme } = useTheme();

  // 2. useState: Quản lý input nhập nội dung công việc
  const [inputText, setInputText] = useState('');

  // 3. useReducer: Thay thế useState để quản lý danh sách công việc (Todo)
  // Khởi tạo state bằng lazy initialization từ localStorage nếu có
  const [todos, dispatch] = useReducer(todoReducer, defaultTodos, (initial) => {
    try {
      const savedTodos = window.localStorage.getItem('demo_todos');
      return savedTodos ? JSON.parse(savedTodos) : initial;
    } catch (error) {
      console.error('Lỗi khi tải todos từ localStorage:', error);
      return initial;
    }
  });

  // 4. useRef: Tham chiếu để tự động focus vào ô input
  const inputRef = useRef(null);

  // 5. useEffect: Focus vào ô input khi component được mount lần đầu
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // 6. useEffect: Tự động lưu dữ liệu danh sách todos vào localStorage khi state thay đổi
  useEffect(() => {
    try {
      window.localStorage.setItem('demo_todos', JSON.stringify(todos));
    } catch (error) {
      console.error('Lỗi khi lưu todos vào localStorage:', error);
    }
  }, [todos]);

  // 7. useMemo: Đếm số lượng công việc chưa hoàn thành (tối ưu tính toán)
  const uncompletedCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }, [todos]);

  // 8. useCallback: Tối ưu hóa hàm thêm công việc mới
  const handleAddTodo = useCallback(
    (e) => {
      e.preventDefault();
      const trimmed = inputText.trim();
      if (!trimmed) return;

      dispatch({ type: TODO_ACTIONS.ADD_TODO, payload: trimmed });
      setInputText('');
      inputRef.current?.focus();
    },
    [inputText]
  );

  // useCallback: Tối ưu hàm chuyển đổi trạng thái hoàn thành
  const handleToggleTodo = useCallback((id) => {
    dispatch({ type: TODO_ACTIONS.TOGGLE_TODO, payload: id });
  }, []);

  // useCallback: Tối ưu hàm xóa công việc
  const handleDeleteTodo = useCallback((id) => {
    dispatch({ type: TODO_ACTIONS.DELETE_TODO, payload: id });
  }, []);

  return (
    <div className={`app-container ${theme}`}>
      <main className="todo-card">
        {/* Tiêu đề chính */}
        <h1 className="main-title">React Hooks Demo</h1>

        {/* Nút chuyển đổi Dark/Light mode dùng useContext */}
        <div className="theme-toggle-wrapper">
          <button
            type="button"
            className="theme-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </button>
        </div>

        <div className="section-divider" />

        {/* Tiêu đề phần thêm công việc */}
        <h2 className="section-heading">Thêm công việc</h2>

        {/* Form thêm công việc */}
        <form className="add-todo-form" onSubmit={handleAddTodo}>
          <input
            ref={inputRef}
            type="text"
            className="todo-input"
            placeholder="Nhập công việc..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button type="submit" className="add-btn">
            Thêm
          </button>
        </form>

        <div className="section-divider" />

        {/* Số lượng công việc chưa hoàn thành dùng useMemo */}
        <h3 className="uncompleted-count">
          Chưa hoàn thành: {uncompletedCount}
        </h3>

        <div className="section-divider" />

        {/* Danh sách các công việc */}
        <div className="todo-list">
          {todos.length === 0 ? (
            <p className="empty-message">Không có công việc nào!</p>
          ) : (
            todos.map((todo) => (
              <React.Fragment key={todo.id}>
                <TodoItem
                  todo={todo}
                  onToggle={handleToggleTodo}
                  onDelete={handleDeleteTodo}
                />
                <div className="section-divider" />
              </React.Fragment>
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <TodoApp />
    </ThemeProvider>
  );
}

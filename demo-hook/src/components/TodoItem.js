import React from 'react';

/**
 * TodoItem component được bọc bởi React.memo
 * để kết hợp với useCallback trong parent component,
 * tránh re-render không cần thiết khi các state khác thay đổi.
 */
function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <div className="todo-item-row">
      <span
        className={`todo-text ${todo.completed ? 'completed' : ''}`}
        onClick={() => onToggle(todo.id)}
        title="Nhấp để hoàn thành / bỏ hoàn thành"
      >
        {todo.text}
      </span>
      <button
        type="button"
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
      >
        Xóa
      </button>
    </div>
  );
}

export default React.memo(TodoItem);

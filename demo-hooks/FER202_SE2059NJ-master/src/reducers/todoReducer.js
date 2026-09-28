/**
 * useReducer: Thay thế useState để quản lý các tác vụ phức tạp của danh sách Todo
 */

export const TODO_ACTIONS = {
  ADD_TODO: 'ADD_TODO',
  TOGGLE_TODO: 'TOGGLE_TODO',
  DELETE_TODO: 'DELETE_TODO',
  SET_TODOS: 'SET_TODOS',
};

// Dữ liệu ban đầu khớp với giao diện mẫu
export const defaultTodos = [
  { id: 1, text: 'Học React', completed: false },
  { id: 2, text: 'Lại Học React', completed: false },
  { id: 3, text: 'Tiếp tục học React', completed: false },
];

export function todoReducer(state, action) {
  switch (action.type) {
    case TODO_ACTIONS.ADD_TODO:
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];
    case TODO_ACTIONS.TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    case TODO_ACTIONS.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case TODO_ACTIONS.SET_TODOS:
      return action.payload;
    default:
      return state;
  }
}

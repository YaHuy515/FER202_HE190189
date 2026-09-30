import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
} from "react";
import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { ThemeContext, ThemeProvider } from "./context/ThemeContext";
import useLocalStorage from "./hooks/useLocalStorage";

// Dữ liệu mẫu ban đầu
const initialTasks = [
  { id: 1, text: "Học React Hooks", completed: false },
  { id: 2, text: "Làm bài tập JavaScript", completed: true },
  { id: 3, text: "Ôn tập useState", completed: false },
  { id: 4, text: "Thực hành useEffect", completed: true },
  { id: 5, text: "Tìm hiểu useContext", completed: false },
  { id: 6, text: "Xây dựng Todo List", completed: false },
  { id: 7, text: "Ôn tập ES6", completed: true },
  { id: 8, text: "Thực hành Custom Hook", completed: false },
  { id: 9, text: "Hoàn thành bài Lab React", completed: true },
  { id: 10, text: "Chuẩn bị bài thuyết trình", completed: false },
];

// ==========================================
// REDUCER
// ==========================================
function taskReducer(state, action) {
  switch (action.type) {
    case "ADD_TASK":
      return [
        ...state,
        {
          id: Date.now(),
          text: action.payload,
          completed: false,
        },
      ];

    case "DELETE_TASK":
      return state.filter((task) => task.id !== action.payload);

    case "TOGGLE_TASK":
      return state.map((task) =>
        task.id === action.payload
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      );

    default:
      return state;
  }
}

// ==========================================
// MAIN CONTENT (Consumer of ThemeContext)
// ==========================================
function TaskApp() {
  const { darkMode } = useContext(ThemeContext);

  // useLocalStorage
  const [savedTasks, setSavedTasks] = useLocalStorage("tasks", initialTasks);

  // useReducer
  const [tasks, dispatch] = useReducer(taskReducer, savedTasks);

  // useEffect - đồng bộ tasks vào localStorage
  useEffect(() => {
    setSavedTasks(tasks);
  }, [tasks, setSavedTasks]);

  // useState - bộ lọc và tìm kiếm
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  // useMemo - tính toán thống kê công việc (trên toàn bộ tasks)
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.completed).length;
    const unfinished = total - completed;

    return { total, unfinished, completed };
  }, [tasks]);

  // useMemo - lọc và tìm kiếm công việc hiển thị
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      // 1. Lọc theo trạng thái
      const matchFilter =
        filter === "all"
          ? true
          : filter === "completed"
          ? task.completed
          : !task.completed;

      // 2. Tìm kiếm theo từ khóa (không phân biệt hoa/thường)
      const matchSearch = task.text
        .toLowerCase()
        .includes(search.toLowerCase().trim());

      return matchFilter && matchSearch;
    });
  }, [tasks, filter, search]);

  // useCallback - thêm
  const addTask = useCallback((text) => {
    dispatch({
      type: "ADD_TASK",
      payload: text,
    });
  }, []);

  // useCallback - xóa
  const deleteTask = useCallback((id) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id,
    });
  }, []);

  // useCallback - hoàn thành
  const toggleTask = useCallback((id) => {
    dispatch({
      type: "TOGGLE_TASK",
      payload: id,
    });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: darkMode ? "#222" : "#f5f5f5",
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
      }}
    >
      <Header />

      <TaskForm addTask={addTask} />

      {/* Bộ lọc (Tất cả / Chưa làm / Hoàn thành) và Tìm kiếm */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "15px",
          padding: "20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
            cursor: "pointer",
          }}
        >
          <option value="all">Tất cả ▼</option>
          <option value="active">Chưa làm</option>
          <option value="completed">Hoàn thành</option>
        </select>

        <input
          type="text"
          value={search}
          placeholder="Tìm kiếm công việc..."
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "350px",
            padding: "10px 15px",
            fontSize: "16px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            backgroundColor: darkMode ? "#333" : "#fff",
            color: darkMode ? "#fff" : "#000",
          }}
        />
      </div>

      <div
        style={{
          textAlign: "center",
          padding: "20px",
          borderBottom: "1px solid #ccc",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        Tổng: {stats.total} | Chưa làm: {stats.unfinished} | Hoàn thành: {stats.completed}
      </div>

      <TaskList
        tasks={filteredTasks}
        deleteTask={deleteTask}
        toggleTask={toggleTask}
      />
    </div>
  );
}

// ==========================================
// ROOT APP (Bọc ThemeProvider)
// ==========================================
function App() {
  return (
    <ThemeProvider>
      <TaskApp />
    </ThemeProvider>
  );
}

export default App;

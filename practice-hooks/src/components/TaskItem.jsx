import { memo } from "react";

function TaskItem({ task, deleteTask, toggleTask }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <span
        onClick={() => toggleTask(task.id)}
        style={{
          width: "400px",
          fontSize: "22px",
          cursor: "pointer",
          textDecoration: task.completed ? "line-through" : "none",
          opacity: task.completed ? 0.5 : 1,
        }}
      >
        {task.text || task.title}
      </span>

      <button
        onClick={() => deleteTask(task.id)}
        style={{
          padding: "8px 15px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Xóa
      </button>
    </div>
  );
}

export default memo(TaskItem);

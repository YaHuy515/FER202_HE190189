import { useRef, useState } from "react";

function TaskForm({ addTask }) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const text = input.trim();
    if (!text) {
      inputRef.current.focus();
      return;
    }

    addTask(text);
    setInput("");
    inputRef.current.focus();
  };

  return (
    <section
      style={{
        textAlign: "center",
        padding: "30px",
        borderBottom: "1px solid #ccc",
      }}
    >

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          placeholder="Nhập tên công việc..."
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: "500px",
            padding: "12px",
            fontSize: "18px",
          }}
        />

        <button
          type="submit"
          style={{
            padding: "10px 25px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Thêm
        </button>
      </form>
    </section>
  );
}

export default TaskForm;

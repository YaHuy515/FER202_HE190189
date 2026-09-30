import TaskItem from "./TaskItem";

function TaskList({ tasks, deleteTask, toggleTask }) {
  if (!tasks || tasks.length === 0) {
    return (
      <p
        style={{
          textAlign: "center",
          padding: "30px",
        }}
      >
        Chưa có công việc nào.
      </p>
    );
  }

  return (
    <section
      style={{
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          deleteTask={deleteTask}
          toggleTask={toggleTask}
        />
      ))}
    </section>
  );
}

export default TaskList;

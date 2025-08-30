import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function App() {
  return (
    <div style={{ maxWidth: 600, margin: "24px auto", display: "grid", gap: 16 }}>
      <h1>Задачи</h1>
      <AddTask />
      <TaskList />
    </div>
  );
}


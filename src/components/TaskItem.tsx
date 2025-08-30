import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Task, taskStore } from "../store/TaskStore";

interface Props {
  task: Task;
}

const TaskItem = observer(({ task }: Props) => {
  const [newSubtask, setNewSubtask] = useState("");
  const [showInput, setShowInput] = useState(false);

  const addSubtask = () => {
    const trimmed = newSubtask.trim();
    if (!trimmed) return;
    taskStore.addTask(task.id, trimmed);
    setNewSubtask("");
    setShowInput(false);
  };

  return (
    <li>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <span>{task.title}</span>
        <button onClick={() => setShowInput(!showInput)}>
          + Подзадача
        </button>
      </div>

      {showInput && (
        <div style={{ marginLeft: 16, marginTop: 4 }}>
          <input
            value={newSubtask}
            onChange={(e) => setNewSubtask(e.target.value)}
            placeholder="Название подзадачи"
          />
          <button onClick={addSubtask}>Добавить</button>
        </div>
      )}

      {task.children.length > 0 && (
        <ul style={{ marginLeft: 20 }}>
          {task.children.map((child) => (
            <TaskItem key={child.id} task={child} />
          ))}
        </ul>
      )}
    </li>
  );
});

export default TaskItem;

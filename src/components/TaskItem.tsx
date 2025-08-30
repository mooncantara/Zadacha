import { useState } from "react";
import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";
import type { Task } from "../store/TaskStore";

interface Props {
  task: Task;
}

const TaskItem = observer(({ task }: Props) => {
  const [subtask, setSubtask] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [editing, setEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(task.title);

  const addSubtask = () => {
    const trimmed = subtask.trim();
    if (!trimmed) return;
    taskStore.addTask(task.id, trimmed);
    setSubtask("");
    setShowInput(false);
  };

  return (
    <li>
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        {task.children.length > 0 && (
          <button onClick={() => taskStore.toggleExpand(task.id)}>
            {task.expanded ? "▼" : "▶"}
          </button>
        )}

        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => taskStore.toggleTask(task.id)}
        />

        {editing ? (
          <input
            value={titleDraft}
            onChange={(e) => setTitleDraft(e.target.value)}
            onBlur={() => {
              taskStore.updateTitle(task.id, titleDraft);
              setEditing(false);
            }}
            autoFocus
          />
        ) : (
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            onClick={() => taskStore.setSelected(task.id)}
            onDoubleClick={() => setEditing(true)}
          >
            {task.title}
          </span>
        )}

        <button onClick={() => setShowInput(!showInput)}>+ Подзадача</button>
        <button onClick={() => setEditing(true)}>✏️</button>
        <button onClick={() => taskStore.deleteTask(task.id)}>🗑</button>
      </div>

      {showInput && (
        <div style={{ marginLeft: 16, marginTop: 4 }}>
          <input
            value={subtask}
            onChange={(e) => setSubtask(e.target.value)}
            placeholder="Название подзадачи"
            onKeyDown={(e) => e.key === "Enter" && addSubtask()}
          />
          <button onClick={addSubtask}>Добавить</button>
        </div>
      )}

      {task.expanded && task.children.length > 0 && (
        <ul style={{ marginLeft: 20 }}>
          {task.children.map((ch) => (
            <TaskItem key={ch.id} task={ch} />
          ))}
        </ul>
      )}
    </li>
  );
});

export default TaskItem;

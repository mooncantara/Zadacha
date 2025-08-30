import { useState } from "react";
import { taskStore } from "../store/TaskStore";

export default function AddTask() {
  const [title, setTitle] = useState("");

  const onAdd = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    taskStore.addTask(null, trimmed); 
    setTitle("");
  };

  return (
    <div style={{ display: "flex", gap: 8 }}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Новая задача"
      />
      <button onClick={onAdd}>Добавить</button>
    </div>
  );
}

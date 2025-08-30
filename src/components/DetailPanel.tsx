import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";

const DetailPanel = observer(() => {
  const t = taskStore.selectedTask;
  if (!t) return <div>Выберите задачу</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <input
        value={t.title}
        onChange={(e) => taskStore.updateTitle(t.id, e.target.value)}
      />
      <textarea
        value={t.description}
        onChange={(e) => taskStore.updateDescription(t.id, e.target.value)}
        placeholder="Описание задачи..."
        rows={8}
      />
    </div>
  );
});

export default DetailPanel;

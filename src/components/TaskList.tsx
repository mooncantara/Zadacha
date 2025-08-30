import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";

const TaskList = observer(function TaskList() {
  return (
    <ul style={{ paddingLeft: 16 }}>
      {taskStore.tasks.map((t) => (
        <li key={t.id}>{t.title}</li>
      ))}
    </ul>
  );
});

export default TaskList;

import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";
import TaskItem from "./TaskItem";

const TaskList = observer(function TaskList() {
  return (
    <ul style={{ paddingLeft: 16 }}>
      {taskStore.tasks.map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
    </ul>
  );
});

export default TaskList;

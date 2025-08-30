import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";
import TaskItem from "./TaskItem";

const TaskList = observer(() => (
  <ul>
    {taskStore.tasks
      .filter((t) => taskStore.isTaskVisible(t))
      .map((t) => (
        <TaskItem key={t.id} task={t} />
      ))}
  </ul>
));

export default TaskList;

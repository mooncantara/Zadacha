import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";

const ThemeToggle = observer(() => (
  <button onClick={() => taskStore.toggleTheme()}>
    Тема: {taskStore.theme === "light" ? "🌞" : "🌙"}
  </button>
));

export default ThemeToggle;

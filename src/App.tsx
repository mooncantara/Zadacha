import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import DetailPanel from "./components/DetailPanel";
import ThemeToggle from "./components/ThemeToggle";
import { observer } from "mobx-react-lite";
import { taskStore } from "./store/TaskStore";

const App = observer(() => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        padding: 16,
        background: taskStore.theme === "light" ? "white" : "#222",
        color: taskStore.theme === "light" ? "black" : "white",
        height: "100vh",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <h1>Задачи</h1>
        <ThemeToggle />
        <SearchBar />
        <AddTask />
        <TaskList />
      </div>
      <DetailPanel />
    </div>
  );
});

export default App;

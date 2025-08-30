import { observer } from "mobx-react-lite";
import { taskStore } from "../store/TaskStore";

const SearchBar = observer(() => (
  <input
    value={taskStore.searchQuery}
    onChange={(e) => taskStore.setSearch(e.target.value)}
    placeholder="Поиск..."
  />
));

export default SearchBar;

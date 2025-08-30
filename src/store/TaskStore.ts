import { makeAutoObservable, reaction } from "mobx";

export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  expanded: boolean;
  children: Task[];
}

type Theme = "light" | "dark";

export class TaskStore {
  tasks: Task[] = [];
  searchQuery = "";
  selectedTaskId: string | null = null;
  theme: Theme = "light";

  constructor() {
    makeAutoObservable(this);

    // загрузка из localStorage
    const saved = localStorage.getItem("task-tree-state");
    if (saved) {
      const parsed = JSON.parse(saved);
      this.tasks = parsed.tasks || [];
      this.theme = parsed.theme || "light";
    }

    // авто-сохранение
    reaction(
      () => JSON.stringify({ tasks: this.tasks, theme: this.theme }),
      (json) => localStorage.setItem("task-tree-state", json)
    );
  }

  addTask(parentId: string | null, title: string, description = "") {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      expanded: true,
      children: [],
    };

    if (!parentId) {
      this.tasks.push(newTask);
    } else {
      const parent = this.findTaskById(parentId, this.tasks);
      if (parent) {
        parent.children.push(newTask);
        parent.expanded = true;
      }
    }
    this.selectedTaskId = newTask.id;
  }

  updateTitle(id: string, title: string) {
    const t = this.findTaskById(id, this.tasks);
    if (t) t.title = title;
  }

  updateDescription(id: string, description: string) {
    const t = this.findTaskById(id, this.tasks);
    if (t) t.description = description;
  }

  deleteTask(id: string) {
    const remove = (arr: Task[]): boolean => {
      const idx = arr.findIndex(t => t.id === id);
      if (idx >= 0) {
        arr.splice(idx, 1);
        return true;
      }
      for (const t of arr) {
        if (remove(t.children)) return true;
      }
      return false;
    };
    remove(this.tasks);
    if (this.selectedTaskId === id) this.selectedTaskId = null;
  }

  toggleExpand(id: string) {
    const t = this.findTaskById(id, this.tasks);
    if (t) t.expanded = !t.expanded;
  }

  toggleTask(id: string) {
    const task = this.findTaskById(id, this.tasks);
    if (!task) return;

    task.completed = !task.completed;

    // каскад вниз
    if (task.children.length > 0) {
      this.setChildrenCompleted(task.children, task.completed);
    }

    // пересчёт родителей
    this.updateParentCompletion(this.tasks);
  }

  private setChildrenCompleted(tasks: Task[], value: boolean) {
    for (const t of tasks) {
      t.completed = value;
      if (t.children.length > 0) {
        this.setChildrenCompleted(t.children, value);
      }
    }
  }

  private updateParentCompletion(tasks: Task[]) {
    for (const t of tasks) {
      if (t.children.length > 0) {
        this.updateParentCompletion(t.children);
        t.completed = t.children.every(c => c.completed);
      }
    }
  }

  setSearch(q: string) {
    this.searchQuery = q;
  }

  isTaskVisible(task: Task): boolean {
    const q = this.searchQuery.toLowerCase().trim();
    if (!q) return true;
    if (task.title.toLowerCase().includes(q) || task.description.toLowerCase().includes(q)) {
      return true;
    }
    return task.children.some(ch => this.isTaskVisible(ch));
  }

  setSelected(id: string | null) {
    this.selectedTaskId = id;
  }

  get selectedTask(): Task | null {
    return this.selectedTaskId ? this.findTaskById(this.selectedTaskId, this.tasks) : null;
  }

  toggleTheme() {
    this.theme = this.theme === "light" ? "dark" : "light";
  }

  private findTaskById(id: string, tasks: Task[]): Task | null {
    for (const t of tasks) {
      if (t.id === id) return t;
      const found = this.findTaskById(id, t.children);
      if (found) return found;
    }
    return null;
  }
}

export const taskStore = new TaskStore();

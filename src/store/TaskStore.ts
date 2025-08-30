import { makeAutoObservable } from "mobx";

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  expanded: boolean;
  children: Task[];
}

export class TaskStore {
  tasks: Task[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTask(parentId: string | null, title: string) {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title,
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
      }
    }
  }

  toggleExpand(id: string) {
    const task = this.findTaskById(id, this.tasks);
    if (task) {
      task.expanded = !task.expanded;
    }
  }

  toggleTask(id: string) {
    const task = this.findTaskById(id, this.tasks);
    if (task) {
      task.completed = !task.completed;
    }
  }

  private findTaskById(id: string, tasks: Task[]): Task | null {
    for (const task of tasks) {
      if (task.id === id) return task;
      const found = this.findTaskById(id, task.children);
      if (found) return found;
    }
    return null;
  }
}

export const taskStore = new TaskStore();

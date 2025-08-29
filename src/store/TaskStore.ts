import { makeAutoObservable } from "mobx";

export interface Task{
    id:string;
    title:string;
    completed:boolean;
    expanded:boolean;
    children: Task[];
}

export class TaskStore{
    tasks: Task[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTask(parentId: string | null, title:string){
    const newTask: Task = {
    id:crypto.randomUUID(),
    title: title,
    completed: false,
    expanded: true,
    children: [],
    };
    
    if (!parentId) {
        this.tasks.push(newTask);
    } 
    else {
        const parent = this.findTaskById(parentId, this.tasks);
        if(parent) {
            parent.children.push(newTask);
        }
    }
}

}

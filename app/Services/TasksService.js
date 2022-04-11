import { ProxyState } from "../AppState.js";
import { Task } from "../Models/Task.js";




class TasksService {
    removeTask(id) {
        ProxyState.tasks = ProxyState.tasks.filter(t => t.id !== id)
    }
    addTask(taskData) {
        let task = new Task(taskData)
        ProxyState.tasks = [...ProxyState.tasks, task]
    }
}


export const tasksService = new TasksService()
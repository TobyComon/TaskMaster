import { ProxyState } from "../AppState.js";
import { List } from "../Models/List.js";
import { Task } from "../Models/Task.js";



class ListsService {

    createList(listData) {
        const list = new List(listData)
        ProxyState.lists = [...ProxyState.lists, list]
    }


    removeList(id) {
        ProxyState.lists = ProxyState.lists.filter(l => l.id !== id)
    }

    checkBox(id) {
        let currentTask = ProxyState.tasks.find(task => task.id == id)
        let list = ProxyState.lists.find(l => l.id ==currentTask.listId)
        currentTask.checked = !currentTask.checked
        let listTasks = ProxyState.tasks.filter(t => t.listId == currentTask.listId)
        let checked = 0
        listTasks.forEach(t => t.checked += checked)
        
        list.checked = checked 
    }
    

}


export const listsService = new ListsService()
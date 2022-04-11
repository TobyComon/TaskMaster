import { ProxyState } from "../AppState.js"
import { generateId } from "../Utils/generateId.js"



export class Task {
    constructor(data) {
        this.id = generateId()
        this.name = data.name
        this.listId = data.listId
        this.checked = data.checked
        
    }

    get Template() {
        return `<li>${this.name} <i class="mdi mdi-delete selectable on-hover" title="remove task"
        onclick="app.tasksController.removeTask('${this.id}')"></i></li>
        <input type="checkbox" onclick="app.listsController.checkBox('${this.id}')">
        `
    }

}
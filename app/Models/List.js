import { ProxyState } from "../AppState.js"
import { ListsController } from "../Controllers/ListsController.js"
import { generateId } from "../Utils/generateId.js"



export class List {
    constructor(data) {
        this.id = data.id || generateId()
        this.name = data.name
        this.color = data.color
        this.checked = data.checked
        this.tasks = data.tasks || 0
    }
    get Tasks(){
        let tasks = ProxyState.tasks.filter(t => t.listId === this.id)
        let template = ''
        tasks.forEach(t => template += t.Template)
        return template
    } 

    get Template() {
        this.color = this.color
        return /*html*/`
        <div class="col-4 p-4">
            <div class="card">
            <div class="title-bar text-dark text-center p-3" style="background-color: ${this.color}">
            <h4>${this.name} 
            <i class="mdi mdi-delete text-light selectable on-hover" onclick="app.listsController.removeList('${this.id}')"></i>
            </h4>
            
                <p id="checked"></p>    
            </div>
                    <div class="tasks-list p-3">
                        <ul>
                        ${this.Tasks}
                        </ul>
                        </div>
                        <form onsubmit="app.tasksController.addTask('${this.id}')">
                            <div class="mb-3 p-3">
                            <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="New Task..." id="task" required minlength="3" maxlength="50">
                            <button class="btn btn-primary" type="submit">add</button>
                            </div>
                            </div>
                        </form>
                </div>
            </div>
            `
    }

}
import { ProxyState } from "../AppState.js";
import { listsService } from "../Services/ListsService.js"
import { loadState, saveState } from "../Utils/LocalStorage.js";
import { Pop } from "../Utils/Pop.js"



function _drawLists() {
    const lists = ProxyState.lists
    let template = ''
    lists.forEach(l => template += l.Template)
    document.getElementById('lists').innerHTML = template
}

function drawChecked(id){
    let task = ProxyState.tasks.find(t => t.id == id)
    let list = ProxyState.lists.find(l => l.id == task.listId)
    document.getElementById('checked' + list.id).innerHTML = list.checked
}




export class ListsController {
    constructor() {
        ProxyState.on('lists', _drawLists)
        ProxyState.on('tasks', _drawLists)
        ProxyState.on('lists', saveState)
        ProxyState.on('tasks', saveState)
        loadState()
        _drawLists()
        
        
    }

    createList() {
        window.event.preventDefault()
        try {
        
            /**@type {HTMLFormElement} */
            // @ts-ignore
            const form = window.event.target
            
            const listData = {
                name: form.listName.value,
                color: form.color.value
            }

        
            listsService.createList(listData)

        } catch (error) {
            console.error("[LIST FORM ERROR]", error)
            Pop.toast(error.message, "error")
            
        }
    }

    async removeList(id) {
        if (await Pop.confirm()) {
            listsService.removeList(id)
            Pop.toast('List Removed', 'success')
        }
    }
    checkBox(id) {
        listsService.checkBox(id)
        drawChecked(id)
    }
}
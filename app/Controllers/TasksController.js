import { tasksService } from "../Services/TasksService.js";
import { Pop } from "../Utils/Pop.js";


// function _drawTasks() {
//     let tasks = ProxyState.tasks;
//     let tasksTemplate = ''
//     tasks.forEach(task => tasksTemplate += task.taskTemplate)
//     document.getElementById("task").innerHTML = /*html*/`
    
//     <ul>
//         <li>
//         $(tasksTemplate)
//         </li>
//     </ul>
    
    
//     `
// }

export class TasksController{

    addTask(listId) {
        window.event.preventDefault()
        try {
            /**@type {HTMLFormElement} */
            // @ts-ignore
            const form = window.event.target

            const taskData = {
                listId,
                name: form.task.value,
                checked: false
            }

            tasksService.addTask(taskData)


        } catch (error) {
            console.error('[TASK FORM ERROR]', error)
            Pop.toast(error.message, 'error')
            
        }
    }

   async removeTask(id) {
        if(await Pop.confirm())
            tasksService.removeTask(id)
        Pop.toast('Task removed', "success")
    }



}
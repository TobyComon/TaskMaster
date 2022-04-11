import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"
import { List } from "./Models/List.js"
import { Task } from "./Models/Task.js"



let test = new List({name: 'Yo', color: 'red'})
let testTask = new Task({name:"Test Task", listId: test.id})
class AppState extends EventEmitter {
  /** @type {import('./Models/Task').Task[]} */
  tasks = [testTask]
  /**@type {import('./Models/List').List[]} */
 lists = [test]
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})

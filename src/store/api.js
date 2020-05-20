import axios from "axios";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
})

export const api = {

    createToDoList(title) {
        return instance.post('', {title: title})
    },
    createTask(newTaskTitle, toDoListId) {
        return instance.post(`/${toDoListId}/tasks`, {title: newTaskTitle})
    },
    getToDoList() {
        return instance.get("/")
    },

    updateTask(listId, taskId, task, obj) {
        return instance.put(`/${listId}/tasks/${taskId}`, {...task, ...obj})
    },
    updateToDoList(listId, obj) {
        return instance.put(`/${listId}`, {...obj})
    },

    deleteToDoList(listId) {
        return instance.delete(`/${listId}`)

    },
    deleteTask(listId, taskId) {
        return instance.delete(`/${listId}/tasks/${taskId}`)
    },
    getTask(toDoListId) {
        return instance.get(`/${toDoListId}/tasks`)

    }
}



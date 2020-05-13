import {ADD_TASK, ADD_TO_DO_LIST, CHANGE_TASK, DELETE_TASK, DELETE_TODOLIST, SET_TO_DO_LIST} from "./reducer";

export const addTaskAC = (toDoListId, newTask) => {
    return {
        type: ADD_TASK,
        newTask: newTask,
        toDoListId: toDoListId
    }
}

export const addTodolistAC = (newList) => {
    return {
        type: ADD_TO_DO_LIST,
        newList: newList
    }
}

export const сhangeTaskAC = (toDoListId, taskId, obj) => {
    return {
        type: CHANGE_TASK,
        obj: obj,
        taskId: taskId,
        toDoListId: toDoListId
    }
}

export const deleteToDoListAC = (toDoListId) => {
    return {
        type: DELETE_TODOLIST,
        toDoListId
    }
}

export const deleteTaskAC = (toDoListId, taskId) => {
    return {
        type: DELETE_TASK,
        toDoListId,
        taskId,
    }
}

export const setToDoList = (todolists) => {
    return {
        type: SET_TO_DO_LIST,
        todolists
    }
}
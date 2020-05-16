import {
    ADD_TASK,
    ADD_TO_DO_LIST,
    CHANGE_TASK,
    DELETE_TASK,
    DELETE_TODOLIST, listTypes,
    SET_TASKS,
    SET_TO_DO_LIST, taskType
} from "./reducer";


type addTaskACType = { type: typeof ADD_TASK, newTask: string }
type addTodolistACType = { type: typeof ADD_TO_DO_LIST, newList: listTypes }
type сhangeTaskACType = { type: typeof CHANGE_TASK, obj: any, taskId: string, toDoListId: string }
type deleteToDoListACType = { type: typeof DELETE_TODOLIST, toDoListId: string }
type deleteTaskACType = { type: typeof DELETE_TASK, toDoListId: string, taskId: string }
type setToDoListType = { type: typeof SET_TO_DO_LIST, toDoLists: listTypes }
type setTasksType = { type: typeof SET_TASKS, tasks: taskType, todolistId: string }

export const addTaskAC = (newTask: string): addTaskACType => {
    return {
        type: ADD_TASK,
        newTask: newTask
    }
}

export const addTodolistAC = (newList: listTypes): addTodolistACType => {
    return {
        type: ADD_TO_DO_LIST,
        newList: newList
    }
}

export const сhangeTaskAC = (toDoListId: string, taskId: string, obj: any): сhangeTaskACType => {
    return {
        type: CHANGE_TASK,
        obj: obj,
        taskId: taskId,
        toDoListId: toDoListId
    }
}

export const deleteToDoListAC = (toDoListId: string): deleteToDoListACType => {
    return {
        type: DELETE_TODOLIST,
        toDoListId
    }
}

export const deleteTaskAC = (toDoListId: string, taskId: string): deleteTaskACType => {
    return {
        type: DELETE_TASK,
        toDoListId,
        taskId,
    }
}

export const setToDoList = (toDoLists: listTypes): setToDoListType => {
    return {
        type: SET_TO_DO_LIST,
        toDoLists
    }
}

export const setTasks = (tasks: taskType, todolistId: string): setTasksType => {
    return {
        type: SET_TASKS,
        tasks,
        todolistId
    }
}




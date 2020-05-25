import {
    ADD_TASK,
    ADD_TO_DO_LIST, CHANGE_LIST_TITLE,
    CHANGE_TASK,
    DELETE_TASK,
    DELETE_TODOLIST, listTypes,
    SET_TASKS,
    SET_TO_DO_LIST, taskType
} from "./reducer";
import {InferActionsTypes} from "./store";

export type ActionsType = InferActionsTypes<typeof actions>

export const actions = {
    addTaskAC: (newTask: taskType) => ({type: ADD_TASK, newTask: newTask} as const),
    addTodolistAC: (newList: listTypes) => ({type: ADD_TO_DO_LIST, newList: newList} as const),
    сhangeTaskAC: (toDoListId: string, taskId: string, obj: any) => ({
        type: CHANGE_TASK,
        obj: obj,
        taskId: taskId,
        toDoListId: toDoListId
    } as const),
    сhangeListTitle: (toDoListId: string, obj: any) => ({
        type: CHANGE_LIST_TITLE, obj: obj, toDoListId: toDoListId
    } as const),
    deleteToDoListAC: (toDoListId: string) => ({type: DELETE_TODOLIST, toDoListId} as const),
    deleteTaskAC: (toDoListId: string, taskId: string) => ({
        type: DELETE_TASK,
        toDoListId,
        taskId,
    } as const),
    setToDoList: (toDoLists: Array<listTypes>) => ({type: SET_TO_DO_LIST, toDoLists} as const),
    setTasks: (tasks: Array<taskType>, todolistId: string) => ({type: SET_TASKS, tasks, todolistId} as const)
}




import {actions, ActionsType} from "./actions";
import {baseThunkType} from "./store";
import {Dispatch} from "redux";
import {api, itemResponseType, ResultCodeEnum} from "./api";
import exp from "constants";

export const ADD_TO_DO_LIST = 'todolist/reducer/ADD_TO_DO_LIST'
export const ADD_TASK = 'todolist/reducer/ADD_TASK'
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TO_DO_LIST = 'todolist/reducer/SET_TO_DO_LIST'
export const SET_TASKS = 'todolist/reducer/SET_TASKS'
export const CHANGE_LIST_TITLE = 'CHANGE_LIST_TITLE'


export type listTypes = {
    id: string
    title: string
    tasks?: Array<taskType>
}

export type taskType = {
    description: string
    title: string
    completed: boolean
    status: any
    priority: string
    startDate: any//(datetime)
    deadline: any//required(datetime)
    id: string
    todoListId: string
    order: number
    addedDate: any  //required(datetime)
}


type initialStateType = typeof initialState

const initialState = {
    toDoLists: [] as Array<listTypes>
}

const reducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case ADD_TO_DO_LIST:
            return {
                ...state,
                toDoLists: [action.newList, ...state.toDoLists]
            }
        case SET_TO_DO_LIST:
            return {
                ...state,
                toDoLists: action.toDoLists.map((tl: any) => ({...tl, tasks: []}))
            }

        case SET_TASKS:
            return {
                ...state,
                toDoLists: state.toDoLists.map((todo: any) => {
                    if (todo.id !== action.todolistId) {
                        return todo
                    } else {
                        return {...todo, tasks: action.tasks}
                    }
                })
            }
        case ADD_TASK:
            let newTasks = state.toDoLists.map((task: any) => {
                if (task.id !== action.newTask.todoListId) {
                    return task
                } else {
                    return {...task, tasks: [...task.tasks, action.newTask]}
                }
            })
            return {...state, toDoLists: newTasks}
        case CHANGE_TASK:
            return {
                ...state, toDoLists: state.toDoLists.map((task: any) => {
                        if (task.id !== action.toDoListId) {
                            return task
                        } else {
                            return {
                                ...task, tasks: [...task.tasks.map((t: any) => {
                                    if (t.id !== action.taskId) {
                                        return t
                                    } else {
                                        return {...t, ...action.obj}
                                    }
                                })]
                            }
                        }
                    }
                )
            }
        case CHANGE_LIST_TITLE:
            return {
                ...state, toDoLists: state.toDoLists.map((title: any) => {
                        if (title.id !== action.toDoListId) {
                            return title
                        } else {
                            return {...title, ...action.obj}
                        }
                    }
                )
            }
        case DELETE_TODOLIST:
            return {
                ...state, toDoLists:
                    state.toDoLists.filter((toDoList: any) => toDoList.id !== action.toDoListId)
            }
        case DELETE_TASK:
            return {
                ...state,
                toDoLists: state.toDoLists.map((todo: any) => {
                    if (todo.id !== action.toDoListId) {
                        return todo
                    } else {
                        return {
                            ...todo, tasks: todo.tasks.filter((task: any) => task.id !== action.taskId)
                        }
                    }
                })
            }
    }
    return state;
}
export default reducer


//_________________ thunk-creators____________________

type thunkType = baseThunkType<ActionsType>
// type DispatchType = Dispatch<ActionsType>

export const getTasksThunkC = (toDoListId: string): thunkType => async (dispatch) => {
    let result = await api.getTask(toDoListId)
    if (!result.data.error) {
        dispatch(actions.setTasks(result.data.items, toDoListId))
    }
}

export const addTaskThunkC = (title: string, toDoListId: string): thunkType => async (dispatch) => {
    let result = await api.createTask(title, toDoListId)
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.addTaskAC(result.data.data.item))
    }
}

export const changeTaskThunkC = (toDoListId: string, taskId: string, task: taskType, title: string): thunkType => async (dispatch) => {
    let result = await api.updateTask(toDoListId, taskId, task, {title: title})
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.changeTaskAC(toDoListId, taskId, {title: title}))
    }
}

export const changeListTitleThunkC = (toDoListId: string, title: string): thunkType => async (dispatch) => {
    let result = await api.updateToDoList(toDoListId, {title: title})
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.changeListTitle(toDoListId, {title: title}))
    }
}


export const deleteTaskThunkC = (toDoListId: string, taskId: string): thunkType => async (dispatch) => {
    let result = await api.deleteTask(toDoListId, taskId)
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.deleteTaskAC(toDoListId, taskId))
    }
}

export const deleteToDoListThunkC = (toDoListId: string): thunkType => async (dispatch) => {
    let result = await api.deleteToDoList(toDoListId)
    debugger
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.deleteToDoListAC(toDoListId))
    }
}

export const changeStatusThunkC = (toDoListId: string, taskId: string, task: taskType, status: boolean): thunkType => async (dispatch) => {
    let result = await api.updateTask(toDoListId, taskId, task, {status: status})
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.changeTaskAC(toDoListId, taskId, {status: status}))
    }
}

export const changePriorityThunkC = (toDoListId: string, taskId: string, task: taskType, priority: string): thunkType => async (dispatch) => {
    let result = await api.updateTask(toDoListId, taskId, task, {priority: priority})
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.changeTaskAC(toDoListId, taskId, {priority: priority}))
    }
}

export const addToDoListThunkC = (title: string): thunkType => async (dispatch) => {
    let result = await api.createToDoList(title)
    if (result.data.resultCode === ResultCodeEnum.Success) {
        dispatch(actions.addTodolistAC(result.data.data.item))
    }
}

export const getToDoListThunkC = (): thunkType => async (dispatch) => {
    let result = await api.getToDoList()
    dispatch(actions.setToDoList(result.data))

}
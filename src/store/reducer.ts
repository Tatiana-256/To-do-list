export const ADD_TO_DO_LIST = 'todolist/reducer/ADD_TO_DO_LIST'
export const ADD_TASK = 'todolist/reducer/ADD_TASK'
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TO_DO_LIST = 'todolist/reducer/SET_TO_DO_LIST'
export const SET_TASKS = 'todolist/reducer/SET_TASKS'




export type listTypes = {
    tasks: taskType
}

export type taskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: any//(datetime)
    deadline: any//required(datetime)
    id: string
    todoListId: string
    order: number
    addedDate: any  //required(datetime)
}


const initialState = {
    toDoLists:  [] as Array<listTypes>
}

type initialStateType = typeof initialState

const reducer = (state = initialState, action: any): initialStateType => {
    switch (action.type) {
        case ADD_TO_DO_LIST:
            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newList]
            }
        case SET_TO_DO_LIST:
            return {
                ...state,
                toDoLists: action.toDoLists.map((tl:any ) => ({...tl, tasks: []}))
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
export const ADD_TO_DO_LIST = 'todolist/reducer/ADD_TO_DO_LIST'
export const ADD_TASK = 'todolist/reducer/ADD_TASK'
export const CHANGE_TASK = "todolist/reducer/CHANGE_TASK"
export const DELETE_TODOLIST = "todolist/reducer/DELETE_TODOLIST"
export const DELETE_TASK = "todolist/reducer/DELETE_TASK"
export const SET_TO_DO_LIST = 'todolist/reducer/SET_TO_DO_LIST'

const initialState = {
    toDoLists: [
        // {id: 1, title: 'fgd', tasks: []},
        // {id: 2, title: 'fgdfd', tasks: []}
    ]
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_DO_LIST:
            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newList]
            }
        case SET_TO_DO_LIST:
            return {
                ...state,
                toDoLists: action.todolists
            }
        case ADD_TASK:
            let newTasks = state.toDoLists.map(task => {
                if (task.id !== action.toDoListId) {
                    return task
                } else {
                    return {...task, tasks: [...task.tasks, action.newTask]}
                }
            })
            return {...state, toDoLists: newTasks}
        case CHANGE_TASK:
            return {
                ...state, toDoLists: state.toDoLists.map(task => {
                        if (task.id !== action.toDoListId) {
                            return task
                        } else {
                            return {
                                ...task, tasks: [...task.tasks.map(t => {
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
                    state.toDoLists.filter(toDoList => toDoList.id !== action.toDoListId)
            }
        case DELETE_TASK:
            return {
                ...state,
                toDoLists: state.toDoLists.map(todo => {
                    if (todo.id !== action.toDoListId) {
                        return todo
                    } else {
                        return {
                            ...todo, tasks: todo.tasks.filter(task => task.id !== action.taskId)
                        }
                    }
                })
            }
    }
    return state;
}
export default reducer
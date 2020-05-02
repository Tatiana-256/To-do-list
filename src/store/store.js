import {createStore} from "redux";

const initialState = {
    toDoLists: [
        {id: 1, title: 'fgd', tasks: []},
        {id: 2, title: 'fgdfd', tasks: []}
    ]
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_TO_DO_LIST":
            return {
                ...state,
                toDoLists: [...state.toDoLists, action.newList]
            }
        case 'ADD_TASK':
            let newTasks = state.toDoLists.map(task => {
                if (task.id !== action.toDoListId) {
                    return task
                } else {
                    return {...task, tasks: [...task.tasks, action.newTask]}
                }
            })
            debugger
            return {...state, toDoLists: newTasks}
        case 'CHANGE_TASK':
            return {
                ...state, toDoLists: state.toDoLists.map(task => {
                        if (task.id !== action.toDoListId) {
                            return task
                        } else {
                            return {
                                ...task, tasks: [task.tasks.map(t => {
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
        case 'DELETE_TODOLIST':
            return {
                ...state, toDoLists:
                    state.toDoLists.filter(toDoList => toDoList.id !== action.toDoListId)
            }
        case 'DELETE_TASK':
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

const store = createStore(reducer);


export default store;
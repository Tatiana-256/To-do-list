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
                    return {...task, tasks: [task.tasks, action.newTask]}
                }    } )
            return {...state, toDoLists: newTasks}

        case 'CHANGE_TASK':
            return {
                ...state, toDoLists: state.toDoLists.map(list => {
                        if (list.id !== action.toDoListId) {
                            return list
                        } else {
                            return {
                                ...list, tasks: [list.tasks.map(tasks => {
                                    if (tasks.id !== action.toDoListId) {
                                        return tasks
                                    } else {
                                        return {...tasks, action.obj}
                                    }
                                })]
                            }
                        }
                    }
                )
            }
    }
    return state;
}

const store = createStore(reducer);


export default store;
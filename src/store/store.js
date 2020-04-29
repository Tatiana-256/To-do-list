import {createStore} from "redux";

const initialState = {
    toDoLists: [
        {id: 1, title: 'fgd', task: []},
        {id: 2, title: 'fgdfd', task: []}
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
            return {
                ...state, toDoLists: state.toDoLists.map(list => {
                        if (list.id !== action.toDoListId) {
                            return list
                        } else {
                            return {...list, task: [list.task, action.newTask]}
                        }
                    }
                )
            }
            
        case 'CHANGE_TASK':
            return {
                ...state, toDoLists: state.toDoLists.map(list => {
                        if (list.id !== action.toDoListId) {
                            return list
                        } else {
                            return {
                                ...list, task: [list.task.map(task => {
                                    if (task.id !== action.toDoListId) {
                                        return task
                                    } else {
                                        return {...task, action.obj}
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
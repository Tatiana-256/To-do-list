import {createStore, Action, combineReducers, applyMiddleware} from "redux";
import reducer from "./reducer";
import {ThunkAction} from "redux-thunk";
import thunkMiddleware from "redux-thunk"


let reducers = combineReducers({
    toDoListReducer: reducer
})

const store = createStore(reducers, applyMiddleware(thunkMiddleware));
export default store;





// ______type of state___________

type RootReducerType = typeof reducers
export type AppStateType = ReturnType<RootReducerType>

// ______type of actions___________


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


// ______type of thunk-creator___________

export type baseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>


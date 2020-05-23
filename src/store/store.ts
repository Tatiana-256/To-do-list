import {createStore} from "redux";
import reducer from "./reducer";

const store = createStore(reducer);


type PropertiesType<T> = T extends { [key: string]: infer U } ? U : never
export type InferActionsTypes<T extends { [key: string]: (...args: any[]) => any }> = ReturnType<PropertiesType<T>>


export default store;
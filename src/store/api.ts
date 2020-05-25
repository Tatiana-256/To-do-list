import axios from "axios";
import {taskType} from "./reducer";


const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/todo-lists',
    withCredentials: true,
    headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
})


export const api = {

    createToDoList(title: string) {
        return instance.post<APIRequestType<itemResponseType>>('', {title: title})
    },
    createTask(newTaskTitle: string, toDoListId: string) {
        return instance.post<APIRequestType<taskType>>(`/${toDoListId}/tasks`, {title: newTaskTitle})
    },
    getToDoList() {
        return instance.get<APIRequestType<itemResponseType>>("/")
    },

    updateTask(listId: string, taskId: string, task: any, obj: any) {
        return instance.put<APIRequestType<taskType>>(`/${listId}/tasks/${taskId}`, {...task, ...obj})
    },
    updateToDoList(listId: string, obj: any) {
        return instance.put<APIRequestType<itemResponseType>>(`/${listId}`, {...obj})
    },

    deleteToDoList(listId: string) {
        return instance.delete(`/${listId}`)

    },
    deleteTask(listId: string, taskId: string) {
        return instance.delete(`/${listId}/tasks/${taskId}`)
    },
    getTask(toDoListId: string) {
        return instance.get<getTaskAPI>(`/${toDoListId}/tasks`)

    }
}


// __________________types for API________________

type itemResponseType = {
    "id": string,
    "title": string,
    "addedDate": string,
    "order": number
}

export enum ResultCodeEnum {
    Success = 0,
    Error = 1
}

export type APIRequestType<R> = {
    resultCode: ResultCodeEnum
    messages: Array<string>,
    data: {
        item: R
    }
}

type getTaskAPI = {
    items: Array<taskType>,
    totalCount: number,
    error: string
}


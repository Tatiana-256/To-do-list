import React from 'react';
import TodoListTask from "./TodoListTask";
import {taskType} from '../store/reducer';

type PropsType = {
    tasks: Array<taskType>,
    changeTitle: (task: taskType, value: string) => void,
    changeStatus: (task: taskType, checked:any) => void,
    deleteTask: (id: string) => void,
    changePriority: (task: taskType, value: string) => void

}


function TodoListTasks(props: PropsType) {
    let taskElements = props.tasks.map((task: taskType) => {
        return <TodoListTask
            changeTitle={props.changeTitle}
            changeStatus={props.changeStatus}
            deleteTask={props.deleteTask}
            changePriority={props.changePriority}
            task={task}
        />
    })
    return (
        <div className="todoList-task">
            {taskElements}
        </div>
    );
}

export default TodoListTasks
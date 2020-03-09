import React from 'react';

const TodoListTask = (props) => {
    return <div className="">
        <div className="todoList-tasks">
            <div className="todoList-task">
                <input type="checkbox" checked={props.isDone}/>
                <span>{props.title}</span>
            </div>
        </div>
    </div>
}

export default TodoListTask
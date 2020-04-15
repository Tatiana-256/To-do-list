import React from "react";


const TodoListTitle = (props) => {
    return <div>
        <h3 className="todoList-header__title">{props.title}</h3>
        <div className="todoList-newTaskForm">
        </div>
    </div>
}

export default TodoListTitle
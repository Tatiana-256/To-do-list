import React from "react";


const TodoListTitle = (props) => {
    return <div className='inpt'>
        <div><h3>{props.title}</h3></div>
        <div>
            <button className='delete' onClick={props.deleteToDoList}>x</button>
        </div>
    </div>
}

export default TodoListTitle
import React from 'react';
import '../App.css';
import TodoListTitle from "./TodoListTitle";
import AddNewItemForm from "./AddNewItemForm";

class TodoListHeader extends React.Component {

    render() {
        return (
            <div className="todoList-header">
                <TodoListTitle title={this.props.title}/>
                <AddNewItemForm/>
            </div>
        );
    }
}

export default TodoListHeader
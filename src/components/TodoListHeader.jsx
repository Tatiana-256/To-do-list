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
                {/*<h3 className="todoList-header__title">{this.props.title}</h3>*/}
                {/*<div className="todoList-newTaskForm">*/}

                {/*<input value={this.state.title} onChange={this.onTitleChange}*/}
                {/*       type="text"*/}
                {/*       onKeyPress={this.onKeyPress}*/}
                {/*       placeholder="New task name"*/}
                {/*       className={this.state.error ? 'error' : ''}*/}
                {/*/>*/}
                {/*<button onClick={this.onAddTaskClick} >Add</button>*/}
            </div>
        );
    }
}

export default TodoListHeader
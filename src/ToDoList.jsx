import React from 'react';
import './App.css';
import {connect} from "react-redux";

import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTaskAC, deleteTaskAC, deleteToDoListAC, сhangeTaskAC} from "./store/actions";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }

    state = {
        tasks: [],
        filterValue: "All",
    }

    nextTaskId = 0

    saveState = () => {
        localStorage.setItem('our-state' + this.props.id, JSON.stringify(this.state))
    }

    restoreState = () => {
        let state = {
            task: [],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem('our-state' + this.props.id)
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.tasks.forEach(task => {
                if (task.id >= this.nextTaskId) {
                    this.nextTaskId = task.id + 1
                }
            })
        })
    }

    addItem = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        }
        this.nextTaskId++
        this.props.addTask(this.props.id, newTask)

    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }

    changeStatus = (taskId, isDone) => {
        this.props.сhangeTask(this.props.id, taskId, {isDone: isDone})
    }

    changeTitle = (taskId, title) => {
        this.props.сhangeTask(this.props.id, taskId, {title: title})
    }

    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    render = () => {
        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title} deleteToDoList={this.deleteToDoList}/>
                <AddNewItemForm addItem={this.addItem}/>
                <TodoListTasks
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    deleteTask={this.deleteTask}
                    tasks={this.props.tasks.filter(t => {
                        if (this.state.filterValue === 'All') {
                            return true
                        }
                        if (this.state.filterValue === 'Completed') {
                            return t.isDone === true
                        }
                        if (this.state.filterValue === 'Active') {
                            return t.isDone === false
                        }
                    })}/>
                <TodoListFooter isHidden={this.state.isHidden} filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}/>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addTask: (toDoListId, newTask) => {
            dispatch(addTaskAC(toDoListId, newTask))
        },
        сhangeTask: (toDoListId, taskId, obj) => {
            dispatch(сhangeTaskAC(toDoListId, taskId, obj))
        },
        deleteToDoList: (toDoListId) => {
            dispatch(deleteToDoListAC(toDoListId))
        },
        deleteTask: (toDoListId, taskId) => {
            dispatch(deleteTaskAC(toDoListId, taskId))
        }
    }
}

export default connect(null, mapDispatchToProps)(ToDoList)


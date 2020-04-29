import React from 'react';
import './App.css';

import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {connect} from "react-redux";

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
        // let newTasks = [...this.state.tasks, newTask]
        // this.setState({tasks: newTasks}, () => {
        //     this.saveState()
        // })

    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }

    changeStatus = (taskId, isDone) => {
        this.props.changeTask(this.props.id, taskId, {isDone: isDone})
    }

    changeTitle = (taskId, title) => {
        this.props.changeTask(this.props.id, taskId, {title: title})
    }

    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id)
    }

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
    }

    changeTask = (taskId, obj) => {
        let newTasks = this.state.tasks.map(t => {
                if (t.id != taskId) {
                    return t
                } else {
                    return {...t, ...obj}
                }
            }
        )

        this.props.сhangeTask(newTasks)
        // this.setState({tasks: newTasks}, () => {
        //     this.saveState()
        // })
    }


    render = () => {
        console.log(this.props.task)
        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title}/>
                <AddNewItemForm addItem={this.addItem}/>
                <TodoListTasks
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    tasks={this.props.task.filter(t => {
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
            const action = {
                type: 'ADD_TASK',
                newTask,
                toDoListId
            }
            dispatch(action)
        },
        сhangeTask: (toDoListId, taskId, obj) => {
            const action = {
                type: 'CHANGE_TASK',
                taskId,
                toDoListId,
                obj
            }
            dispatch(action)
        },
        deleteToDoList: (toDoListId) => {
            const action = {
                type: 'DELETE_TODOLIST',
                toDoListId,
            }
            dispatch(action)
        },
        deleteTask: (toDoListId, taskId) => {
            const action = {
                type: 'DELETE_TASK',
                toDoListId,
                taskId
            }
            dispatch(action)
        }
    }
}


export default connect(null, mapDispatchToProps)(ToDoList)


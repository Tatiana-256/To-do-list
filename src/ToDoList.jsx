import React from 'react';
import './App.css';
import {connect} from "react-redux";

import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTaskAC, deleteTaskAC, deleteToDoListAC, setTasks, сhangeTaskAC} from "./store/actions";
import axios from "axios";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }


    //____________________getting tasks of list from API_______________________

    restoreState = () => {
        debugger
        axios.get(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            })
            .then(response => {
                debugger
                if (!response.data.error) {
                    this.props.setTasks(response.data.items, this.props.id)
                }
            })
    }

    state = {
        tasks: [],
        filterValue: "All",
    }

    saveState = () => {
        localStorage.setItem('our-state' + this.props.id, JSON.stringify(this.state))
    }


    //   __________________add task for list __________________

    addItem = (title) => {

        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks`,
            {title: title},
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            }
        )
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.addTask(result.data.data.item)
                }
            })
    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }

    changeStatus = (taskId, status) => {
        this.props.сhangeTask(this.props.id, taskId, {status: status})
    }

    changeTitle = (taskId, title) => {
        axios.post(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {},
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            }
        )
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.addTask(result.data.data.item)
                }
            })

        this.props.сhangeTask(this.props.id, taskId, {title: title})
    }

    deleteToDoList = () => {
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}`,
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            })
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.deleteToDoList(this.props.id)
                }
            })
    }

    deleteTask = (taskId) => {
        debugger
        axios.delete(`https://social-network.samuraijs.com/api/1.1/todo-lists/${this.props.id}/tasks/${taskId}`,
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            })
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })


        // this.props.deleteTask(this.props.id, taskId)
    }

    render = () => {
        let {tasks = []} = this.props
        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title} deleteToDoList={this.deleteToDoList}/>
                <AddNewItemForm addItem={this.addItem}/>
                <TodoListTasks
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    deleteTask={this.deleteTask}
                    tasks={tasks.filter(t => {
                        if (this.state.filterValue === 'All') {
                            return true
                        }
                        if (this.state.filterValue === 'Completed') {
                            return t.status === 0
                        }
                        if (this.state.filterValue === 'Active') {
                            return t.status === 2
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
        addTask: (newTask) => {
            dispatch(addTaskAC(newTask))
        },
        сhangeTask: (toDoListId, taskId, obj) => {
            dispatch(сhangeTaskAC(toDoListId, taskId, obj))
        },
        deleteToDoList: (toDoListId) => {
            dispatch(deleteToDoListAC(toDoListId))
        },
        deleteTask: (toDoListId, taskId) => {
            dispatch(deleteTaskAC(toDoListId, taskId))
        },
        setTasks: (tasks, todolistId) => {
            dispatch(setTasks(tasks, todolistId))
        }
    }
}

export default connect(null, mapDispatchToProps)(ToDoList)


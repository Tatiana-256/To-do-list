import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {api} from "./store/api";


import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTaskAC, deleteTaskAC, deleteToDoListAC, setTasks, сhangeListTitle, сhangeTaskAC} from "./store/actions";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }


    //____________________getting tasks of list from API_______________________

    restoreState = () => {
        api.getTask(this.props.id)
            .then(response => {
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
        api.createTask(title, this.props.id)
            .then(result => {
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


    //___________ changing IS_DONE of task and modifying task________

    changeStatus = (task, status) => {


        api.updateTask(this.props.id, task.id, task, {status: status})
            .then(result => {
                if (result.data.resultCode === 0) {
                    this.props.сhangeTask(this.props.id, task.id, {status: status})
                }
            })
    }


    changeTitleOfList = (title) => {
        api.updateToDoList(this.props.id, {title: title})
            .then(result => {
                if (result.data.resultCode === 0) {
                    this.props.сhangeListTitle(this.props.id, {title: title})
                }
            })

    }


    changeTitle = (task, title) => {
        api.updateTask(this.props.id, task.id, task, {title: title})
            .then(result => {
                if (result.data.resultCode === 0) {
                    this.props.сhangeTask(this.props.id, task.id, {title: title})
                }
            })
    }


    //________________change priority___________________________________

    changePriority = (task, priority) => {

        api.updateTask(this.props.id, task.id, task, {priority: priority})
            .then(result => {
                if (result.data.resultCode === 0) {
                    this.props.сhangeTask(this.props.id, task.id, {priority: priority})
                }
            })


    }


    //___________Delete list of tasks_________

    deleteToDoList = () => {
        api.deleteToDoList(this.props.id)
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.deleteToDoList(this.props.id)
                }
            })
    };

    //___________Delete task_________

    deleteTask = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(result => {
                if (result.data.resultCode === 0) {
                    this.props.deleteTask(this.props.id, taskId)
                }
            })
    };

    render = () => {
        let {tasks = []} = this.props;
        return (
            <div className="todoList">
                <TodoListTitle title={this.props.title} deleteToDoList={this.deleteToDoList}
                               changeTitle={this.changeTitleOfList}/>
                <AddNewItemForm addItem={this.addItem}/>
                <TodoListTasks
                    changeTitle={this.changeTitle}
                    changeStatus={this.changeStatus}
                    deleteTask={this.deleteTask}
                    changePriority={this.changePriority}
                    tasks={tasks.filter(t => {
                        if (this.state.filterValue === 'All') {
                            return true
                        }
                        if (this.state.filterValue === 'Completed') {
                            return t.status === 1
                        }
                        if (this.state.filterValue === 'Active') {
                            return t.status === 0
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
        сhangeListTitle: (toDoListId, obj) => {
            dispatch(сhangeListTitle(toDoListId, obj))
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


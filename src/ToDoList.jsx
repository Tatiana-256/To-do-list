import React from 'react';
import './App.css';
import {connect} from "react-redux";
import {api, ResultCodeEnum} from "./store/api";


import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {actions} from "./store/actions";
import {
    addTaskThunkC,
    changeListTitleThunkC, changePriorityThunkC, changeStatusThunkC,
    deleteTaskThunkC,
    deleteToDoListThunkC,
    getTasksThunkC,
    сhangeTaskThunkC
} from "./store/reducer";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }


    //____________________getting tasks of list from API_______________________

    restoreState = () => {
        this.props.setTasks(this.props.id)
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
        this.props.addTask(title, this.props.id)}

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }


    //___________ changing IS_DONE of task and modifying task________

    changeStatus = (task, status) => {
        this.props.changeTaskStatus(this.props.id, task.id, task, status)
    }


    changeTitleOfList = (title) => {
        this.props.сhangeListTitle(this.props.id, title)
    }


    changeTitle = (task, title) => {
        this.props.сhangeTask(this.props.id, task.id, task, title)
    }


    //________________change priority___________________________________

    changePriority = (task, priority) => {
        this.props.changePriority(this.props.id, task.id, task, priority)
    }


    //___________Delete list of tasks_________

    deleteToDoList = () => {
        this.props.deleteToDoList(this.props.id)
    };

    //___________Delete task_________

    deleteTask = (taskId) => {
        this.props.deleteTask(this.props.id, taskId)
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
        deleteToDoList: (toDoListId) => {
            dispatch(deleteToDoListThunkC(toDoListId))
        },
        deleteTask: (toDoListId, taskId) => {
            dispatch(deleteTaskThunkC(toDoListId, taskId))
        },
        setTasks: (todolistId) => {
            dispatch(getTasksThunkC(todolistId))
        },
        addTask: (newTask, toDoListId) => {
            dispatch(addTaskThunkC(newTask, toDoListId))
        },
        сhangeTask: (toDoListId, taskId, task, obj) => {
            dispatch(сhangeTaskThunkC(toDoListId, taskId, task, obj))
        },
        changeTaskStatus: (toDoListId, taskId, task, obj) => {
            dispatch(changeStatusThunkC(toDoListId, taskId, task, obj))
        },
        changePriority: (toDoListId, taskId, task, obj) => {
            dispatch(changePriorityThunkC(toDoListId, taskId, task, obj))
        },
        сhangeListTitle: (toDoListId, obj) => {
            dispatch(changeListTitleThunkC(toDoListId, obj))
        }
    }
}

export default connect(null, mapDispatchToProps)(ToDoList)


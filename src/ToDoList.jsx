import React from 'react';
import './App.css';
import {connect} from "react-redux";

import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTaskThunkC,
    changeListTitleThunkC, changePriorityThunkC, changeStatusThunkC, changeTaskThunkC,
    deleteTaskThunkC,
    deleteToDoListThunkC,
    getTasksThunkC } from "./store/reducer";

class ToDoList extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.restoreState()
    }


    //____________________getting tasks of list from API_______________________

    restoreState = () => {
        this.props.getTasksThunkC(this.props.id)
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
        this.props.addTaskThunkC(title, this.props.id)
    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }


    //___________ changing IS_DONE of task and modifying task________

    changeStatus = (task, status) => {
        this.props.changeStatusThunkC(this.props.id, task.id, task, status)
    }


    changeTitleOfList = (title) => {
        this.props.changeListTitleThunkC(this.props.id, title)
    }


    changeTitle = (task, title) => {
        this.props.changeTaskThunkC(this.props.id, task.id, task, title)
    }


    //________________change priority___________________________________

    changePriority = (task, priority) => {
        this.props.changePriorityThunkC(this.props.id, task.id, task, priority)
    }


    //___________Delete list of tasks_________

    deleteToDoList = () => {
        this.props.deleteToDoListThunkC(this.props.id)
    };

    //___________Delete task_________

    deleteTask = (taskId) => {
        this.props.deleteTaskThunkC(this.props.id, taskId)
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


export default connect(null,
    {deleteToDoListThunkC, deleteTaskThunkC,
    getTasksThunkC, addTaskThunkC, changeTaskThunkC,
    changeListTitleThunkC, changeStatusThunkC, changePriorityThunkC})
(ToDoList)


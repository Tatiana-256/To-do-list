import React from 'react';
import './App.css';
import {connect} from "react-redux";

import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";
import TodoListTitle from "./components/TodoListTitle";
import AddNewItemForm from "./components/AddNewItemForm";
import {
    addTaskThunkC,
    changeListTitleThunkC, changePriorityThunkC, changeStatusThunkC, changeTaskThunkC,
    deleteTaskThunkC,
    deleteToDoListThunkC,
    getTasksThunkC, taskType
} from "./store/reducer";
import {AppStateType} from './store/store';
import {RouteComponentProps} from "react-router";


type mapStateToPropsType={
    // tasks: Array<taskType>
}

type mapDispatchToPropsType =
    {
    getTasksThunkC: (id: string) => void
    addTaskThunkC: (title: string, idList: string) => void
    changeStatusThunkC: (idList: string, taskId: string, task: taskType, status: any) => void
    changeListTitleThunkC: (id: string, title: string) => void
    deleteTaskThunkC: (id: string, taskId: string) => void
    deleteToDoListThunkC: (toDoListId: string) => void
    changePriorityThunkC: (id: string, idTask: string, task: taskType, priority: string) => void
    changeTaskThunkC: (id: string, idTask: string, task: taskType, title: string) => void
}

type OwnProps = {
    id: string,
    title: string,
    tasks: Array<taskType> | []

}

type PropsType = mapStateToPropsType & mapDispatchToPropsType & OwnProps & RouteComponentProps<{ id: string }>


class ToDoList extends React.Component<PropsType> {

    componentDidMount() {
        this.restoreState()
    }


    //____________________getting tasks of list from API_______________________

    restoreState = () => {
        this.props.getTasksThunkC(this.props.id)
    }

    state = {
        tasks: [] as Array<taskType>,
        filterValue: "All",
    }

    saveState = () => {
        localStorage.setItem('our-state' + this.props.id, JSON.stringify(this.state))
    }


    //   __________________add task for list __________________

    addItem = (title: string) => {
        this.props.addTaskThunkC(title, this.props.id)
    }

    changeFilter = (newFilterValue: string) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }


    //___________ changing IS_DONE of task and modifying task________

    changeStatus = (task: taskType, status: boolean) => {
        this.props.changeStatusThunkC(this.props.id, task.id, task, status)
    }


    changeTitleOfList = (title: string) => {
        this.props.changeListTitleThunkC(this.props.id, title)
    }


    changeTitle = (task: taskType, title: string) => {
        this.props.changeTaskThunkC(this.props.id, task.id, task, title)
    }


    //________________change priority___________________________________

    changePriority = (task: taskType, priority: string) => {
        this.props.changePriorityThunkC(this.props.id, task.id, task, priority)
    }


    //___________Delete list of tasks_________

    deleteToDoList = () => {
        this.props.deleteToDoListThunkC(this.props.id)
    };

    //___________Delete task_________

    deleteTask = (taskId: string) => {
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
                    tasks={tasks.filter((t: any) => {
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
                <TodoListFooter
                    filterValue={this.state.filterValue}
                    changeFilter={this.changeFilter}/>
            </div>
        );
    }
}


export default connect<null, mapDispatchToPropsType, OwnProps, AppStateType>(null,
    {
        deleteToDoListThunkC, deleteTaskThunkC,
        getTasksThunkC, addTaskThunkC, changeTaskThunkC,
        changeListTitleThunkC, changeStatusThunkC, changePriorityThunkC
    })
(ToDoList)


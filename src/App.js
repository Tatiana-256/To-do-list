import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {

    constructor(props) {
        super(props);

    }

    state = {
        tasks: [
            {title: "JS", isDone: true, priority: 'low'},
            {title: "CSS", isDone: true, priority: 'low'},
            {title: "React", isDone: false, priority: 'low'},
            {title: 'Sass', isDone: true, priority: 'low'},
            {title: 'Redux', isDone: false, priority: 'low'}
        ],
        filterValue: "All"
    }

    onAddTaskClick = (newText) => {
        let newTask = {
            title: newText, isDone: false, priority: 'low'
        }
        let newTasks = [...this.state.tasks, newTask]
        this.setState({tasks: newTasks})
    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue})
    }

    changeStatus = (task, isDone) => {
        let newTasks = this.state.tasks.map(t => {
            if (t != task) {
                return t
            } else {
                return {...t, isDone: isDone}
            }
        })
        this.setState({tasks: newTasks})
    }
    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTaskClick={this.onAddTaskClick}/>
                    <TodoListTasks
                        changeStatus={this.changeStatus}
                        tasks={this.state.tasks.filter(t => {
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
                    <TodoListFooter filterValue={this.state.filterValue} changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;


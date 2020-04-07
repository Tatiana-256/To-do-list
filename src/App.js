import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {

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
        localStorage.setItem('our-state', JSON.stringify(this.state))
    }

    restoreState = () => {
        let state = {
            task: [],
            filterValue: "All"
        }
        let stateAsString = localStorage.getItem('our-state')
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

    onAddTaskClick = (newText) => {
        let newTask = {
            id: this.nextTaskId,
            title: newText,
            isDone: false,
            priority: 'low'
        }
        this.nextTaskId++
        let newTasks = [...this.state.tasks, newTask]
        this.setState({tasks: newTasks}, () => {
            this.saveState()
        })

    }

    changeFilter = (newFilterValue) => {
        this.setState({filterValue: newFilterValue}, () => {
            this.saveState()
        })
    }

    changeStatus = (taskId, isDone) => {
        this.changeTask(taskId, {isDone: isDone})
    }

    changeTitle = (taskId, title) => {
        this.changeTask(taskId, {title: title})
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
        this.setState({tasks: newTasks}, () => {
            this.saveState()
        })
    }


    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                    <TodoListHeader onAddTaskClick={this.onAddTaskClick}/>
                    <TodoListTasks
                        changeTitle={this.changeTitle}
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
                    <TodoListFooter isHidden={this.state.isHidden} filterValue={this.state.filterValue}
                                    changeFilter={this.changeFilter}/>
                </div>
            </div>
        );
    }
}

export default App;


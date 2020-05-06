import React from 'react';
import './App.css';
import {connect} from "react-redux";
import ToDoList from "./ToDoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTodolistAC} from "./store/actions";

class App extends React.Component {
    state = {
        toDoLists: []
    }

    componentDidMount() {
        this.restoreState()
    }

    saveState = () => {
        localStorage.setItem('ToDolist', JSON.stringify(this.state))
    }

    restoreState = () => {
        let state = this.state
        let stateAsString = localStorage.getItem('ToDolist')
        if (stateAsString) {
            state = JSON.parse(stateAsString)
        }
        this.setState(state, () => {
            this.state.toDoLists.forEach(list => {
                if (list.id >= this.nextTaskId) {
                    this.nextToDoListId = list.id + 1
                }
            })
        })
    }


    nextToDoListId = 0

    addToDoList = (toDoListName) => {
        let newList = {
            id: this.nextToDoListId,
            title: toDoListName,
            tasks: []
        }
        this.nextToDoListId++
        debugger
        this.props.addToDoList(newList)
    }

    render = () => {
        debugger
        let toDoList = this.props.toDoLists.map(list => <ToDoList id={list.id} title={list.title} tasks={list.tasks}/>)
        return (
            <div className="App">
                <div className="header">
                    <h3>Add new list</h3>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className='toDo'>
                    {toDoList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        toDoLists: state.toDoLists
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addToDoList: (newList) => {
            dispatch(addTodolistAC(newList))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp


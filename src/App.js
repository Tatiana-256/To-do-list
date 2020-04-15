import React from 'react';
import './App.css';
import ToDoList from "./ToDoList";
import AddNewItemForm from "./components/AddNewItemForm";

class App extends React.Component {
    state = {
        toDoLists: [
        ]
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

    addToDoList = (toDoListName) =>{
        let newList ={
            title: toDoListName,
            id: this.nextToDoListId
        }
        this.nextToDoListId++
        this.setState({toDoLists: [...this.state.toDoLists, newList]}, ()=>{this.saveState()})
    }

    render = () => {
        let toDoList = this.state.toDoLists.map(list => <ToDoList id={list.id} title={list.title}/>)
        return (
            <div>
                <div>
                  <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className="App">
                    {toDoList}
                </div>
            </div>
        );
    }
}

export default App;


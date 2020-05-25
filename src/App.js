import React from 'react';
import './App.css';
import {connect} from "react-redux";
import ToDoList from "./ToDoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {actions} from "./store/actions";
import {api, ResultCodeEnum} from "./store/api";

class App extends React.Component {
    state = {
        toDoLists: []
    }

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        api.getToDoList()
            .then(res => {
                this.props.setToDoList(res.data);
            });
    }

    nextToDoListId = 0


    addToDoList = (title) => {
        api.createToDoList(title)
            .then(result => {
                if (result.data.resultCode === ResultCodeEnum.Success) {
                    this.props.addToDoList(result.data.data.item)
                }
            })
    }


    render = () => {
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
            dispatch(actions.addTodolistAC(newList))
        },
        setToDoList: (toDoLists) => {
            dispatch(actions.setToDoList(toDoLists))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp


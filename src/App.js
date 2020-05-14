import React from 'react';
import './App.css';
import {connect} from "react-redux";
import ToDoList from "./ToDoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {addTodolistAC, setToDoList} from "./store/actions";
import axios from "axios";

class App extends React.Component {
    state = {
        toDoLists: []
    }

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        debugger
        axios.get("https://social-network.samuraijs.com/api/1.1/todo-lists", {withCredentials: true})
            .then(res => {
                this.props.setToDoList(res.data);
            });
    }

    nextToDoListId = 0


    addToDoList = (title) => {
        axios.post('https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: title},
            {
                withCredentials: true,
                headers: {'API-KEY': '55ac5274-f21f-43a3-b42e-5cfba380d176'}
            }
        )
            .then(result => {
                debugger
                if (result.data.resultCode === 0) {
                    this.props.addToDoList(result.data.data.item)
                }
            })
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
        },
        setToDoList: (toDoLists) => {
            dispatch(setToDoList(toDoLists))
        }
    }
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);
export default ConnectedApp


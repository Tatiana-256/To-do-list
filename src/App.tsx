import React from 'react';
import './App.css';
import {connect} from "react-redux";
import ToDoList from "./ToDoList";
import AddNewItemForm from "./components/AddNewItemForm";
import {addToDoListThunkC, getToDoListThunkC} from "./store/reducer";
import {AppStateType} from "./store/store";

type mapStateToPropsType = ReturnType<typeof mapStateToProps>

type mapDispatchToPropsType = {
    getToDoListThunkC: () => void
    addToDoListThunkC: (title: string) => void
}


type PropsType = mapStateToPropsType & mapDispatchToPropsType


class App extends React.Component<PropsType> {
    state = {
        toDoLists: []
    }

    componentDidMount() {
        this.restoreState()
    }

    restoreState = () => {
        this.props.getToDoListThunkC()
    }

    addToDoList = (title: string) => {
        this.props.addToDoListThunkC(title)
    }


    render = () => {
        // @ts-ignore
        let toDoList = this.props.toDoLists.map(list => <ToDoList key={list.id} id={list.id} title={list.title} tasks={list.tasks}/>)
        return (
            <div className="App">
                <div className="header">
                    <h3>Add new list of tasks</h3>
                    <AddNewItemForm addItem={this.addToDoList}/>
                </div>
                <div className='toDo'>
                    {toDoList}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        toDoLists: state.toDoListReducer.toDoLists
    }
}


export default connect<mapStateToPropsType, mapDispatchToPropsType, null, AppStateType>(mapStateToProps, {
    addToDoListThunkC,
    getToDoListThunkC
})(App);




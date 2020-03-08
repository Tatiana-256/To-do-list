import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
    render = () => {
        return (
            <div className="App">
                <div className="todoList">
                  <TodoListHeader/>
                   <TodoListTasks/>
                   <TodoListFooter/>
                </div>
            </div>
        );
    }
}

export default App;


import React from 'react';
import './App.css';
import TodoListHeader from "./components/TodoListHeader";
import TodoListTasks from "./components/TodoListTasks";
import TodoListFooter from "./components/TodoListFooter";

class App extends React.Component {
     tasks =[
        {title: "JS",isDone: true, priority: 'low' },
        {title: "CSS",isDone: true, priority: 'low' },
        {title: "React",isDone: false, priority: 'low' },
        {title: 'Sass',isDone: true, priority: 'low' },
        {title: 'Redux', isDone: false, priority: 'low' }
    ]

    filterValue = "All"

    render = () => {

        return (
            <div className="App">
                <div className="todoList">
                  <TodoListHeader/>
                   <TodoListTasks tasks={this.tasks}/>
                   <TodoListFooter filterValue={this.filterValue}/>
                </div>
            </div>
        );
    }
}

export default App;


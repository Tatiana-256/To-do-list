import React from 'react';
import TodoListTask from "./TodoListTask";

class TodoListTasks extends React.Component {
    render() {
        let taskElements = this.props.tasks.map(task => {
            return <TodoListTask
                title={task.title}
                isDone={task.isDone}
                priority={task.priority}
            />
        })
        return (
            <div className="todoList-task">
                {taskElements}
            </div>
        );
    }
}

export default TodoListTasks
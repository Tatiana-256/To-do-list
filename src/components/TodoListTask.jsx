import React from 'react';

class TodoListTask extends React.Component {

    onIsDoneChanges = (e) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }

    render() {

        return <div className="">
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input
                        onChange={this.onIsDoneChanges}
                        type="checkbox" checked={this.props.task.isDone}/>
                    <span>{this.props.task.title}</span>
                </div>
            </div>
        </div>
    }
}

export default TodoListTask
import React from 'react';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = () => {
        this.setState({editMode: false})
    }


    onIsDoneChanges = (e) => {
        this.props.changeStatus(this.props.task.id, e.currentTarget.checked)
    }

    onTitleChanged = (e) => {
        this.props.changeTitle(this.props.task.id, e.currentTarget.value)
    }

    deleteTask =()=>{
        this.props.deleteTask(this.props.task.id)
    }

    render() {

        return <div className="">
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input
                        onChange={this.onIsDoneChanges}
                        type="checkbox" checked={this.props.task.isDone}/>

                    {this.state.editMode ?
                        <input onBlur={this.deActivateEditMode}
                               onChange={this.onTitleChanged}
                               autoFocus={true}
                               value={this.props.task.title}/> :
                        <span onClick={this.activateEditMode}>
                            {this.props.task.id} - {this.props.task.title}
                        </span>}
                    <button className='delete' onClick={this.deleteTask}>x</button>
                </div>
            </div>
        </div>
    }
}

export default TodoListTask
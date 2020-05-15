import React from 'react';

class TodoListTask extends React.Component {

    state = {
        editMode: false
    }


    //_________________Add area for ability to change task

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = (e) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value)
        this.setState({editMode: false})
    }

    //___________ changing IS_DONE of task and modifying task________

    onIsDoneChanges = (e) => {

        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }


    //___________Delete task_________

    deleteTask = () => {
        debugger
        this.props.deleteTask(this.props.task.id)
    }

    render() {
        debugger
        return <div className="">
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <input
                        onChange={this.onIsDoneChanges}
                        type="checkbox" checked={this.props.task.status}/>

                    {this.state.editMode ?
                        <input onBlur={this.deActivateEditMode}
                               autoFocus={true}
                               defaultValue={this.props.task.title}/> :
                        <span onClick={this.activateEditMode}>
                            {this.props.task.title}
                        </span>}
                    <button className='delete' onClick={this.deleteTask}>x</button>
                </div>
            </div>
        </div>
    }
}

export default TodoListTask
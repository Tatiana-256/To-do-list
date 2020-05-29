import React from 'react';
import './task.css'

class TodoListTask extends React.Component {

    state = {
        editMode: false,
        title: ''
    }


    //_________________Add area for ability to change task

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = (e) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value)
        this.setState({title: e.currentTarget.value, editMode: false})
    }

    //___________ changing IS_DONE of task and modifying task________

    onIsDoneChanges = (e) => {

        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }


    //_____________change priority_____________

    onChangePriority = (e) => {
        this.props.changePriority(this.props.task, e.currentTarget.value)
    }


    //___________Delete task_________

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    //___________________

    render() {
        let classSelect = () => {
            if (this.props.task.priority === "1") {
                return 'low'
            } else if (this.props.task.priority === "2") {
                return 'average'
            } else if (this.props.task.priority === "3") {
                return 'high'
            }
        }
        return <div className="">
            <div className="todoList-tasks">
                <div className="todoList-task">
                    <div className='hov'>
                        <div className="task">
                            {this.state.editMode ?
                                <input onBlur={this.deActivateEditMode}
                                       autoFocus={true}
                                       defaultValue={this.props.task.title}/> :
                                <span onClick={this.activateEditMode}>
                            {this.props.task.title}
                        </span>}
                            <button className='delete' onClick={this.deleteTask}>x</button>
                        </div>
                        <div className="inner">
                            <div>Created: {this.props.task.addedDate}</div>
                        </div>
                    </div>
                    <div className='prior'>
                        <select
                            className={classSelect}
                            value={this.props.task.priority}
                            onChange={this.onChangePriority}
                        >
                            <option value='1' className='low'>low</option>
                            <option value="2" className='average'>average</option>
                            <option value="3" className='high'>high
                            </option>
                        </select>
                        <input
                            className='checkbox'
                            onChange={this.onIsDoneChanges}
                            type="checkbox" checked={this.props.task.status}/>

                    </div>
                </div>
            </div>
        </div>
    }
}

export default TodoListTask
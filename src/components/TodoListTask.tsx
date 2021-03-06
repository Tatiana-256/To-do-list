import React from 'react';
import './task.css'
import {taskType} from "../store/reducer";

type PropsType ={
    task: taskType


    changeTitle: (task: taskType, value: string) => void
    changeStatus: (task: taskType, checked: any) => void
    changePriority: (task: taskType, value: string) => void
    deleteTask: (id: string)=>void

}



class TodoListTask extends React.Component<PropsType> {

    state = {
        editMode: false,
        title: ''
    }

    //_________________Add area for ability to change task

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = (e: any) => {
        this.props.changeTitle(this.props.task, e.currentTarget.value)
        this.setState({title: e.currentTarget.value, editMode: false})
    }

    //___________ changing IS_DONE of task and modifying task________

    onIsDoneChanges = (e: any) => {
        this.props.changeStatus(this.props.task, e.currentTarget.checked)
    }


    //_____________change priority_____________

    onChangePriority = (e: any) => {
        this.props.changePriority(this.props.task, e.currentTarget.value)
    }


    //___________Delete task_________

    deleteTask = () => {
        this.props.deleteTask(this.props.task.id)
    }

    //___________________

    render() {
        let classSelect = this.props.task.priority === "1" ? 'low' :
            this.props.task.priority === "2" ? 'average' :
                this.props.task.priority === "3" ? 'high' : ''

        return <div className='onetask'>
            <div className='taskAndDelete'>
                <div className='hov'>
                    {this.state.editMode ?
                        <input onBlur={this.deActivateEditMode}
                               autoFocus={true}
                               defaultValue={this.props.task.title}/> :
                        <div className="task"><span onClick={this.activateEditMode}>
                            {this.props.task.title}
                        </span></div>}
                    <div className="inner">
                        <div>Created: {this.props.task.addedDate}</div>
                    </div>
                </div>
                <button className='delete' onClick={this.deleteTask}>x</button>
            </div>
            <div className='prior'>
                <div className='check'>priority</div>
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
                <div className='check'>is done?</div>
                <input
                    id={this.props.task.id}
                    className='checkbox'
                    onChange={this.onIsDoneChanges}
                    type="checkbox" checked={this.props.task.status}/>
                <label htmlFor={this.props.task.id}/>

            </div>
        </div>
    }
}

export default TodoListTask
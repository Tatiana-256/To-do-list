import React from "react";

type PropsType = {
    title: string,
    changeTitle: (title: string) => void,
    deleteToDoList: any
}


class TodoListTitle extends React.Component<PropsType> {
    state = {
        editMode: false,
        title: this.props.title
    }


    //_________________Add area for ability to change task

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = (e: any) => {
        this.props.changeTitle(e.currentTarget.value)
        this.setState({editMode: false})
    }

    onTitleChange(e: any) {
        this.setState({title: e.currentTarget.value})
    }


    render() {
        return <div className='list'>
            <div className='delete_list'>
                <button className='delete' onClick={this.props.deleteToDoList}>x</button>

            </div>
            <div className='inpt'>
                {this.state.editMode ?
                    <input onBlur={this.deActivateEditMode}
                           autoFocus={true}
                           value={this.state.title}
                           onChange={this.onTitleChange}
                    /> :
                    <span onClick={this.activateEditMode}>
                            {this.props.title}
                        </span>}
            </div>
        </div>
    }
}

export default TodoListTitle


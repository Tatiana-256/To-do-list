import React from "react";


class TodoListTitle extends React.Component {
    state = {
        editMode: false,
        title: this.props.title
    }


    //_________________Add area for ability to change task

    activateEditMode = () => {
        this.setState({editMode: true})
    }

    deActivateEditMode = (e) => {

        this.props.changeTitle(e.currentTarget.value)
        this.setState({editMode: false})
    }

    onTitleChange(e) {
        this.setState({title: e.currentTarget.value})
    }


    render() {

        debugger
        return <div className='inpt'>

            {this.state.editMode ?
                <input onBlur={this.deActivateEditMode}
                       autoFocus={true}
                       value={this.state.title}
                       onChange={this.onTitleChange}
                /> :
                <span onClick={this.activateEditMode}>
                            {this.props.title}
                        </span>}
            <div>
                <button className='delete' onClick={this.props.deleteToDoList}>x</button>
            </div>
        </div>
    }
}

export default TodoListTitle
import React from 'react';

type PropsType={
    addItem: (task: string)=>void
}

class AddNewItemForm extends React.Component <PropsType>{
    state = {
        error: false,
        itemName: ''
    }


    onAddItemClick = () => {
        let newTask = this.state.itemName
        this.setState({itemName: ''})
        if (newTask === '') {
            this.setState({error: true})
        } else {
            this.setState({error: false})
            this.props.addItem(newTask)
        }

    }

    onItemChange = (event: any) => {
        this.setState({
            error: false,
            itemName: event.currentTarget.value
        })
    }

    onKeyPress = (e: any) => {
        if (e.key === "Enter") {
            this.onAddItemClick()
        }
    }

    render() {
        return <div>
            <div className="todoList-newTaskForm">
                <input
                    value={this.state.itemName} onChange={this.onItemChange}
                       type="text"
                       onKeyPress={this.onKeyPress}
                       className={this.state.error ? 'error' : 'black_border'}
                />
                <button onClick={this.onAddItemClick} className='btn'>Add</button>
            </div>
        </div>
    }
}

export default AddNewItemForm
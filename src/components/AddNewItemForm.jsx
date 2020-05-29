import React from 'react';

class AddNewItemForm extends React.Component {
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

    onItemChange = (event) => {
        this.setState({
            error: false,
            itemName: event.currentTarget.value
        })
    }

    onKeyPress = (e) => {
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
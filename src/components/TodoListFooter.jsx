import React from 'react';

class TodoListFooter extends React.Component {
    state = {isHidden: true}

    hideShow = () => {
        this.setState({isHidden: !this.state.isHidden})
    }

    onAllFilterClick = () => {
        this.props.changeFilter('All')
    }
    onCompletedFilterClick = () => {
        this.props.changeFilter('Completed')
    }
    onActiveFilterClick = () => {
        this.props.changeFilter('Active')
    }


    render() {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "normal";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "normal";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "normal";

        return (
            <div className="todoList-footer">
                {this.state.isHidden && <div>
                    <button className={classForAll} onClick={this.onAllFilterClick}>All
                    </button>
                    <button className={classForCompleted} onClick={this.onCompletedFilterClick}>Completed
                    </button>
                    <button className={classForActive} onClick={this.onActiveFilterClick}>Active
                    </button>
                </div>}
                {this.state.isHidden ? <div>
                        <button onClick={this.hideShow} className='btn'>Hide</button>
                    </div> :
                    <div>
                        <button onClick={this.hideShow} className='btn'>Show</button>
                    </div>}
            </div>
        );
    }
}

export default TodoListFooter
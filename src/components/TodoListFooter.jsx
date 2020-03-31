import React from 'react';

class TodoListFooter extends React.Component {
    state = {isHidden: false}

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
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

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
                {this.state.isHidden ? <span onClick={this.hideShow}>Hide</span> :
                    <span onClick={this.hideShow}>Show</span>}
            </div>
        );
    }
}

export default TodoListFooter
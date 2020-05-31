import React from 'react';

type PropsType = {
    changeFilter: (filter: string) => void,
    filterValue: string
}


class TodoListFooter extends React.Component<PropsType> {
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
        let classForAll = this.props.filterValue === "All" ? "filter-active btr_All" : "normal btr_All";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active btr_Comp" : "normal btr_Comp";
        let classForActive = this.props.filterValue === "Active" ? "filter-active btr_act" : "normal btr_act";

        return (

            <div className="footer">
                {this.state.isHidden && <div className="todoList-footer">
                    <button className={classForAll} onClick={this.onAllFilterClick}>All
                    </button>
                    <button className={classForCompleted} onClick={this.onCompletedFilterClick}>Completed
                    </button>
                    <button className={classForActive} onClick={this.onActiveFilterClick}>Active
                    </button>
                </div>}
                {this.state.isHidden ? <div>
                        <button onClick={this.hideShow} className='hide_btn'>Hide</button>
                    </div> :
                    <div>
                        <button onClick={this.hideShow} className='btn'>Show</button>
                    </div>}
            </div>
        );
    }
}

export default TodoListFooter
import React, {Component} from 'react';
import DisplayItems from './DisplayItems';
import './Todo.css';

class Todo extends Component {

    constructor(props) {
        super(props);
        // Define state.
        this.state = {
            todoItem: '',
            todoList: []
        };

        // This binding is necessary to make `this` work in the callback.
        this.handleInputChange = this.handleInputChange.bind(this);
        this.addTodoItems = this.addTodoItems.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.tickOffItem = this.tickOffItem.bind(this);
    }

    // Set the input value in state.
    handleInputChange(e) {
        this.setState({todoItem: e.target.value});
    }

    // Add item to to-do-list.
    addTodoItems(e) {
        // Prevent form submission.
        e.preventDefault();
        // Assign the to-do list to new array so that we can add new action item to that array.
        var newArray = this.state.todoList;
        newArray.push({value: this.state.todoItem, isChecked: false});
        // Set the updated list in the state for display.
        this.setState({
            todoList: newArray,
            // We empty this variable to empty the input field.
            todoItem: ''
        })
    }

    // Remove item from to-do list.
    removeItem(itemIndex) {
        // Remove the element at index position.
        this.state.todoList.splice(itemIndex, 1);
        // Update the state
        this.setState({todoList: this.state.todoList});
    }

    // Mark the action item to done.
    tickOffItem(checkboxObj) {
        // Remove the element at index position.
        this.state.todoList.splice(checkboxObj.index, 1);
        // Add the element at index position after updating the isChecked value.
        this.state.todoList.splice(checkboxObj.index, 0, checkboxObj);
        // Delete the index key from object and then update the state.
        delete checkboxObj['index'];
        this.setState({todoList: this.state.todoList});
    }

    render() {
        return (
            <React.Fragment>
                <form>
                    <p>Enter the To-Do item: </p>
                    <div className='todo-form'>
                        <input type="text" name="todo-text" onChange={this.handleInputChange} value={this.state.todoItem}/>
                        <button onClick={this.addTodoItems}>Submit</button>
                    </div>
                </form>
                <DisplayItems items={this.state.todoList} removeItem={this.removeItem} tickOffItem={this.tickOffItem}/>
            </React.Fragment>
        );
    }
}

export default Todo;
import React, {Component} from 'react';
import CheckList from './CheckList';

class DisplayItems extends Component {

    constructor(props) {
        super(props);
        // This binding is necessary to make `this` work in the callback.
        this.deleteTodo = this.deleteTodo.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // Delete the to-do item.
    deleteTodo(e) {
        // Get the index of the item to be deleted.
        var index = e.target.name;
        // Pass the index to the remove function in the main js.
        this.props.removeItem(index);
    }

    // Keep track of which items are marked as done.
    handleChange(e) {
        // Get if checkbox is checked.
        var isChecked = e.target.checked;
        // Get the item name.
        var name = e.target.name;
        // Get the name of the item excluding its index value from the string.
        var value = name.substring(0, name.lastIndexOf("_"));
        // Get the index value from the item name.
        var index = parseInt(name.substring(name.lastIndexOf("_") + 1));
        // Create the checkbox object and pass to the tickOffItem function in the main js.
        var checkboxObj = {index, value, isChecked};
        this.props.tickOffItem(checkboxObj);
    }

    render() {
        // Get the items, set in the state.
        const items = this.props.items;
        let listItems;
        // If to-do list has items, display the items.
        if (items.length > 0) {
            // Loop the items array.
            listItems = items.map((item, index) => (
                <label key={index}>
                    <p>
                        <span className={item.isChecked ? 'isdone' : ''}><CheckList name={item.value + '_' + index}
                                                                                    checked={item.isChecked}
                                                                                    onChange={this.handleChange}/>{item.value}</span>
                        <button name={index} onClick={this.deleteTodo}>Delete</button>
                    </p>
                </label>
            ));
        } else {
            listItems = <p>Your To-Do List is empty</p>;
        }
        return (
            <React.Fragment>
                {items.length > 0 &&
                <p>Your To-Do List is as below:</p>
                }
                {listItems}
            </React.Fragment>
        );
    }
}

export default DisplayItems;
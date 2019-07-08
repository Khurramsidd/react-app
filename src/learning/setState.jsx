import React from 'react';

class SetState extends React.Component {
    constructor() {
        super();

        this.state = {
            data: []
        }
        /**
         * " this.setStateHandler().bind(this) " sets the context for the function setStateHandler() to be the class object.
         * This is necessary so that you could call this.setState({...}) inside the method, because setState() is the method of React.Component.
         * If you do not .bind(this) you would get an error that setState() method is undefined.
         */
        this.setStateHandler = this.setStateHandler.bind(this);
    };
    setStateHandler() {
        var item = "setState..."
        var myArray = this.state.data.slice();
        myArray.push(item);
        this.setState({data: myArray})
    };
    render() {
        return (
            <div>
                <h2>Set State</h2>
                <button onClick = {this.setStateHandler}>SET STATE</button>
                <h4>State Array: {this.state.data}</h4>
            </div>
        );
    }
}
export default SetState;
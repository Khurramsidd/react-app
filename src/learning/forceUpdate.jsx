import React from 'react';

let heading;

class ForceUpdate extends React.Component {
    constructor() {
        super();
        heading = {
            name: 'Force Update'
        }
        this.forceUpdateHandler = this.forceUpdateHandler.bind(this);
    };

    forceUpdateHandler() {
        let fruits = ["Banana", "Orange", "Apple", "Mango", "Kiwi", "Force Update", "Force", "Update", "Random Number", "Random"];
        heading.name = fruits.splice(Math.random() * 10, 1);

        this.forceUpdate();
    };

    render() {
        return (
            <div>
                <h2>{heading.name}</h2>
                <button onClick={this.forceUpdateHandler}>FORCE UPDATE</button>
                <h4>Random number: {Math.random()}</h4>
            </div>
        );
    }
}

export default ForceUpdate;
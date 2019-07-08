import React from 'react';
import Props from './learning/props.jsx'
import StateAndProps from './learning/stateAndProps.jsx'
import ValidatingProps from './learning/validatingProps.jsx'
import SetState from './learning/setState.jsx'
import ForceUpdate from './learning/forceUpdate.jsx'
class App extends React.Component {
    render() {
        return (
            <div>
                <Header/>
                <Content/>
                <Props/>
                <StateAndProps/>
                <ValidatingProps/>
                <SetState/>
                <ForceUpdate/>
            </div>
        );
    }
}

class Header extends React.Component {
    render() {
        let headerStyle = {
            fontSize: 100,
            color: '#FF0000',
            background: '#c1ff1d'

        };
        return (
            <div>
                <h1 style={headerStyle}>Header</h1>
            </div>
        );
    }
}

class Content extends React.Component {
    render() {
        let contentStyle = {
            fontSize: 25,
            color: '#fffd14',
            background: '#6935ff'
        };
        return (
            <div>
                <h2 style={contentStyle}>Content</h2>
                <p>The content text!!!</p>
            </div>
        );
    }
}

export default App;
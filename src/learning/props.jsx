import React from 'react';
import State from './state.jsx'

class Props extends React.Component {
    render() {
        return (
            <div>
                <State headerSateProp = {this.props.headerSateProp} contentSateProp = {this.props.contentSateProp}/>
                {/*sending props variable as params*/}
                <h1>{this.props.headerProp}</h1>
                <h2>{this.props.contentProp}</h2>
            </div>
        );
    }
}
Props.defaultProps = {
    headerProp: "Header from props...",
    contentProp:"Content from props...",
    headerSateProp: "Header from  State ",
    contentSateProp:"Content from State "
}
export default Props;
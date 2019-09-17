import React from 'react'
import Map from './map.jsx'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            address: '',
            city: '',
            area: '',
            state: '',
            lat: '',
            lng: ''

        }
    }

    /**
     * And function for city,state and address input
     * @param event
     */
    onStateChange = (stateChange) => {
        console.log('onStateChange')
        this.setState(stateChange);
    };

    render() {
        return (
            <div>
                <div>
                    <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" className="form-control" onChange={this.onChange}
                               readOnly="readOnly"
                               value={this.state.city}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Area</label>
                        <input type="text" name="area" className="form-control" onChange={this.onChange}
                               readOnly="readOnly"
                               value={this.state.area}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">State</label>
                        <input type="text" name="state" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.state}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.address}/>
                    </div>
                </div>
                <div>

                    <Map
                        google={this.props.google}
                        center={{lat: 33.5701204, lng: 73.1298308}}
                        apiKey="AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0"
                        height='500px'
                        zoom={15}
                        location={this.state}
                        onStateChange={this.onStateChange}
                    />
                </div>
            </div>
        );

    }
}

export default AddressForm

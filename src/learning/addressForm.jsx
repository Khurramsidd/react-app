import React from 'react'
import Map from './map.jsx'

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationObj:{
                street_address: '',
                city: '',
                area: '',
                state: '',
                lat: 33.5701204,
                lng: 73.1298308
            }
        }
    }

    /**
     * And function for city,state and address input
     * @param event
     */
    onStateChange = (stateChange) => {
        console.log('stateChange', stateChange)
        this.setState(prevState => ({
            ...prevState,
            locationObj: Object.assign(this.state.locationObj, stateChange)
        }));
    };

    render() {
        return (
            <div>
                <div>
                    <div className="form-group">
                        <label htmlFor="">City</label>
                        <input type="text" name="city" className="form-control" onChange={this.onChange}
                               readOnly="readOnly"
                               value={this.state.locationObj.city}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Area</label>
                        <input type="text" name="area" className="form-control" onChange={this.onChange}
                               readOnly="readOnly"
                               value={this.state.locationObj.area}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">State</label>
                        <input type="text" name="state" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.locationObj.state}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Address</label>
                        <input type="text" name="address" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.locationObj.address}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">lat</label>
                        <input type="text" name="lat" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.locationObj.lat}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="">lng</label>
                        <input type="text" name="lng" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.locationObj.lng}/>
                    </div>
                </div>
                <div>

                    <Map
                        google={this.props.google}
                        apiKey="AIzaSyDGe5vjL8wBmilLzoJ0jNIwe9SAuH2xS_0"
                        height='500px'
                        zoom={15}
                        location={this.state.locationObj}
                        onStateChange={this.onStateChange}
                    />
                </div>
            </div>
        );

    }
}

export default AddressForm

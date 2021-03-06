import React from 'react'
import Map from './map.jsx'
import 'react-dropzone-uploader/dist/styles.css'
import Dropzone from 'react-dropzone-uploader';


class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            locationObj: {
                address: '',
                city: '',
                area: '',
                state: '',
                country: '',
                lat: 33.61770250930633,
                lng: 73.16674933454055
            }
        }
    }

    /**
     * And function for city,state and address input
     * @param event
     */
    onStateChange = (stateChange) => {
        this.setState(prevState => ({
            ...prevState,
            locationObj: Object.assign(this.state.locationObj, stateChange)
        }));
    };

    // specify upload params and url for your files
    getUploadParams = ({meta}) => {
        return {url: 'https://httpbin.org/post'}
    }
    // called every time a file's `status` changes
    handleChangeStatus = ({meta, file}, status) => {
        console.log('handleChangeStatus', status, meta, file)
    }
    // receives array of files that are done uploading when submit button is clicked
    handleSubmit = (files) => {
        console.log('meta', files.map(f => f.meta))
    }

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
                        <label htmlFor="">Country</label>
                        <input type="text" name="country" className="form-control" onChange={this.onChange}
                               readOnly="readOnly" value={this.state.locationObj.country}/>
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
                    <div className="form-group">
                        <label htmlFor="">file</label>
                        <Dropzone
                            getUploadParams={this.getUploadParams}
                            onChangeStatus={this.handleChangeStatus}
                            onSubmit={this.handleSubmit}
                            accept="image/*,audio/*,video/*"
                        />

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

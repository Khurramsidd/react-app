import React from 'react'
import {withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker} from "react-google-maps";
import Autocomplete from 'react-google-autocomplete';
import Geocode from "react-geocode";

Geocode.enableDebug();

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mapPosition: {
                lat: this.props.location.lat,
                lng: this.props.location.lng
            },
            markerPosition: {
                lat: this.props.location.lat,
                lng: this.props.location.lng
            },
            googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + this.props.apiKey + "&libraries=places"

        }
        Geocode.setApiKey(this.props.apiKey);

    }

    /**
     * Get the current address from the default map position and set those values in the state
     */
    componentDidMount() {
        Geocode.fromLatLng(this.state.mapPosition.lat, this.state.mapPosition.lng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    country = this.getCountry(addressArray),
                    state = this.getState(addressArray);


                this.props.onStateChange({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    country: (country) ? country : ''
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    /**
     * Component should only update ( meaning re-render ), when the user selects the address, or drags the pin
     *
     * @param nextProps
     * @param nextState
     * @return {boolean}
     */
    shouldComponentUpdate(nextProps, nextState) {
        if (
            this.state.markerPosition.lat !== this.props.location.lat ||
            this.props.location.address !== nextState.address ||
            this.props.location.city !== nextState.city ||
            this.props.location.area !== nextState.area ||
            this.props.location.state !== nextState.state
        ) {
            return true
        } else if (this.props.location.lat === nextProps.location.lat) {
            return false
        }
    }

    /**
     * Get the city and set the city input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };
    /**
     * Get the area and set the area input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };
    /**
     * Get the address and set the address input value to the one selected
     *
     * @param addressArray
     * @return {string}
     */
    getState = (addressArray) => {
        let state = '';
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
        }
    };
    getCountry = (addressArray) => {
        let country = '';
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'country' === addressArray[i].types[0]) {
                    country = addressArray[i].long_name;
                    return country;
                }
            }

    };
    /**
     * This Event triggers when the marker window is closed
     *
     * @param event
     */
    onInfoWindowClose = (event) => {
    };
    /**
     * When the user types an address in the search box
     * @param place
     */
    onPlaceSelected = (place) => {
        if (place.place_id) {
            const address = place.formatted_address,
                addressArray = place.address_components,
                city = this.getCity(addressArray),
                area = this.getArea(addressArray),
                state = this.getState(addressArray),
                country = this.getCountry(addressArray),
                latValue = place.geometry.location.lat(),
                lngValue = place.geometry.location.lng();
// Set these values in the state.
            this.setState({
                markerPosition: {
                    lat: latValue,
                    lng: lngValue
                },
                mapPosition: {
                    lat: latValue,
                    lng: lngValue
                },
            }, () => {
                this.props.onStateChange({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    country: (country) ? country : '',
                    lat: latValue,
                    lng: lngValue
                })
            })
        }
    };
    /**
     * When the marker is dragged you get the lat and long using the functions available from event object.
     * Use geocode to get the address, city, area and state from the lat and lng positions.
     * And then set those values in the state.
     *
     * @param event
     */
    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray),
                    country = this.getCountry(addressArray),
                    latValue = newLat,
                    lngValue = newLng;
                this.setState({
                    markerPosition: {
                        lat: latValue,
                        lng: lngValue
                    },
                    mapPosition: {
                        lat: latValue,
                        lng: lngValue
                    },
                }, () => {
                    this.props.onStateChange({
                        address: (address) ? address : '',
                        area: (area) ? area : '',
                        city: (city) ? city : '',
                        state: (state) ? state : '',
                        country: (country) ? country : '',
                        lat: latValue,
                        lng: lngValue
                    })
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    render() {
        const AsyncMap = withScriptjs(
            withGoogleMap(
                props => (
                    <GoogleMap google={this.props.google}
                               defaultZoom={this.props.zoom}
                               defaultCenter={{lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng}}
                    >
                        {/* For Auto complete Search Box */}
                        <Autocomplete style={{
                            width: '100%',
                            height: '40px',
                            paddingLeft: '16px',
                            marginTop: '2px',
                            marginBottom: '100px'
                        }}
                                      onPlaceSelected={this.onPlaceSelected}
                                      types={['(regions)']}
                        />
                        {/*Marker*/}
                        <Marker google={this.props.google}
                                name={'Dolores park'}
                                draggable={true}
                                onDragEnd={this.onMarkerDragEnd}
                                position={{lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng}}
                        />
                        <Marker/>
                        {/* InfoWindow on top of marker */}
                        <InfoWindow
                            onClose={this.onInfoWindowClose}
                            position={{
                                lat: (this.state.markerPosition.lat + 0.0018),
                                lng: this.state.markerPosition.lng
                            }}
                        >
                            <div>
                                <span style={{padding: 0, margin: 0}}>{this.props.location.address}</span>
                            </div>
                        </InfoWindow>
                    </GoogleMap>
                )
            )
        );
        let map;
        if (this.props.location.lat !== undefined) {
            map = <div>
                <AsyncMap
                    googleMapURL={this.state.googleMapURL}
                    loadingElement={
                        <div style={{height: `100%`}}/>
                    }
                    containerElement={
                        <div style={{height: this.props.height}}/>
                    }
                    mapElement={
                        <div style={{height: `100%`}}/>
                    }
                />
            </div>
        } else {
            map = <div style={{height: this.props.height}}/>
        }
        return (map)
    }
}

export default Map

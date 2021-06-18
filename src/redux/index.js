import {connect} from 'react-redux';

function mapStateToProps(state) {
  return {
    currentLocationLat: state.currentLocationLat,
    currentLocationLang: state.currentLocationLang,
    currentLocationWetherData: state.currentLocationWetherData,
    CitiesData: state.CitiesData,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMyLocation: val => dispatch({type: 'SET_CURRENT_LOCATION', value: val}),
    setMyLocationData: val =>
      dispatch({type: 'SET_CURRENT_LOCATION_WETHER_DATA', value: val}),
    setCitiesData: val => dispatch({type: 'SET_CITIES_DATA', value: val}),
  };
}

export default {
  connect: connect,
  mapStateToProps: mapStateToProps,
  mapDispatchToProps: mapDispatchToProps,
};

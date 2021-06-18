const initialState = {
  currentLocationLat: null,
  currentLocationLang: null,
  currentLocationWetherData: [],
  CitiesData: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CURRENT_LOCATION': {
      let t = Object.create(state);
      t.currentLocationLat = action.value.latitude;
      t.currentLocationLang = action.value.longitude;
      return t;
    }

    case 'SET_CURRENT_LOCATION_WETHER_DATA': {
      let t = Object.create(state);
      t.currentLocationWetherData = action.value;
      return t;
    }
    case 'SET_CITIES_DATA': {
      let t = Object.create(state);
      t.CitiesData = action.value;
      return t;
    }
  }
  return state;
};

export default reducer;

import constants from './constants';

export default {
  citiesAPI: `http://api.openweathermap.org/data/2.5/find?lat=23.68&lon=90.35&cnt=50&appid=${constants.wetherAPIKey}`,
  currentLocationAPI: (lat, long) =>
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${constants.wetherAPIKey}`,
};

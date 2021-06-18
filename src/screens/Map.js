import React, {Component} from 'react';
import MapView, {Marker} from 'react-native-maps';
import {colors, strings, assets} from '../common';
import redux from '../redux';
import Navigation from '../componnets/Navigation';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const mapType = 'standard';

class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: true, initial: null, marker: null};
  }
  componentDidMount() {
    let city = this.props.route.params.city;

    this.setState({
      loading: false,
      initial: {
        latitude: city.coord.lat,
        longitude: city.coord.lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      marker: {
        title: city.name,
        //        description: '',
        latlng: {
          latitude: city.coord.lat,
          longitude: city.coord.lon,
        },
      },
      name: city.name,
      weather: city.weather[0]['description'],
      humadity: city.main.humadity,
      windSpeed: city.wind.speed,
      temp: (city.main.temp - 273.15).toPrecision(2) + '°c',
      maxTemp: (city.main.temp_max - 273.15).toPrecision(2) + '°c',
      minTemp: (city.main.temp_min - 273.15).toPrecision(2) + '°c',
      iconcode: city.weather[0]['icon'],
    });
  }

  plotMarker = () => {
    let marker = this.state.marker;
    return (
      <Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}>
        <Image
          source={assets.pin}
          resizeMode="center"
          style={{
            width: 31,
            height: 31,
            tintColor: 'red',
          }}
        />
      </Marker>
    );
  };

  Maps = () => {
    let region = this.state.initial;
    return (
      <View>
        <MapView
          onMapReady={() => {}}
          initialRegion={region}
          onRegionChange={region => console.log(region)}
          style={{
            width: width,
            height: height * 0.55,
            borderColor: 'red',
            borderWidth: 1,
          }}
          toolbarEnabled={true}
          showsUserLocation={true}
          zoomControlEnabled={true}
          showsMyLocationButton={true}
          mapType={mapType}>
          {this.plotMarker()}
        </MapView>

        <ScrollView>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 25,
              color: 'black',
              paddingHorizontal: 15,
              paddingTop: 15,
            }}>
            {this.state.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 15,
            }}>
            <View>
              <Text style={{fontSize: 17, paddingVertical: 2}}>
                {this.state.weather}
              </Text>
              <Text style={{fontSize: 17, paddingVertical: 2}}>
                Humidity: {this.state.humadity}
              </Text>
              <Text style={{fontSize: 17, paddingVertical: 2}}>
                Wind Speed: {this.state.windSpeed}
              </Text>
              <Text style={{fontSize: 17, paddingVertical: 2}}>
                Max. Temp.: {this.state.maxTemp}
              </Text>
              <Text style={{fontSize: 17, paddingVertical: 2}}>
                Min. Temp.: {this.state.minTemp}
              </Text>
            </View>

            <View
              style={{
                alignItems: 'center',
                alignContent: 'center',
                justifyContent: 'flex-end',
                alignSelf: 'center',
              }}>
              <Text style={{fontWeight: '100', fontSize: 35}}>
                {this.state.temp}
              </Text>
              <Image
                source={{
                  uri:
                    'http://openweathermap.org/img/w/' +
                    this.state.iconcode +
                    '.png',
                }}
                style={{width: width * 0.4, height: width * 0.4}}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };
  render() {
    return (
      <SafeAreaView>
        <StatusBar backgroundColor={colors.statusBarBackgroundColor} />
        <Navigation
          navigation={this.props.navigation}
          pageTitle={strings.mapScreenTitle}
        />
        {this.state.loading ? null : this.Maps()}
      </SafeAreaView>
    );
  }
}

export default redux.connect(
  redux.mapStateToProps,
  redux.mapDispatchToProps,
)(Map);

import React, {Component} from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import redux from '../redux';
import Geolocation from '@react-native-community/geolocation';
import PushNotification from 'react-native-push-notification';

import {colors, strings, urls} from '../common';
import Navigation from '../componnets/Navigation';
import Splash from './Splash';
class Cities extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      splashFinish: false,
    };

    setTimeout(
      function () {
        this.setState({splashFinish: true});
      }.bind(this),
      1500,
    );
    this.InitNotification();
  }
  InitNotification() {
    PushNotification.configure({
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);
      },
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);
      },
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
  }

  localNotification(temp, icon, weather) {
    let img = 'https://openweathermap.org/img/w/' + icon + '.png';
    PushNotification.localNotification({
      channelId: 'fcm_fallback_notification_channel',
      largeIconUrl: img, // (optional) default: undefined
      color: colors.green, // (optional) default: system default
      vibrate: false, // (optional) default: true
      ongoing: true, // (optional) set whether this is an "ongoing" notification
      priority: 'high', // (optional) set notification priority, default: high
      visibility: 'private', // (optional) set notification visibility, default: private
      ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
      onlyAlertOnce: true, // (optional) alert will open only once with sound and notify, default: false
      when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: true, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true
      id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: 'WeatherApp : ' + weather, // (optional)
      message: 'Current Temparature ' + temp, // (required)
      playSound: false, // (optional) default: true
      number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }
  componentDidMount() {
    this.getData();
    this.getLocation();
  }

  getLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'WetherApp',
          message:
            'we will show you wether report of your location ' +
            'for that we need location permission.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        try {
          Geolocation.getCurrentPosition(info => {
            console.log('location=>', info);

            fetch(
              urls.currentLocationAPI(
                info.coords.latitude,
                info.coords.longitude,
              ),
            )
              .then(response => response.json())
              .then(data => {
                this.localNotification(
                  (data.main.temp - 273.15).toPrecision(2) + '°c',
                  data.weather[0]['icon'],
                  data.weather[0]['description'],
                );
                setTimeout(
                  function () {
                    this.getLocation();
                  }.bind(this),
                  5000,
                );
              });
          });
        } catch (e) {
          //          alert( e);
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (e) {
      alert('permission ' + e);
    }
  };
  getData() {
    fetch(urls.citiesAPI)
      .then(response => response.json())
      .then(data => {
        this.setState({isLoaded: true});
        this.props.setCitiesData(data.list);
      });
  }

  renderItem = (item, navigation) => {
    item = item.item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('map', {city: item})}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#ffffff',
          margin: 1,
          paddingHorizontal: 5,
          paddingVertical: 10,
        }}>
        <View style={{justifyContent: 'space-between'}}>
          <Text style={{fontWeight: '200', fontSize: 19, color: '#313131'}}>
            {item.name}
          </Text>
          <Text style={{fontWeight: '100', fontSize: 14, color: '#7e7e7e'}}>
            {item.weather[0]['description']}
          </Text>
        </View>
        <View>
          <Text style={{fontWeight: '200', fontSize: 30, color: '#343434'}}>
            {(item.main.temp - 273.15).toPrecision(2)}°c
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    if (this.state.isLoaded && this.state.splashFinish)
      return (
        <SafeAreaView>
          <StatusBar backgroundColor={colors.statusBarBackgroundColor} />

          <Navigation pageTitle={strings.citiesScreenTitle} />

          <FlatList
            data={this.props.CitiesData}
            renderItem={item => this.renderItem(item, this.props.navigation)}
            keyExtractor={item => item.id}
          />
          <Text>hello from home</Text>
        </SafeAreaView>
      );

    return <Splash />;
  }
}

export default redux.connect(
  redux.mapStateToProps,
  redux.mapDispatchToProps,
)(Cities);
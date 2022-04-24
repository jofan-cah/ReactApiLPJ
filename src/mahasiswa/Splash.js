import {StackActions} from '@react-navigation/native';
import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Alert,
  RefreshControl,
} from 'react-native';

class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    setTimeout(() => {
      this.props.navigation.dispatch(StackActions.replace('DataMahasiswa'));
    }, 5000);
  };
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <Image
            source={require('../../assets/log2.png')}
            style={{width: 200, height: 200}}
          />
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'blue',
          }}>
          LPJ HMPTI
        </Text>
      </View>
    );
  }
}

export default Splash;

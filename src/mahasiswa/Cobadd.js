import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  Image,
  FlatList,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  StatusBar,
  Alert,
  RefreshControl,
  Div,
  User,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {Component} from 'react';
// import {Picker} from '@react-native-picker/picker';

import SelectDropdown from 'react-native-select-dropdown';

class Cobadd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      divisi: [],
      countries: ['Egypt', 'Canada', 'Australia', 'Ireland'],
    };
  }
  componentDidMount() {
    this.getDivisi();
    //this.GetDataByAxios()
  }
  getDivisi = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch('https://lpj-hmpti-udb.my.id/API/KirimLPJ/divisi', {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token_key,
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 401) {
          ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          this.props.navigation.push('Login');
          console.log(json);
        } else {
          this.setState({divisi: json});
          // ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          // this.props.navigation.push('Login');
          console.log(json);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View>
        <SelectDropdown
          data={countries}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem;
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item;
          }}
        />
        ;
      </View>
    );
  }
}

export default Cobadd;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    alignItems: 'center',
  },
});

// npm install react-native-select-dropdown
// yarn add react-native-select-dropdown

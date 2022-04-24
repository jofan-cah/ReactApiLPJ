import React, {Component} from 'react';
import {
  Text,
  TextInput,
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
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      pass: '',
      pesanError: [],
    };
  }

  saveToken = async value => {
    try {
      await AsyncStorage.setItem('@tokenLogin', value);
    } catch (e) {
      // saving error
      console.log(error);
    }
  };
  prosesLogin = () => {
    fetch('https://lpj-hmpti-udb.my.id/LOGINHP', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        nim: this.state.nim,
        pass: this.state.pass,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 404) {
          this.setState({pesanError: json.messages});
          console.log(json);
        }
        if (json.status == 200) {
          this.saveToken(json.token);
          // this.setState({pesanError: json.messages});
          this.props.navigation.push('DataMahasiswa');
          ToastAndroid.show(`${json.message}`, ToastAndroid.LONG);
          console.log(json);
        }
        // json.status == 201
        //   ? Alert.alert('Sukses', 'Data mahasiswa berhasil ditambahkan')
        //   : '';
      })
      .catch(err => console.log(err))
      .finally(() => {
        // this.getDataMhs();
        // this.setState({nim: ''});
        // this.setState({nama: ''});
        // this.setState({alamat: ''});
        // this.setState({telp: ''});
      });
  };
  render() {
    return (
      <View
        style={{
          backgroundColor: '#38ef7d',
          flex: 1,
        }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text
            style={{
              color: '#fff',
              fontSize: 50,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>
            Form Login
          </Text>
          {this.state.pesanError ? (
            <Text
              style={{
                fontWeight: 'bold',
                color: '#11998e',
                marginHorizontal: 20,
                // marginVertical: 20,
                textAlign: 'center',
              }}>
              {this.state.pesanError.error}
            </Text>
          ) : (
            ''
          )}
        </View>
        <View style={{flex: 1}}>
          <TextInput
            value={this.state.nim}
            placeholder="Masukan Nim"
            placeholderTextColor={'gray'}
            onChangeText={value => this.setState({nim: value})}
            style={{
              color: '#fff',
              borderBottomWidth: 2,
              borderColor: '#fff',
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            // secureTextEntry={true}
          />
          {/* Passwrd */}
          <TextInput
            value={this.state.pass}
            placeholder="Masukan Password"
            placeholderTextColor={'gray'}
            onChangeText={value => this.setState({pass: value})}
            style={{
              color: '#fff',
              borderBottomWidth: 2,
              borderColor: '#fff',
              marginHorizontal: 20,
              marginVertical: 15,
            }}
            secureTextEntry={true}
          />

          <TouchableOpacity
            style={{
              backgroundColor: '#11998e',
              marginHorizontal: 20,
              paddingVertical: 15,
              borderRadius: 20,
              marginTop: 10,
              elevation: 5,
            }}
            onPress={() => this.prosesLogin()}>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                fontWeight: 'bold',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

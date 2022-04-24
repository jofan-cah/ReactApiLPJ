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
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';

class FormTMahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: '',
      nama: '',
      telp: '',
      alamat: '',
    };
  }

  saveDataMhs = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch('https://lpj-hmpti-udb.my.id/API/kirimLPJ/inputM', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token_key,
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        nim: this.state.nim,
        nama: this.state.nama,
        alamat: this.state.alamat,
        telp: this.state.telp,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.status == 401) {
          ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          this.props.navigation.push('Login');
          console.log(json);
        } else {
          this.props.navigation.push('DataMahasiswa');
          Alert.alert('Sukses', 'Data mahasiswa berhasil ditambahkan');
        }
      })
      .catch(err => console.log(err))
      .finally(() => {
        this.getDataMhs();
        this.setState({nim: ''});
        this.setState({nama: ''});
        this.setState({alamat: ''});
        this.setState({telp: ''});
      });
  };
  componentDidMount() {
    this.getDataMhs();
    //this.GetDataByAxios()
  }
  getDataMhs = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch('https://lpj-hmpti-udb.my.id/API/KirimLPJ/show', {
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
          this.setState({dataMhs: json});
          // ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          // this.props.navigation.push('Login');
          console.log(json);
        }
      })
      .catch(err => console.log(err));
  };
  render() {
    return (
      <View style={style.container}>
        <LinearGradient colors={['#11998e', '#38ef7d']} style={style.header}>
          <TouchableOpacity
            style={{
              textAlign: 'center',
            }}
            onPress={() => this.props.navigation.goBack()}>
            {/* <FontAwesome5 name={'circle'} solid color="#fff" size={40} /> */}
            <FontAwesome5
              name="arrow-alt-circle-left"
              solid
              color="#fff"
              size={40}
            />
          </TouchableOpacity>
          <Text style={style.textHeader}>Form Tambah Mahasiswa</Text>
          <Text>
            {' '}
            <FontAwesome5
              name="arrow-alt-circle-right"
              solid
              color="#fff"
              size={40}
            />
          </Text>
        </LinearGradient>
        <View style={style.isi}>
          <View
            style={{
              marginTop: 20,
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <TextInput
              style={style.textInput}
              value={this.state.nim}
              keyboardType="number-pad"
              onChangeText={value => this.setState({nim: value})}
              //  onChangeText ={(value) =>this.setState({nim:value})}

              placeholder="Masukan NIM"
              placeholderTextColor="#000"
            />
            <TextInput
              style={style.textInput}
              value={this.state.nama}
              onChangeText={value => this.setState({nama: value})}
              placeholder="Masukan Nama"
              placeholderTextColor="#000"
            />
            <TextInput
              style={style.textInput}
              value={this.state.telp}
              keyboardType="phone-pad"
              onChangeText={value => this.setState({telp: value})}
              placeholder="Masukan Telpon"
              placeholderTextColor="#000"
            />
            <TextInput
              style={style.textInput}
              value={this.state.alamat}
              onChangeText={value => this.setState({alamat: value})}
              placeholder="Masukan Alamat"
              placeholderTextColor="#000"
            />
          </View>
          <View
            style={{
              paddingVertical: 2,
              paddingHorizontal: 10,
            }}>
            <TouchableOpacity
              style={style.buttonSimpan}
              onPress={() => this.saveDataMhs()}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  padding: 3,
                  fontWeight: 'bold',
                }}>
                Simpan <FontAwesome5 name="save" solid color="#fff" size={20} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default FormTMahasiswa;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flex: 0.5,
    backgroundColor: 'red',
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    elevation: 8,
  },
  textHeader: {
    fontSize: 20,
    // marginLeft:3,
    color: '#fff',
    fontWeight: 'bold',
  },
  isi: {
    flex: 3,
    // backgroundColor: '',
    // alignItems: 'center',
  },
  textInput: {
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  buttonSimpan: {
    borderColor: '#11998e',
    backgroundColor: '#11998e',
    borderWidth: 2,
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 10,

    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

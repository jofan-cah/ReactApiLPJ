import React, {Component} from 'react';
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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

class DetailMahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nim: this.props.route.params.nim,
      //   dataDetail: [],
    };
  }
  componentDidMount() {
    this.getDetail();
    //this.GetDataByAxios()
  }
  delMhs = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch(
      'https://lpj-hmpti-udb.my.id/API/KirimLPJ/deleteM/' + this.state.nim,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token_key,
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json.status == 401) {
          ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          this.props.navigation.push('Login');
          console.log(json);
        } else {
          console.log(json);
          ToastAndroid.show(
            `Data dengan Nomer Nim ${this.state.nim} berhasil Di Hapus`,
            ToastAndroid.SHORT,
          );
          this.props.navigation.push('DataMahasiswa');
        }
      })

      .catch(err => console.log(err));
  };

  updateMhs = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch(
      'https://lpj-hmpti-udb.my.id/API/kirimLPJ/updateM/' + this.state.nim,
      {
        method: 'PUT',
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
      },
    )
      .then(response => response.json())
      .then(json => {
        if (json.status == 401) {
          ToastAndroid.show(`${json.msg}`, ToastAndroid.LONG);
          this.props.navigation.push('Login');
          console.log(json);
        } else {
          console.log(json);
          ToastAndroid.show(
            `Data dengan Nomer Nim ${this.state.nim} berhasil Di update`,
            ToastAndroid.SHORT,
          );
          this.props.navigation.push('DataMahasiswa');
        }
      })
      .catch(err => console.log(err));
  };
  getDetail = async () => {
    let token_key = await AsyncStorage.getItem('@tokenLogin');
    fetch('https://lpj-hmpti-udb.my.id/API/kirimLPJ/tampil/' + this.state.nim, {
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
          this.setState({dataDetail: json[0]});
          console.log(json);
          this.setState({nama: this.state.dataDetail.nama});
          this.setState({alamat: this.state.dataDetail.alamat});
          this.setState({telp: this.state.dataDetail.telp});
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
          <Text style={style.textHeader}>Detail Mahasiswa</Text>
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
          <View style={style.VtextInput}>
            <TextInput
              value={this.state.nim}
              editable={false}
              style={style.textInput}
            />
            <TextInput
              value={this.state.nama}
              // editable={false}
              onChangeText={value => this.setState({nama: value})}
              style={style.textInput}
            />
            <TextInput
              value={this.state.alamat}
              // editable={false}
              onChangeText={value => this.setState({alamat: value})}
              style={style.textInput}
            />
            <TextInput
              value={this.state.telp}
              // editable={false}
              onChangeText={value => this.setState({telp: value})}
              style={style.textInput}
            />
          </View>

          <View style={style.Vtombol}>
            <TouchableOpacity
              style={style.tEndit}
              onPress={() => this.updateMhs()}>
              <FontAwesome5 solid color="#fff" name="edit" />
              <Text style={style.ttext}> Perbarui </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.tHapus}
              onPress={() =>
                Alert.alert('Warning', 'Yakin ! , AKan menghapusdata ini ?', [
                  {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => null,
                  },
                  {
                    text: 'Hapus',
                    style: 'hapus',
                    onPress: () => this.delMhs(),
                  },
                ])
              }>
              <FontAwesome5 solid color="#fff" name="trash" />
              <Text style={style.ttext}> Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default DetailMahasiswa;

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flex: 0.5,
    backgroundColor: 'red',
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    elevation: 8,
  },
  textHeader: {
    fontSize: 30,
    // marginLeft:3,
    color: '#fff',
    fontWeight: 'bold',
  },
  isi: {
    flex: 3,
    // backgroundColor: '',
    // alignItems: 'center',
  },
  tombolTambah: {
    alignItems: 'center',
    backgroundColor: '#38ef7d',
    justifyContent: 'center',
    marginTop: 20,
    width: 50,
    borderRadius: 100,
    paddingVertical: 4,
  },
  kotak: {
    width: 'auto',
    marginTop: 10,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: 'green',
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
  },
  textNama: {
    fontWeight: 'bold',
    fontSize: 16,
    fontFamily: 'RobotoMono-Regular',
  },
  textInput: {
    borderBottomWidth: 2,
    borderColor: '#000',
    marginTop: 10,
    marginHorizontal: 20,
  },
  VtextInput: {
    // borderBottomWidth:2,
    // borderColor:'#000',
    marginTop: 10,
    // marginHorizontal:20
  },
  Vtombol: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20,
  },
  tEndit: {
    backgroundColor: '#00b0ff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  tHapus: {
    backgroundColor: '#c62828',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    elevation: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ttext: {
    fontWeight: 'bold',
    color: '#fff',
  },
});

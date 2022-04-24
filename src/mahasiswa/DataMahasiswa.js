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
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
class DataMahasiswa extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataMhs: [],
      // refresh: false,
    };
  }
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
          <Text
            style={{
              textAlign: 'center',
            }}>
            {/* <FontAwesome5 name={'circle'} solid color="#fff" size={40} /> */}
            <FontAwesome5
              name="arrow-alt-circle-left"
              solid
              color="#fff"
              size={40}
            />
          </Text>
          <Text style={style.textHeader}>Data Mahasiswa</Text>
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
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity
              style={style.tombolTambah}
              onPress={() => this.props.navigation.navigate('FormTMahasiswa')}>
              {/* Tombol Tambah */}
              <FontAwesome5 name="plus-circle" solid color="#fff" size={40} />
            </TouchableOpacity>
          </View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refresh}
                onRefresh={() => (
                  this.getDataMhs(), this.setState({refresh: false})
                )}
              />
            }
            data={this.state.dataMhs}
            keyExtractor={item => item.nim}
            renderItem={({item, index}) => (
              <View style={style.kotak}>
                <View>
                  <Text
                    style={{fontSize: 20, color: '#000', fontWeight: 'bold'}}>
                    {' '}
                    Nim : {item.nim}{' '}
                  </Text>
                  <Text style={style.textNama}> Nama : {item.nama} </Text>
                </View>
                <View>
                  <TouchableOpacity
                    style={{alignItems: 'center', justifyContent: 'center'}}
                    onPress={() =>
                      this.props.navigation.navigate('DetailMahasiswa', {
                        nim: item.nim,
                      })
                    }>
                    <FontAwesome5
                      name="angle-double-right"
                      solid
                      color="#38ef7d"
                      size={40}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    );
  }
}

export default DataMahasiswa;

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
});

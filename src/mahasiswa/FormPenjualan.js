import {View, TextInput, Text} from 'react-native';
import React, {Component} from 'react';

class FormPenjualan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // const [id, setid] = useState();
    // const [nama, setnama] = useState();
    // const [alamat, setalm] = useState();
    // const [umur, setumr] = useState();
    // const hasilid = teks => {
    //   setid(teks);
    // };
    // const hasilnama = teks => {
    //   setnama(teks);
    // };
    // const hasilalm = teks => {
    //   setalm(teks);
    // };
    // const hasilumr = teks => {
    //   setumr(teks);
    // };
  }
  render() {
    return (
      <View>
        <Text>Form Penjualan</Text>
        <Text>Id Member</Text>
      </View>
    );
  }
}

export default FormPenjualan;

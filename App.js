import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DataMahasiswa from './src/mahasiswa/DataMahasiswa';
// import formtambahMahasiswa from './src/mahasiswa/formtambahMahasiswa';
import FormTMahasiswa from './src/mahasiswa/FormTMahasiswa';
import DetailMahasiswa from './src/mahasiswa/DetailMahasiswa';
import FormPenjualan from './src/mahasiswa/FormPenjualan';
import Splash from './src/mahasiswa/Splash';
import Cobadd from './src/mahasiswa/Cobadd';
import Login from './src/Login';
const Stack = createNativeStackNavigator();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DataMahasiswa"
            component={DataMahasiswa}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Cobadd"
            component={Cobadd}
            options={{
              headerShown: false,
            }}
          />

          <Stack.Screen
            name="Splash"
            component={Splash}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FormTMahasiswa"
            component={FormTMahasiswa}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="DetailMahasiswa"
            component={DetailMahasiswa}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="FormPenjualan"
            component={FormPenjualan}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
export default App;

// import React, {useState} from 'react';
// import {View, TextInput, Text} from 'react-native';
// import SelectDropdown from 'react-native-select-dropdown';

// export default function App() {
//   //deklarasi variabel
//   const [id, setid] = useState();
//   const [nama, setnama] = useState();
//   const [alamat, setalamat] = useState();
//   const [umur, setumur] = useState();
//   const countries = ['Egypt', 'Canada', 'Australia', 'Ireland'];
//   const hasilid = text => {
//     setid(text);
//   };
//   const hasilnama = text => {
//     setnama(text);
//   };
//   const hasilalamat = text => {
//     setalamat(text);
//   };
//   const hasilumur = text => {
//     setumur(text);
//   };
//   return (
//     <View>
//       <SelectDropdown
//         data={countries}
//         onSelect={(selectedItem, index) => {
//           console.log(selectedItem, index);
//         }}
//         buttonTextAfterSelection={(selectedItem, index) => {
//           // text represented after item is selected
//           // if data array is an array of objects then return selectedItem.property to render after item is selected
//           return selectedItem;
//         }}
//         rowTextForSelection={(item, index) => {
//           // text represented for each item in dropdown
//           // if data array is an array of objects then return item.property to represent item in dropdown
//           return item;
//         }}
//       />
//     </View>
//   );
// }

// import React, {Component} from 'react';
// import {View, Text} from 'react-native';
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
//   MenuProvider,
// } from 'react-native-popup-menu';

// export default class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   render() {
//     return (
//       <MenuProvider>
//         <View>
//           <Menu>
//             <MenuTrigger text="Select action" />
//             <MenuOptions>
//               <MenuOption onSelect={() => alert(`Save`)} text="Save" />
//               <MenuOption onSelect={() => alert(`Delete`)}>
//                 <Text style={{color: 'red'}}>Delete</Text>
//               </MenuOption>
//               <MenuOption
//                 onSelect={() => alert(`Not called`)}
//                 disabled={true}
//                 text="Disabled"
//               />
//             </MenuOptions>
//           </Menu>
//         </View>
//       </MenuProvider>
//     );
//   }
// }

// import React, {useState} from 'react';
// import {View, StyleSheet} from 'react-native';
// import {Picker} from '@react-native-picker/picker';
// const App = () => {
//   const [selectedValue, setSelectedValue] = useState('');
//   return (
//     <View style={styles.container}>
//       <Picker
//         selectedValue={selectedValue}
//         style={{height: 50, width: 150}}
//         onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
//         <Picker.Item label="Java" value="java" />
//         <Picker.Item label="JavaScript" value="js" />
//       </Picker>
//     </View>
//   );
// };

// export default App;

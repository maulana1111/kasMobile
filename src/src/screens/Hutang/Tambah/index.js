import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  Image,
  TextInput,
  StatusBar,
} from 'react-native';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import SQLite from 'react-native-sqlite-storage';
import Input from '../components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {SegmentedControls} from 'react-native-radio-buttons';
import DatePicker from 'react-native-datepicker';
var {width} = Dimensions.get('window');

// var db = SQLite.openDatabase(
//   {name: 'buku.db', createFromLocation: 1},
//   () => {
//     console.log('Database OPENED');
//   },
//   (err) => {
//     console.log('SQL Error: ' + err);
//   },
// );
export default class HutangTambahScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG(true);
    this.state = {
      counter: 0,
      isLoading: false,
      message: '',
      email: '',
      password: '',
    };
  }
  // componentDidMount() {
  //   db.transaction((tx) => {
  //     tx.executeSql('SELECT * FROM users;', [], (tx, results) => {
  //       const rows = results.rows;
  //       let users = [];

  //       for (let i = 0; i < rows.length; i++) {
  //         users.push({
  //           ...rows.item(i),
  //         });
  //       }
  //       console.log(users);

  //       // this.setState({ users });
  //     });
  //   });
  // }

  componentWillUnmount() {
    db.close();
  }
  LoginACt = () =>
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
        ['apah', 'apah2', 'apah3'],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'You are Registered Successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => console.log('HomeScreen'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Registration Failed');
          }
        },
      );
      console.log('press');
    });
  // LoginACt = async () => {
  //   this.props.route.params._setLoggedIn(true);
  //   this.props.navigation.navigate('SetUpScreen');
  // };
  registerACt() {
    this.props.navigation.navigate('RegisterScreen');
  }

  render() {
    const {message, isLoading} = this.state;
    const options = [
      {label: 'Penjualan', value: 'Do'},
      {label: 'Pengeluaran', value: 'You'},
    ];
    const options2 = [
      {label: 'Lunas', value: 'Do'},
      {label: 'Belum Lunas', value: 'You'},
    ];
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#fed400" barStyle="light-content" />
        {/* <View style={styles.header} /> */}
        {/* <Text style={styles.des}>Transaksi Screen</Text> */}
        <View
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            backgroundColor: '#fff',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <View style={{marginTop: 10, padding: 20}}>
            <SegmentedControls
              tint={'#00c27b'}
              selectedTint={'white'}
              backTint={'#fff'}
              default={'You'}
              // eslint-disable-next-line react-native/no-inline-styles
              optionStyle={{
                fontSize: 14,
                fontWeight: 'bold',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
              }}
              options={options}
              // onSelection={setSelectedOption.bind(this)}
              selectedOption={this.state.selectedCustomSegment}
              extractText={(option) => option.label}
              testOptionEqual={(a, b) => {
                if (!a || !b) {
                  return false;
                }
                return a.label === b.label;
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <MaterialCommunityIcons
              name="currency-usd"
              color={'#00c27b'}
              size={26}
              style={{marginLeft: 7}}
            />

            <TextInput
              style={{flex: 1}}
              placeholder="Masukan Nominal Penjualan"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.SectionStyle}>
            <MaterialCommunityIcons
              name="clipboard-text-outline"
              color={'#c9d1c9'}
              size={26}
              style={{marginLeft: 7}}
            />

            <TextInput
              style={{flex: 1}}
              placeholder="Catatan/Keterangan"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.SectionStyle}>
            <View style={{flex: 1}}>
              <MaterialCommunityIcons
                name="calendar-month"
                color={'#c9d1c9'}
                size={26}
                style={{marginLeft: 7}}
              />
            </View>
            <View>
              <DatePicker
                style={{width: 200}}
                date={this.state.date}
                mode="date"
                placeholder="Pilih Tanggal"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                showIcon={false}
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: -22,
                  },
                  placeholderText: {
                    fontSize: 14,
                    color: '#cfcfcf',
                  },
                  dateText: {
                    color: '#c7c8ca',
                    justifyContent: 'flex-start',
                  },
                  dateInput: {
                    marginLeft: -113,
                    borderColor: 'rgba(158, 150, 150, .0)',
                    alignItems: 'flex-start',
                  },
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {
                  this.setState({date: date});
                }}
              />
            </View>
          </View>
          <View style={{marginTop: -30, padding: 20}}>
            <SegmentedControls
              tint={'#fed400'}
              selectedTint={'white'}
              backTint={'#fff'}
              default={'You'}
              // eslint-disable-next-line react-native/no-inline-styles
              optionStyle={{
                fontSize: 14,
                fontWeight: 'bold',
              }}
              // eslint-disable-next-line react-native/no-inline-styles
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
              }}
              options={options2}
              // onSelection={setSelectedOption.bind(this)}
              selectedOption={this.state.selectedCustomSegment}
              extractText={(option) => option.label}
              testOptionEqual={(a, b) => {
                if (!a || !b) {
                  return false;
                }
                return a.label === b.label;
              }}
            />
          </View>
          <View style={styles.SectionStyle}>
            <MaterialCommunityIcons
              name="account"
              color={'#c9d1c9'}
              size={26}
              style={{marginLeft: 7}}
            />

            <TextInput
              style={{flex: 1}}
              placeholder="Nama Pelanggan"
              underlineColorAndroid="transparent"
            />
          </View>
          <View style={styles.SectionStyle}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => this.LoginACt()}>
              <Text style={styles.txtSignIn}>Simpan Transaksi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f6f3',
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#cfcfcf',
    height: 40,
    borderRadius: 5,
    margin: 30,
    marginTop: -3,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: 'stretch',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    marginTop: getStatusBarHeight(true),
    marginLeft: 32,
    marginRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    marginTop: width * 0.2 * 2.16,
    alignSelf: 'center',
    width: width * 0.5,
    height: width * 0.2 * 2.16,
  },
  containerSignIn: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginTop: 24,
  },
  title: {
    color: '#1A051D',
    fontSize: 24,
    fontWeight: '500',
    marginTop: 32,
    alignSelf: 'center',
  },
  des: {
    color: '#6D5F6F',
    textAlign: 'center',
    marginTop: 7,
  },
  box: {
    marginHorizontal: 32,
    borderRadius: 6,
    backgroundColor: '#F7F8F9',
    padding: 24,
  },
  titleBox: {
    textTransform: 'uppercase',
    color: '#3F3356',
    fontSize: 12,
    fontWeight: '500',
  },
  desBox: {
    color: '#ABA4AC',
    fontSize: 14,
    marginTop: 9,
  },
  valueBox: {
    color: '#1A051D',
    fontSize: 14,
    marginTop: 9,
  },
  btnSignUp: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: getBottomSpace(),
  },
  txtSignUp: {
    fontSize: 12,
    color: '#0F4C81',
    fontWeight: '500',
  },
  btnSignIn: {
    backgroundColor: '#fed400',
    borderRadius: 24,
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSignIn: {
    fontWeight: '600',
    color: '#000',
    fontSize: 17,
  },
});

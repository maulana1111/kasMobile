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
} from 'react-native';
import SvgLogo from '../../svgs/forgotPass/SvgLogo';
import SvgClose from '../../svgs/forgotPass/SvgClose';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import SvgLogoKey from '../../svgs/forgotPass/SvgLogoKey';
import Input from '../../screens/Bisnis/components/Input';
import SQLite from 'react-native-sqlite-storage';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var {width} = Dimensions.get('window');
export default class HutangScreen extends React.Component {
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
    return (
      <View style={styles.container}>
        <View style={styles.header} />
        <Image
          resizeMode="cover"
          source={require('../assets/image/anim_search.png')}
          style={styles.logo}
        />
        <Text style={styles.des}>Ketuk + Untuk membuat Hutang</Text>
        {/* <View style={[styles.box, {marginTop: 40}]}>
          <Text style={styles.titleBox}>Nama Bisnis</Text>
          <Input
            mt={40}
            onChangeText={(value) => this.setState({nama: value})}
            placeholder={'Masukan Nama Bisnis'}
          />
          <View style={styles.containerSignIn}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => {
                this.LoginACt();
              }}>
              <Text style={styles.txtSignIn}>Simpan</Text>
            </TouchableOpacity>
          </View>
        </View> */}
        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#f5e042"
            title="Tambah Transaksi"
            onPress={() =>
              this.props.navigation.navigate('TransaksiTambahScreen')
            }>
            <MaterialCommunityIcons name="plus" color={'#000'} size={26} />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="All Tasks"
            onPress={() => {}}>
            <MaterialCommunityIcons name="text-box" color={'#000'} size={26} />
          </ActionButton.Item>
        </ActionButton>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    backgroundColor: '#5EA7FF',
    borderRadius: 24,
    flex: 1,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSignIn: {
    fontWeight: '600',
    color: '#FFF',
    fontSize: 17,
  },
});

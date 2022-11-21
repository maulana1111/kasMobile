import React, {memo, useCallback, Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Header from '../../screens/SiginIn/components/Header';
import Input from '../../screens/SiginIn/components/Input';
import {Montserrat} from '../../utils/fonts';
import api from '../service';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      nama: '',
      hp: '',
      password: '',
      isLoading: false,
      message: '',
    };
  }
  signUp = async () => {
    try {
      this.setState({isLoading: true});
      const response = await api.post('/auth/register', {
        email: this.state.email,
        nama: this.state.nama,
        hp: this.state.hp,
        password: this.state.password,
      });
      ToastAndroid.show(response.data.message, 30)
      this.setState({
        message: response.data.message,
      });
      this.props.navigation.navigate('LoginScreen');

      this.setState({isLoading: false});
    } catch (err) {
      this.setState({
        message: err.data.message,
        isLoading: false,
      });
    }
  };
  LoginACt(){
    this.props.navigation.navigate('LoginScreen');
  }
  render() {
    const {isLoading, message} = this.state;
    return (
      <View style={styles.container}>
        <Header />
        <KeyboardAwareScrollView
          style={{backgroundColor: '#fff'}}
          scrollEnabled={true}>
          <Input
            mt={40}
            onChangeText={(value) => this.setState({email: value})}
            placeholder={'Email'}
          />
          <Input
            mt={16}
            onChangeText={(value) => this.setState({nama: value})}
            placeholder={'Nama Lengkap'}
          />
          <Input
            mt={16}
            onChangeText={(value) => this.setState({hp: value})}
            placeholder={'No Hp'}
          />
          <Input
            mt={16}
            onChangeText={(value) => this.setState({password: value})}
            pass={true}
            placeholder={'Password'}
          />
          {message == '' ? (
            <View />
          ) : (
            <View
              style={{justifyContent: 'center', marginLeft: 45, marginTop: 12}}>
              <Text style={{...styles.txtSignUp, color: 'red', fontSize: 14}}>
                {message}
              </Text>
            </View>
          )}

          <View style={styles.containerSignIn}>
            {isLoading ? (
              <TouchableOpacity
                style={styles.btnSignIn}
                onPress={() => this.signUp()}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnSignIn}
                onPress={() => this.signUp()}>
                <Text style={styles.txtSignIn}>Daftar</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => this.LoginACt()}>
            <Text style={styles.txtSignUp}>Login Sekarang</Text>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <View style={styles.containerOr} />
      </View>
    );
  }
}
export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  containerSignIn: {
    flexDirection: 'row',
    marginHorizontal: 40,
    marginTop: 24,
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
    fontFamily: Montserrat,
    fontWeight: '600',
    color: '#FFF',
    fontSize: 17,
  },
  btnFaceId: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#6979F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  btnForgot: {
    marginTop: 24,
    alignSelf: 'center',
  },
  txtForgot: {
    fontSize: 12,
    color: '#0F4C81',
    fontFamily: Montserrat,
    fontWeight: '500',
  },
  containerOr: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginTop: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  txtOr: {
    marginHorizontal: 20,
    fontSize: 16,
    color: '#1A051D',
    fontFamily: Montserrat,
    fontWeight: 'normal',
  },
  btnSignFb: {
    marginHorizontal: 40,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6979F8',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtSignInFb: {
    fontWeight: '600',
    fontSize: 17,
    color: '#FFF',
    textTransform: 'uppercase',
  },
  btnSignInGoogle: {
    marginHorizontal: 40,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF647C',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSignUp: {
    alignSelf: 'center',
    marginTop: 20,
  },
  txtSignUp: {
    fontSize: 12,
    color: '#0F4C81',
    fontFamily: Montserrat,
    fontWeight: '500',
  },
});

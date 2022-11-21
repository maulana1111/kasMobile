import React, {memo, useCallback, Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import Header from '../../screens/SiginIn/components/Header';
import Input from '../../screens/SiginIn/components/Input';
import {Montserrat} from '../../utils/fonts';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import api from '../service';

class SignIn extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      isLoading: false,
      message: '',
      email: '',
      password: '',
    };
  }
  LoginACt = async () => {
    this.props.route.params._setLoggedIn(true);
    this.props.navigation.navigate('TransaksiScreen');
  };
  registerACt() {
    this.props.navigation.navigate('RegisterScreen');
  }
  render() {
    const {message, isLoading} = this.state;
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
                onPress={() => this.LoginACt()}>
                <ActivityIndicator size="small" color="#fff" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.btnSignIn}
                onPress={() => this.LoginACt()}>
                <Text style={styles.txtSignIn}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity
            style={styles.btnSignUp}
            onPress={() => this.registerACt()}>
            <Text style={styles.txtSignUp}>
              Belum punya akun? Daftar Sekarang
            </Text>
          </TouchableOpacity>
          <View style={styles.containerOr} />
        </KeyboardAwareScrollView>
      </View>
    );
  }
}
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
export default SignIn;


import React, {memo, useCallback, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from '../../utils/fonts';
import SvgClose from '../../svgs/notification/SvgClose';
import SvgActive from '../../svgs/notification/SvgActive';
import Input from '../../screens/SiginIn/components/Input';
import api from '../../screens/service';

class SpdpScreen extends Component {
  constructor() {
    super();
    this.state = {
      spdptxt: '',
      hasil: [],
    };
  }
  SpdpAct = async () => {
    try {
      this.setState({isLoading: true});
      const response = await api.post('/main/spdp', {
        keyword: this.state.spdptxt,
      });
      this.setState({hasil: response.data.data, isLoading: false});
    } catch (err) {
      this.setState({
        message: err.data.message,
        isLoading: false,
      });
    }
  };
  renderItem = ({item}) => {
    return (
      <View style={styles.item}>
        <Image
          // eslint-disable-next-line react-native/no-inline-styles
          style={styles.avatar}
          source={require('../../assets/images/ic_letter.png')}
        />
        <Text style={styles.des}>{item.identitas_tersangka}</Text>
        <Text style={styles.time}>No SPDP : {item.no_spdp}</Text>
        <Text style={styles.time}>Sp sidik : {item.sp_sidik}</Text>
        <Text style={styles.time}>Pasal : {item.pasal}</Text>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate('SpdpdetailScreen', {
              spdptxt: item,
            })
          }
          style={styles.btnFlow}>
          <Text style={styles.txtFlow}>Lihat</Text>
        </TouchableOpacity>
        <SvgActive style={styles.svgActive} />
      </View>
    );
  };
  render() {
    const {hasil} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headeratas}>
          <Text style={styles.titleAtas}>SPDP Online</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('HomeScreen')}
            style={styles.btnClose}>
            <SvgClose />
          </TouchableOpacity>
        </View>
        <View style={styles.header}>
          {/* <Text style={styles.title}>SPDP Online</Text> */}
          <View
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              width: 320,
              marginLeft: -38,
              marginHorizontal: 20,
              marginTop: -44,
            }}>
            <Input
              mt={5}
              onChangeText={(value) => this.setState({spdptxt: value})}
              placeholder={'SPDP/01/VII/2021/XXX'}
            />
          </View>
          <View
            style={{width: 80, height: 45, marginTop: -44, marginLeft: -52}}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => this.SpdpAct()}>
              <Text style={styles.txtSignIn}>Cari</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FlatList data={hasil} renderItem={this.renderItem} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  headeratas: {
    backgroundColor: '#5EA7FF',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    height: 56,
    paddingTop: getStatusBarHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    height: 96,
    flexDirection: 'row',
    paddingTop: getStatusBarHeight(),
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
  },
  titleAtas: {
    fontFamily: Montserrat,
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 38,
  },
  title: {
    fontFamily: Montserrat,
    fontSize: 17,
    color: '#000',
    fontWeight: 'bold',
  },
  btnClose: {
    position: 'absolute',
    bottom: 20,
    left: 16,
  },
  btnOption: {
    position: 'absolute',
    bottom: 20,
    right: 16,
  },
  item: {
    marginHorizontal: 16,
    marginTop: 16,
    backgroundColor: '#FFF',
    paddingLeft: 80,
    paddingTop: 20,
    paddingBottom: 16,
    borderRadius: 16,
  },
  avatar: {
    width: 45,
    height: 45,
    position: 'absolute',
    top: 16,
    left: 16,
  },
  name: {
    fontFamily: Montserrat,
    fontWeight: '600',
    fontSize: 16,
    color: '#1A051D',
  },
  des: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  time: {
    fontSize: 14,
    fontFamily: Lato,
    color: '#6D5F6F',
    marginTop: 4,
  },
  btnFlow: {
    width: 120,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(105,121,248,0.1)',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtFlow: {
    fontFamily: Montserrat,
    fontSize: 13,
    color: '#6979F8',
  },
  svgActive: {
    position: 'absolute',
    top: 33,
  },
  btnSignIn: {
    backgroundColor: '#f2bc35',
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
});
export default SpdpScreen;


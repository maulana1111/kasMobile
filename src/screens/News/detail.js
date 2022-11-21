import React, {memo, useCallback, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from '../../utils/fonts';
import SvgClose from '../../svgs/notification/SvgClose';
import SvgClient1 from '../../svgs/profile/SvgClient1';
import Input from '../../screens/SiginIn/components/Input';
import api from '../../screens/service';
import HTML from 'react-native-render-html';

class SpdpDetailScreen extends Component {
  constructor() {
    super();
    this.state = {
      spdptxt: '',
      hasil: [],
    };
  }
  render() {
    const {hasil} = this.state;
    const berita = this.props.route.params.beritaTxt;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('HomeScreen')}
          style={styles.back}>
          <SvgClose />
        </TouchableOpacity>

        <ScrollView>
          {/* <Image style={styles.avatar} /> */}
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.avatar}
            source={require('../../assets/images/ic_letter.png')}
          />
          <Text style={styles.name}>Nannie Williams</Text>
          <Text style={styles.job}>Senior Maketer</Text>

          <View style={styles.content}>
            <Text style={styles.titleContent}>{berita.title.rendered}</Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              <HTML
                source={{html: berita.content.rendered}}
                contentWidth={10}
              />
            </Text>
          </View>
          <TouchableOpacity
            style={styles.btnUpdate}
            onPress={() => this.props.navigation.navigate('HomeScreen')}>
            <Text style={styles.txtUpdate}>Kembali</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8F9',
  },
  avatar: {
    marginTop: getStatusBarHeight(true) + 10,
    alignSelf: 'center',
    width: 70,
    height: 70,
  },
  back: {
    position: 'absolute',
    left: 16,
    top: getStatusBarHeight(true) + 10,
  },
  noti: {
    position: 'absolute',
    right: 16,
    top: getStatusBarHeight(true) + 10,
  },
  name: {
    fontFamily: Montserrat,
    fontWeight: '500',
    fontSize: 18,
    color: '#1A051D',
    textAlign: 'center',
    marginTop: 8,
  },
  job: {
    fontFamily: Montserrat,
    fontSize: 14,
    color: '#6D5F6F',
    textAlign: 'center',
    marginTop: 8,
  },
  btnUpdate: {
    width: 160,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#0084F4',
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  txtUpdate: {
    fontFamily: Montserrat,
    fontSize: 13,
    color: '#FFF',
  },
  containerInfo: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 32,
  },
  col: {
    alignItems: 'center',
    flex: 1,
  },
  value: {
    fontFamily: Montserrat,
    fontSize: 20,
    color: '#1A051D',
  },
  title: {
    fontFamily: Lato,
    fontSize: 12,
    color: '#6D5F6F',
  },
  line: {
    width: 1,
    backgroundColor: '#EAE8EA',
    height: 32,
  },
  content: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderBottomRightRadius: 24,
    borderBottomLeftRadius: 24,
    paddingLeft: 32,
    paddingBottom: 20,
    marginTop: 22,
  },
  titleContent: {
    fontFamily: Montserrat,
    fontSize: 16,
    color: '#1A051D',
    textTransform: 'uppercase',
    marginTop: 28,
  },
  titleWork: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: 19,
    fontFamily: Montserrat,
    fontSize: 14,
    color: '#FFF',
  },
  svgWork: {
    marginRight: 16,
  },
  client: {
    marginTop: 12,
    height: 48,
    marginBottom: 32,
  },
  work: {
    marginTop: 16,
  },
});
export default SpdpDetailScreen;


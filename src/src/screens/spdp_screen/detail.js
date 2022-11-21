import React, {memo, useCallback, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from '../../utils/fonts';
import ImageViewer from 'react-native-image-zoom-viewer';

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
    const {
      no_spdp,
      dasar_lp,
      sp_sidik,
      pasal,
      identitas_tersangka,
      keterangan,
      lampiran_file,
      created_at,
    } = this.props.route.params.spdptxt;
    const Lampiran = [
      {
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
        props: {
          // headers: ...
        },
      },
    ];
    return (
      <View style={styles.container}>
        <ScrollView>
          {/* <Image style={styles.avatar} /> */}
          <Image
            // eslint-disable-next-line react-native/no-inline-styles
            style={styles.avatar}
            source={require('../../assets/images/ic_letter.png')}
          />
          <Text style={styles.name}>Berikut Adalah Infomasi SPDP</Text>
          <Text style={styles.job}>{dasar_lp}</Text>

          <View style={styles.content}>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              No SPDP
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {no_spdp}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Dasar Laporan
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {dasar_lp}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              SP Sidik
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {sp_sidik}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Pasal
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {pasal}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Identitas Tersangka
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {identitas_tersangka}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Keterangan
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {keterangan}
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Lampiran
            </Text>
            <Image
              // eslint-disable-next-line react-native/no-inline-styles
              style={{...styles.avatar, width: 350, height: 500}}
              source={{
                uri: `http://spdp.ditreskrimumpoldabali.com/login/assets/lampiran_spdp/${lampiran_file}`,
              }}
            />
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Dibuat Pada
            </Text>
            <Text
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                ...styles.titleContent,
                fontSize: 15,
                marginTop: 10,
              }}>
              {' '}
              {created_at}
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
export default SpdpDetailScreen;

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

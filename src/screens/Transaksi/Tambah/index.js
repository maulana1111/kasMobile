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
import Input from '../components/Input';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import DatePicker from 'react-native-datepicker';
import DatePicker from 'react-native-date-picker';
var {width} = Dimensions.get('window');
import SQLite from 'react-native-sqlite-storage';
import ButtonToggleGroup from 'react-native-button-toggle-group';
import {FancyAlert} from 'react-native-expo-fancy-alerts';

// var db = openDatabase({name: 'buku.db'});
var db = SQLite.openDatabase({name: 'buku.db', createFromLocation: 1});
export default class TransaksiTambahScreen extends React.Component {
  constructor() {
    super();
    SQLite.DEBUG(true);
    this.state = {
      counter: 0,
      isLoading: false,
      message: '',
      jenisTransaksi: 'Penjualan',
      status_transaksi: 'Lunas',
      nominal_transaksi: '',
      catatan_transaksi: '',
      tanggal_transaksi: '',
      nama_pelanggan: '',
      showInfo: false,
    };
  }
  simpan_transaksi = () => {
    console.log('menyimpan data');
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO tb_transaksi (jenis_transaksi ,nominal_transaksi, catatan_transaksi,tanggal_transaksi,status_transaksi,nama_pelanggan) VALUES (?,?,?,?,?,?)',
        [
          this.state.jenisTransaksi,
          this.state.nominal_transaksi,
          this.state.catatan_transaksi,
          this.state.tanggal_transaksi,
          this.state.status_transaksi,
          this.state.nama_pelanggan,
        ],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            this.setState({
              showInfo: true,
            });
          } else {
            this.setState({
              showInfo: false,
            });
          }
        },
      );
    });
  };
  onPressRadioButton(value) {
    console.log(value.selected);
  }
  onChangedNominal(text) {
    this.setState({
      nominal_transaksi: text.replace(/[^0-9]/g, ''),
    });
  }
  onChangedCatatan(text) {
    this.setState({
      catatan_transaksi: text,
    });
  }
  onChangedPelanggan(text) {
    this.setState({
      nama_pelanggan: text,
    });
  }
  onModalClose() {
    this.setState({
      showInfo: false,
    });
    this.props.navigation.navigate('TransaksiScreen');
  }
  render() {
    const {message, isLoading, showInfo} = this.state;
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
            <ButtonToggleGroup
              highlightBackgroundColor={'#00c27b'}
              highlightTextColor={'white'}
              inactiveBackgroundColor={'transparent'}
              inactiveTextColor={'black'}
              values={['Penjualan', 'Pengeluaran']}
              value={this.state.jenisTransaksi}
              onSelect={(val) =>
                this.setState({
                  jenisTransaksi: val,
                })
              }
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
              keyboardType="numeric"
              onChangeText={(text) => this.onChangedNominal(text)}
              value={this.state.nominal_transaksi}
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
              onChangeText={(text) => this.onChangedCatatan(text)}
              value={this.state.catatan_transaksi}
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
                date={this.state.tanggal_transaksi}
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
                  this.setState({tanggal_transaksi: date});
                }}
              />
            </View>
          </View>
          <View style={{marginTop: -30, padding: 20}}>
            <ButtonToggleGroup
              highlightBackgroundColor={'#fed400'}
              highlightTextColor={'white'}
              inactiveBackgroundColor={'transparent'}
              inactiveTextColor={'black'}
              values={['Lunas', 'Belum Lunas']}
              value={this.state.status_transaksi}
              onSelect={(val) =>
                this.setState({
                  status_transaksi: val,
                })
              }
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
              onChangeText={(text) => this.onChangedPelanggan(text)}
              value={this.state.nama_pelanggan}
            />
          </View>
          <View style={{...styles.SectionStyle, borderColor: '#fff'}}>
            <TouchableOpacity
              style={styles.btnSignIn}
              onPress={() => this.simpan_transaksi()}>
              <Text style={styles.txtSignIn}>Simpan Transaksi</Text>
            </TouchableOpacity>
          </View>
        </View>
        <FancyAlert
          visible={showInfo}
          icon={
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#26c281',
                borderRadius: 50,
                width: '100%',
              }}>
              <MaterialCommunityIcons name="check" color={'white'} size={26} />
            </View>
          }
          style={{backgroundColor: 'white'}}>
          <View style={styles.content}>
            <Text style={styles.contentText}>Data Berhasil Disimpan!</Text>

            <TouchableOpacity style={styles.btn} onPress={this.onModalClose.bind(this)}>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </View>
        </FancyAlert>
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
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -16,
    marginBottom: 16,
  },
  contentText: {
    textAlign: 'center',
  },
  btn: {
    borderRadius: 32,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 8,
    alignSelf: 'stretch',
    backgroundColor: '#26c281',
    marginTop: 16,
    minWidth: '50%',
  },
  btnText: {
    color: '#FFFFFF',
  },
});

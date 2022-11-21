/* eslint-disable react-native/no-inline-styles */
import React, {Component} from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  Dimensions,
  RefreshControl,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import _ from 'lodash';
import CardView from 'react-native-cardview';
import {getBottomSpace, getStatusBarHeight} from 'react-native-iphone-x-helper';
import ActionButton from 'react-native-action-button';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
var {width} = Dimensions.get('window');
import SQLite from 'react-native-sqlite-storage';
import Table from '../Component/Tabel';

// var db = openDatabase({name: 'buku.db'});
var db = SQLite.openDatabase({name: 'buku.db', createFromLocation: 1});
export default class TransaksiScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      isLoading: false,
      message: '',
      email: '',
      password: '',
      dataTransaksi: [],
      isrefreshing: false,
    };
  }
  registerACt() {
    this.props.navigation.navigate('RegisterScreen');
  }
  componentDidMount() {
    this.viewAllData();
    db.transaction((txn) => {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='tb_transaksi'",
        [],
        (tx, res) => {
          console.log('item:', res.rows.length, res);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS tb_transaksi', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS tb_transaksi(transaksi_id INTEGER PRIMARY KEY AUTOINCREMENT, jenis_transaksi INT(2), nominal_transaksi VARCHAR(90), catatan_transaksi VARCHAR(255), tanggal_transaksi VARCHAR(25), status_transaksi VARCHAR(25), nama_pelanggan VARCHAR(80))',
              [],
            );

            console.log('berhasil membuat tabel');
          }
        },
      );
    });
  }
  viewAllData() {
    console.log('menampilkan data transaksi');
    this.setState({
      isrefreshing: true,
    });
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM tb_transaksi', [], (tx, results) => {
        var dataTransaksi = [];
        for (let i = 0; i < results.rows.length; ++i) {
          dataTransaksi.push(results.rows.item(i));
        }
        console.log(dataTransaksi);
        this.setState({
          dataTransaksi: dataTransaksi,
        });
      });
    });
    this.setState({
      isrefreshing: false,
    });
  }
  deleteAll() {
    console.log('Menghapus data transaksi');
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM tb_transaksi', [], (tx, results) => {
        var dataTransaksi = [];
        for (let i = 0; i < results.rows.length; ++i) {
          dataTransaksi.push(results.rows.item(i));
        }
        this.setState({
          dataTransaksi: dataTransaksi,
        });
      });
    });
  }
  sortTable = (column) => {
    const newDirection = null === 'desc' ? 'asc' : 'desc';
    const sortedData = _.orderBy(
      this.state.dataTransaksi,
      [column],
      [newDirection],
    );
    console.log(sortedData);
    this.setState({
      dataTransaksi: sortedData,
    });
  };
  render() {
    const {message, isrefreshing, dataTransaksi} = this.state;
    const columns = ['Tanggal', 'Catatan', 'Penjualan', 'Pengeluaran'];
    return (
      <View style={styles.container}>
        <View
          style={{
            margin: 10,
            backgroundColor: '#fff',
          }}>
          <CardView
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              backgroundColor: 'white',
            }}
            cardElevation={5}
            cardMaxElevation={3}
            cornerRadius={5}
            cornerOverlap={false}>
            <View style={styles.child}>
              <View style={styles.titleView}>
                <View
                  style={[{flexDirection: 'row'}, styles.elementsContainer]}>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 185,
                      height: 50,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        ...styles.titlecard,
                        color: '#1dc288',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Rp 25.000,-
                    </Text>
                    <Text style={styles.titlecard}>Penjualan</Text>
                  </View>
                  <View style={styles.verticleLine} />
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 185,
                      height: 50,
                      backgroundColor: 'white',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        ...styles.titlecard,
                        color: '#fe574c',
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Rp 20.000,-
                    </Text>
                    <Text style={styles.titlecard}>Pengeluaran</Text>
                  </View>
                </View>
              </View>
              <View>
                <View
                  style={[{flexDirection: 'row'}, styles.elementsContainer]}>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 185,
                      height: 50,
                      backgroundColor: 'white',
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                    }}>
                    <Text
                      style={{
                        ...styles.titlecard,
                        color: '#1dc288',
                        margin: 10,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Keuntungan
                    </Text>
                  </View>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 185,
                      height: 50,
                      backgroundColor: 'white',
                      justifyContent: 'flex-end',
                      alignItems: 'flex-end',
                    }}>
                    <Text
                      style={{
                        ...styles.titlecard,
                        color: '#1dc288',
                        bottom: 19,
                        fontWeight: 'bold',
                        fontSize: 17,
                      }}>
                      Rp 22.320.000,-
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </CardView>
        </View>
        <View style={styles.header} />
        {dataTransaksi.length > 0 ? (
          <View style={styles.Tablecontainer}>
            <FlatList
              data={dataTransaksi}
              style={{width: '95%'}}
              keyExtractor={(item, index) => index + ''}
              ListHeaderComponent={
                <View style={styles.tableHeader}>
                  {columns.map((column, index) => {
                    // eslint-disable-next-line no-lone-blocks
                    {
                      return (
                        <TouchableOpacity
                          key={index}
                          style={styles.columnHeader}
                          onPress={() => this.sortTable(column)}>
                          <Text style={styles.columnHeaderTxt}>
                            {column + ' '}
                            {dataTransaksi === column && (
                              <MaterialCommunityIcons
                                name={
                                  null === 'desc'
                                    ? 'arrow-down-drop-circle'
                                    : 'arrow-up-drop-circle'
                                }
                              />
                            )}
                          </Text>
                        </TouchableOpacity>
                      );
                    }
                  })}
                </View>
              }
              stickyHeaderIndices={[0]}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      ...styles.tableRow,
                      backgroundColor: index % 2 == 1 ? '#F0FBFC' : 'white',
                    }}>
                    <Text style={{...styles.columnRowTxt, fontWeight: 'bold'}}>
                      {item.tanggal_transaksi}
                    </Text>
                    <Text style={styles.columnRowTxt}>
                      {item.catatan_transaksi}
                    </Text>
                    <Text style={styles.columnRowTxt}>
                      {item.nominal_transaksi}
                    </Text>
                    <Text style={styles.columnRowTxt}>
                      {item.nominal_transaksi}
                    </Text>
                  </View>
                );
              }}
            />
            {/* <Table
              height={'100%'}
              columnWidth={80}
              columns={columns}
              dataSource={dataTransaksi}
            /> */}
          </View>
        ) : (
          <View>
            <Image
              resizeMode="cover"
              source={require('../assets/image/anim_search.png')}
              style={styles.logo}
            />
            <Text style={styles.des}>Ketuk + Untuk membuat catatan</Text>
          </View>
        )}

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
            title="Hapus Semua Data"
            onPress={() => this.deleteAll()}>
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
  card: {
    height: 150,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 15,
    elevation: 10,
    padding: 10,
  },
  profileImg: {
    width: 30,
    height: 30,
    borderRadius: 50,
    marginRight: 10,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  child: {
    width: 390,
  },
  titleView: {
    padding: 1,
    borderBottomColor: '#e3e3e3',
    borderBottomWidth: 1,
  },
  titlecard: {
    fontSize: 13,
    color: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticleLine: {
    top: 10,
    height: '70%',
    width: 1,
    backgroundColor: '#e3e3e3',
  },
  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#37C2D0',
    borderTopEndRadius: 5,
    borderTopStartRadius: 5,
    height: 50,
  },
  tableRow: {
    flexDirection: 'row',
    height: 40,
    width: width * 1.17,
    alignItems: 'center',
  },
  columnHeader: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnHeaderTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 13,
  },
  columnRowTxt: {
    width: '20%',
    textAlign: 'center',
  },
  Tablecontainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

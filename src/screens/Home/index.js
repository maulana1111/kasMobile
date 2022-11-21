import React, {memo, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Dimensions,
  Image,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import SvgAvatar from '../../svgs/profile/SvgAvatar';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Lato, Montserrat} from '../../utils/fonts';
import SvgBack from '../../svgs/profile/SvgBack';
import SvgNoti from '../../svgs/profile/SvgNoti';
import Carousel from '../Component/Careousel';
import Icon from 'react-native-vector-icons/Ionicons';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';
import api from '../service';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize,
} from 'react-native-responsive-dimensions';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

class HomeScreen extends Component {
  constructor() {
    super();
    this.state = {
      counter: 0,
      activeIndex: 0,
      news: [],
      slideImg: [],
      images: [
        'https://source.unsplash.com/1024x768/?nature',
        'https://source.unsplash.com/1024x768/?water',
        'https://source.unsplash.com/1024x768/?girl',
        'https://source.unsplash.com/1024x768/?tree',
      ],
    };
  }
  componentDidMount() {
    this.newsSlide();
    this.getinfoProfile();
  }
  getinfoProfile = async () => {
    try {
      this.setState({isLoading: true});
      const response = await api.get('/main/slideinfo');
      let newArray = [];
      response.data.data.forEach(function (item) {
        newArray.push(item.image_url);
      });
      this.setState({
        slideImg: newArray,
      });
    } catch (response) {
      this.setState({
        slideImg: '',
      });
      this.setState({errorMessage: response.data.error, isLoading: false});
    }
  };
  newsSlide = async () => {
    try {
      this.setState({isLoading: true});
      const response = await axios.get(
        'https://ditreskrimumpoldabali.com/wp-json/wp/v2/posts',
      );
      this.setState({
        news: response.data,
        isLoading: false,
      });
      this.setState({isLoading: false});
    } catch (err) {
      this.setState({
        news: err.data.message,
        isLoading: false,
      });
    }
  };
  renderItem = ({item, index}) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.key}</Text>
      </View>
    );
  };
  render() {
    const {news, slideImg} = this.state;
    const image = {
      uri: 'https://spdp.ditreskrimumpoldabali.com/kantor.png',
    };
    const formatData = (data, numColumns) => {
      const numberOfFullRows = Math.floor(data.length / numColumns);

      let numberOfElementsLastRow = data.length - numberOfFullRows * numColumns;
      while (
        numberOfElementsLastRow !== numColumns &&
        numberOfElementsLastRow !== 0
      ) {
        data.push({key: `blank-${numberOfElementsLastRow}`, empty: true});
        numberOfElementsLastRow++;
      }

      return data;
    };
    const data = [
      {key: 'A'},
      {key: 'B'},
      {key: 'C'},
      // { key: 'K' },
      // { key: 'L' },
    ];
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={{marginBottom: 10}}>
            <ImageBackground
              source={image}
              imageStyle={{borderBottomRightRadius: 65}}
              style={styles.image}>
              <View style={styles.DarkOverlay} />
              <View style={styles.searchContainer}>
                <Text style={styles.userGreet}>Haloo, Ryan</Text>
                <Text style={styles.userText}>
                  Selamat Malam, Ada yang bisa saya bantu?
                </Text>
              </View>
              {/* <TouchableOpacity
              onPress={() => console.log('')}
              style={{
                position: 'absolute',
                top: hp('1.5%'),
                left: '5%',
              }}>
              <Icon name="menu-outline" size={hp('4%')} color="#fff" />
            </TouchableOpacity> */}

              <TouchableOpacity
                onPress={() => console.log('wa')}
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  position: 'absolute',
                  top: hp('2%'),
                  right: '5%',
                }}
              />
              <TouchableOpacity style={styles.noti}>
                <SvgNoti />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View style={styles.content}>
            <View>
              <SliderBox
                images={slideImg}
                sliderBoxHeight={180}
                onCurrentImagePressed={(index) =>
                  console.warn(`image ${index} pressed`)
                }
                circleLoop
                dotColor="#000"
                inactiveDotColor="#90A4AE"
                paginationBoxVerticalPadding={50}
                autoplay
                resizeMethod={'resize'}
                resizeMode={'cover'}
                // eslint-disable-next-line react-native/no-inline-styles
                paginationBoxStyle={{
                  position: 'absolute',
                  bottom: 0,
                  padding: 0,
                  alignItems: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                dotStyle={{
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 0,
                  padding: 0,
                  margin: 0,
                  backgroundColor: '#000',
                }}
                // eslint-disable-next-line react-native/no-inline-styles
                ImageComponentStyle={{
                  borderRadius: 15,
                  width: '97%',
                  marginTop: 5,
                }}
                imageLoadingColor="#2196F3"
              />
            </View>
            <View style={styles.client} />
            <View
              // eslint-disable-next-line react-native/no-inline-styles
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginHorizontal: 16,
                marginTop: 28,
              }}>
              <View
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  width: '100%',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate('SpdpScreen')
                    }>
                    <View
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        width: 100,
                        height: 100,
                        borderWidth: 1,
                        borderColor: '#EFEFEF',
                        borderRadius: 18,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowColor: 'black',
                        shadowOpacity: 0.96,
                        shadowOffset: {width: 0, height: 2},
                        shadowRadius: 120,
                        elevation: 3,
                        backgroundColor: 'white',
                      }}>
                      <Image
                        // eslint-disable-next-line react-native/no-inline-styles
                        style={{
                          alignContent: 'center',
                          width: 50,
                          height: 50,
                          resizeMode: 'stretch',
                        }}
                        source={require('../../assets/images/ic_spdp.png')}
                      />
                    </View>
                  </TouchableOpacity>
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    SPDP
                  </Text>
                </View>
                <View>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: '#EFEFEF',
                      borderRadius: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: 'black',
                      shadowOpacity: 0.96,
                      shadowOffset: {width: 0, height: 2},
                      shadowRadius: 120,
                      elevation: 3,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        alignContent: 'center',
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                      }}
                      source={require('../../assets/images/ic_sp2hp.png')}
                    />
                  </View>
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    SP2HP
                  </Text>
                </View>
                <View>
                  <View
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      width: 100,
                      height: 100,
                      borderWidth: 1,
                      borderColor: '#EFEFEF',
                      borderRadius: 18,
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: 'black',
                      shadowOpacity: 0.96,
                      shadowOffset: {width: 0, height: 2},
                      shadowRadius: 120,
                      elevation: 3,
                      backgroundColor: 'white',
                    }}>
                    <Image
                      // eslint-disable-next-line react-native/no-inline-styles
                      style={{
                        alignContent: 'center',
                        width: 50,
                        height: 50,
                        resizeMode: 'stretch',
                      }}
                      source={require('../../assets/images/ic_berita.png')}
                    />
                  </View>
                  <Text
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      marginTop: 5,
                    }}>
                    BERITA
                  </Text>
                </View>
              </View>
            </View>
            <View style={{marginVertical: 10}}>
              <Text style={{fontSize: 20, fontWeight: 'bold', padding: 14}}>
                Berita Terbaru
              </Text>
              <FlatList
                showsHorizontalScrollIndicator={false}
                data={news}
                horizontal={true}
                renderItem={({item}) => {
                  return (
                    <View style={{paddingBottom: 20}}>
                      <View>
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('NewsDetail',{
                              beritaTxt: item,
                            })
                          }>
                          <Image
                            source={{
                              uri: item.better_featured_image.source_url,
                            }}
                            // eslint-disable-next-line react-native/no-inline-styles
                            style={{
                              width: wp('50%'),
                              height: hp('20%'),
                              marginHorizontal: 10,
                              borderRadius: 10,
                            }}
                          />
                        </TouchableOpacity>
                        {/* <Icon
                          name="pin-outline"
                          size={20}
                          color="white"
                          style={styles.imageLocationIcon}
                        /> */}
                        <Text
                          // eslint-disable-next-line react-native/no-inline-styles
                          style={{
                            position: 'absolute',
                            width: wp('45%'),
                            left: '9%',
                            bottom: '5%',
                            color: 'white',
                            fontSize: responsiveScreenFontSize(1.8),
                          }}>
                          {item.title.rendered}
                        </Text>
                      </View>
                    </View>
                  );
                }}
              />
            </View>
            <View style={styles.work} />
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  avatar: {
    marginTop: getStatusBarHeight(true) + 10,
    alignSelf: 'center',
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
  DarkOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: 223,
    backgroundColor: '#000',
    opacity: 0.5,
    borderBottomRightRadius: 65,
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
    marginTop: 45,
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
    backgroundColor: '#fff',
    borderWidth: 0,
    // borderTopRightRadius: 23,
    borderTopLeftRadius: 23,
  },
  titleContent: {
    fontFamily: Montserrat,
    fontSize: 19,
    color: '#1A051D',
    fontWeight: 'bold',
    marginTop: 20,
    margin: 20,
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
    marginTop: -15,
    height: 0,
    marginBottom: 3,
  },
  work: {
    marginTop: 16,
  },
  icon: {
    flex: 1,
    marginVertical: 20,
  },
  item: {
    backgroundColor: '#bebebe',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    margin: 1,
    height: Dimensions.get('window').width / 3, // approximate a square
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
  },
  image: {
    width: wp('100%'),
    height: responsiveScreenHeight(25),
  },

  searchContainer: {
    paddingTop: hp('7.4%'),
    paddingLeft: wp('5%'),
  },
  userGreet: {
    fontSize: responsiveScreenFontSize(3),
    fontWeight: 'bold',
    color: 'white',
  },
  userText: {
    fontSize: responsiveScreenFontSize(1.7),
    fontWeight: 'normal',
    color: 'white',
  },
  searchBox: {
    marginTop: hp('3%'),
    backgroundColor: '#fff',
    paddingLeft: hp('2%'),
    padding: hp('1%'),
    borderTopRightRadius: 40,
    borderBottomRightRadius: 40,
    width: wp('75%'),
  },

  imageLocationIcon: {
    position: 'absolute',
    left: hp('1%'),
    bottom: hp('1%'),
  },
  imageText: {
    position: 'absolute',
    bottom: '2%',
    left: '20%',
    fontSize: hp('2.5%'),
    color: 'white',
  },
});
export default HomeScreen;


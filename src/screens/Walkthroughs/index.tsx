import React, {memo, useCallback, useState} from 'react';
import {Dimensions, StyleSheet, TouchableOpacity, View, Text, StatusBar} from 'react-native';
import SvgLogo from "../../svgs/walkthroughs/SvgLogo";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {useNavigation} from "@react-navigation/native";
import SvgIntro1 from "../../svgs/walkthroughs/SvgIntro1";
import SvgIntro2 from "../../svgs/walkthroughs/SvgIntro2";
import SvgIntro3 from "../../svgs/walkthroughs/SvgIntro3";
import {ROUTERS} from "../../utils/navigation";

const {width: viewportWidth} = Dimensions.get('window');

function wp(percentage: number) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

const slideHeight = '100%';
const slideWidth = wp(80);
const itemHorizontalMargin = wp(2);
export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

const data = [
    {color: '#00C48C', Svg: SvgIntro1, title: 'Apa Itu SIAP Bli ?', desc : 'Sistem Aplikasi Berbasis Online merupakan terobosan kreatif Ditreskrimum Polda Bali dalam bidang pelayanan kepada masyarakat yang berhadapan dengan hukum, berupa SP2HP (surat pemberitahuan hasil penyidikan) Online dan SPDP (surat pemberitahuan dimulainya penyidikan) Online.' },
    {color: '#fdbe0f', Svg: SvgIntro2, title: 'SPDP Online', desc: 'Jaksa penuntut umum dan masyarakat sebagai pelapor bisa mengetahui perkembangan Penanganan Perkara yang anda laporkan secara mudah, cepat, akurat & transparan'},
    {color: '#6979F8', Svg: SvgIntro3, title: 'SP2HP Online', desc: 'Masyarakat sebagai pelapor bisa mengetahui perkembangan Penanganan dan kendala penanganan perkara yang anda laporkan secara mudah, cepat, akurat & transparan.'}];

const Walkthroughs = memo(() => {
    const {navigate} = useNavigation();
    const [indexActive, setIndex] = useState(0);

    const onPress = useCallback(()=>{
        navigate('LoginScreen');
    },[])

    const renderItem = useCallback(({item}) => {
        const Svg = item.Svg;
        return (
            <View style={[styles.item, {backgroundColor: item.color}]}>
                <Svg style={styles.svgIntro}/>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.des}>{item.desc}</Text>
            </View>
        )
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle={'dark-content'}/>
            <View style={styles.header}>
                <SvgLogo/>
                <Pagination
                    dotsLength={3}
                    activeDotIndex={indexActive}
                    dotStyle={styles.dotStyle}
                    inactiveDotStyle={styles.inactiveDotStyle}
                    containerStyle={styles.containerStyle}
                    inactiveDotScale={1}
                />
            </View>
            <View style={styles.boxCarousel}>
                <Carousel
                    data={data}
                    renderItem={renderItem}
                    sliderWidth={sliderWidth}
                    itemWidth={itemWidth}
                    inactiveSlideScale={0.94}
                    inactiveSlideOpacity={0.7}
                    containerCustomStyle={styles.slider}
                    contentContainerCustomStyle={styles.sliderContentContainer}
                    onSnapToItem={setIndex}
                />
            </View>

            <TouchableOpacity style={styles.btnSignIn} onPress={onPress}>
                <Text style={styles.txtSignIn}>Lanjutkan</Text>
            </TouchableOpacity>

        </View>
    )
});

export default Walkthroughs;

const styles = StyleSheet.create({
    slider: {
        marginTop: 15,
        height: '70%',
        overflow: 'visible', // for custom animations
        padding: 0,
        margin: 0
    },
    sliderContentContainer: {
        paddingVertical: 10, // for custom animation
    },
    dotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 0,
        backgroundColor: '#0F4C81',
    },
    inactiveDotStyle: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 0,
        backgroundColor: '#6D5F6F',
    },
    containerStyle: {
        padding: 0,
        margin: 0,
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    header: {
        flexDirection: 'row',
        marginTop: 56,
        paddingHorizontal: 24,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    boxCarousel: {
        flex: 1
    },
    btnSignIn: {
        backgroundColor: '#5EA7FF',
        borderRadius: 24,
        marginHorizontal: 45,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 50
    },
    txtSignIn: {
        color: '#FBFBFB',
        fontSize: 17,
        fontWeight: '600',
    },
    item: {
        borderRadius: 16,
        backgroundColor: '#00C48C',
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        overflow: 'hidden',
        justifyContent: 'center',
    },
    svgIntro: {
        alignSelf: 'center'
    },
    title: {
        color: '#000',
        fontSize: 18,
        marginTop: 10,
        marginLeft: 24,
        marginRight: 16,
        fontWeight: 'bold',
    },
    des: {
        fontSize: 16,
        color: '#000',
        textAlignVertical: "center",
        marginTop: 16,
        marginLeft: 24,
        marginRight: 16
    }
});

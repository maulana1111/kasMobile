import React, {memo} from 'react';
import {StyleSheet, Text, View, Image} from "react-native";
import SvgLogo from "../../../svgs/signIn/SvgLogo";
import {Montserrat} from "../../../utils/fonts";
import SvgPerson from "../../../svgs/signIn/SvgPerson";
import {getStatusBarHeight} from "react-native-iphone-x-helper";

const Header = memo(() => {
    return (
        <View style={styles.container}>
             <Image
                style={{alignContent: 'center', resizeMode: 'stretch', width: 70, height: 70}}
                    source={require('../../../assets/images/dollar.png')}
                />
            <Text style={styles.txtWelcome}>Selamat Datang</Text>
            <Text style={styles.txtTo}>BukuKas</Text>
            <View style={styles.circle}/> 
            <Image
                style={{...styles.svgPerson, alignContent: 'center', resizeMode: 'stretch', width: 120, height: 120}}
                    source={require('../../../assets/images/orang.png')}
                />
            {/* <SvgPerson style={styles.svgPerson}/> */}
        </View>
    )
});

export default Header;

const styles = StyleSheet.create({
    container: {
        marginTop: getStatusBarHeight(true) + 5,
        paddingLeft: 40,
        paddingTop: 30,
        backgroundColor: '#fff',
        height: 216
    },
    txtWelcome: {
        fontSize: 32,
        color: '#1A051D',
        fontWeight: '600',
        fontFamily: Montserrat,
        marginTop: 40
    },
    txtTo: {
        fontSize: 24,
        color: '#1A051D',
        fontWeight: '500',
        fontFamily: Montserrat
    },
    circle: {
        width: 196,
        height: 186,
        borderRadius: 88,
        backgroundColor: '#FF647C',
        position: 'absolute',
        right: -88
    },
    svgPerson: {
        position: 'absolute',
        right: 0,
        top: 22
    }
});

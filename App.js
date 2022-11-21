import React, {useEffect, useState, createRef, useLayoutEffect} from 'react';
import {StyleSheet, View, AsyncStorage, Text} from 'react-native';
import 'react-native-gesture-handler';
import LoginScreen from './src/screens/SiginIn';
import SetUpScreen from './src/screens/Bisnis';
import TransaksiScreen from './src/screens/Transaksi';
import HutangScreen from './src/screens/Hutang';
import TransaksiTambahScreen from './src/screens/Transaksi/Tambah';
import HutangTambahScreen from './src/screens/Hutang/Tambah';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import SQLite from 'react-native-sqlite-storage';
// global.db = SQLite.openDatabase(
//   {
//     name: 'SQLite',
//     location: 'default',
//     createFromLocation: '~BukuApp.db',
//   },
//   () => {},
//   (error) => {
//     console.log('ERROR: ' + error);
//   },
// );

const navigationRef = createRef();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}
function transaksiTab() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Transaksi"
        component={TransaksiScreen}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="text-box" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Hutang"
        component={HutangScreen}
        options={{
          tabBarLabel: 'Hutang',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cash" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Piutang"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Stok',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="scale-balance"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Stok"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Barang',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="scale-balance"
              color={color}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
function App({route}) {
  const [isLoggedIn, _setLoggedIn] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => setFirstLoad(false), 3000);
    // Get Status Is User Actice Or Non Active
    AsyncStorage.getItem('token')
      .then((res) => (res ? _setLoggedIn(true) : _setLoggedIn(false)))
      .catch(() => _setLoggedIn(false));
  });
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName={isLoggedIn ? 'Home' : 'WelcomeScreen'}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="TransaksiScreen"
              component={TransaksiScreen}
              initialParams={{
                _setLoggedIn,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{headerShown: false}}
              initialParams={{
                _setLoggedIn,
              }}
            />
            <Stack.Screen
              options={{
                title: 'Kiosan Rio',
                headerShown: true,
              }}
              name="TransaksiScreen"
              component={transaksiTab}
              initialParams={{
                _setLoggedIn,
              }}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                title: 'Tambah Transaksi',
                headerStyle: {
                  backgroundColor: '#fed400',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              name="TransaksiTambahScreen"
              component={TransaksiTambahScreen}
              initialParams={{
                _setLoggedIn,
              }}
            />
            <Stack.Screen
              options={{
                title: 'Hutang',
                headerShown: true,
              }}
              name="HutangScreen"
              component={HutangScreen}
              initialParams={{
                _setLoggedIn,
              }}
            />
            <Stack.Screen
              options={{
                headerShown: true,
                title: 'Tambah Hutang',
                headerStyle: {
                  backgroundColor: '#fed400',
                },
                headerTintColor: '#000',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
              name="HutangTambahScreen"
              component={HutangTambahScreen}
              initialParams={{
                _setLoggedIn,
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

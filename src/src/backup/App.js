import React, {useEffect, useState, createRef, useLayoutEffect} from 'react';
import {StyleSheet, View, AsyncStorage, Text} from 'react-native';
import 'react-native-gesture-handler';
import LoginScreen from './src/screens/SiginIn';
import SetUpScreen from './src/screens/Bisnis';
import navigator from './src/navigator';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SQLite from 'react-native-sqlite-storage';
global.db = SQLite.openDatabase(
  {
    name: 'SQLite',
    location: 'default',
    createFromLocation: '~BukuApp.db',
  },
  () => {},
  (error) => {
    console.log('ERROR: ' + error);
  },
);

const navigationRef = createRef();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
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
              name="SetUpScreen"
              component={SetUpScreen}
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
                headerShown: false,
              }}
              name="SetUpScreen"
              component={SetUpScreen}
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

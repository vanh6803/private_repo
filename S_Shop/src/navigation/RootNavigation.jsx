import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../screens/Auth/Login';
import {nameScreens} from '../Constants';
import Register from '../screens/Auth/Register';
import BottomNavigation from './BottomNavigation';
import Tutorial from '../screens/Auth/Tutorial';
import Splash from '../screens/Auth/Splash';
import Verify from '../screens/Auth/Verify';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductDetail from '../screens/productDetail/ProductDetail';
import PerOder from '../screens/preOrder/PerOder';
import ChangePassword from '../screens/ChangePassword/ChangePassword';

const Stack = createStackNavigator();

export default function RootNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        <Stack.Screen name={nameScreens.splash} component={Splash} />
        <Stack.Screen name={nameScreens.tutorial} component={Tutorial} />
        <Stack.Screen name={nameScreens.login} component={Login} />
        <Stack.Screen name={nameScreens.register} component={Register} />
        <Stack.Screen name={nameScreens.verify} component={Verify} />
        <Stack.Screen name="bottomNavigation" component={BottomNavigation} />
        <Stack.Screen
          name={nameScreens.detailProduct}
          component={ProductDetail}
        />
        <Stack.Screen name={nameScreens.preOder} component={PerOder} />
        <Stack.Screen
          name={nameScreens.changePassword}
          component={ChangePassword}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import {View, Text, LogBox} from 'react-native';
import React from 'react';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import Icon from 'react-native-vector-icons/FontAwesome5';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import Home from '../screens/Home/Home';
import Cart from '../screens/Cart/Cart';
import Notify from '../screens/Notify/Notify';
import Profile from '../screens/Profile/Profile';
import {nameScreens} from '../Constants';
import {lightMode} from '../assets/colors';

const Tab = AnimatedTabBarNavigator();

export default function BottomNavigation() {
  LogBox.ignoreLogs([
    'Warning: BottomTabNavigator: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.',
  ]);

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false}}
      tabBarOptions={{
        activeBackgroundColor: lightMode.primary,
        activeTintColor: 'white',
      }}>
      <Tab.Screen
        name={nameScreens.home}
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconOutline.HomeIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={nameScreens.cart}
        component={Cart}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconOutline.ShoppingCartIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={nameScreens.notify}
        component={Notify}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconOutline.BellIcon color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name={nameScreens.profile}
        component={Profile}
        options={{
          tabBarIcon: ({color, size}) => (
            <IconOutline.UserCircleIcon color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

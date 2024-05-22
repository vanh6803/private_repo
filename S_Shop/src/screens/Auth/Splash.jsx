import {View, Text, Image, ActivityIndicator} from 'react-native';
import React, {useEffect} from 'react';
import {images} from '../../assets/images';
import {useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';
import {headings} from '../../assets/sizes/heading';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {nameScreens} from '../../Constants';

export default function Splash() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const navigation = useNavigation();

  useEffect(() => {
    const checkAppState = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        const firstLaunch = await AsyncStorage.getItem('firstLaunch');

        setTimeout(async () => {
          if (firstLaunch === null) {
            await AsyncStorage.setItem('firstLaunch', 'false');
            navigation.replace(nameScreens.tutorial);
          } else if (userToken) {
            navigation.replace('bottomNavigation');
          } else {
            navigation.replace(nameScreens.login);
          }
        }, 2000); // Delay 2 seconds
      } catch (error) {
        console.log(error);
      }
    };

    checkAppState();
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image source={images.logo} />
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h1,
            fontWeight: 'bold',
          }}>
          S Shop
        </Text>
        <ActivityIndicator
          size="large"
          color={isDarkMode ? darkMode.textColor : lightMode.textColor}
          style={{marginTop: 20}}
        />
      </View>
    </View>
  );
}

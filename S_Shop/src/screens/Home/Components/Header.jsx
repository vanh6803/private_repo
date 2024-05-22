import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {darkMode, lightMode} from '../../../assets/colors';
import {headings} from '../../../assets/sizes/heading';
import {dimensions} from '../../../assets/sizes/dimention';
import {useNavigation} from '@react-navigation/native';
import {nameScreens} from '../../../Constants';

const imageTest = 'https://htran844.github.io/hihi/img/ig/i8.jpg';

const Header = ({profile, isDarkMode}) => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: dimensions.screenWidth * 0.05,
      }}>
      <Text
        style={{
          color: isDarkMode ? darkMode.textColor : lightMode.textColor,
          fontSize: headings.h3,
        }}>
        <Text style={{fontWeight: 'bold'}}>Hello,</Text> {profile?.username}
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate(nameScreens.profile);
        }}>
        <Image
          source={{uri: profile?.avatar ? profile?.avatar : imageTest}}
          style={{
            width: 40,
            height: 40,
            borderRadius: 40,
            resizeMode: 'cover',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Header;

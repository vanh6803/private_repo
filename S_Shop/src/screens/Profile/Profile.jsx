import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';
import {dimensions} from '../../assets/sizes/dimention';
import SizeBox from '../../components/SizeBox';
import {headings} from '../../assets/sizes/heading';
import ButtonOption from '../../components/ButtonOption';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';

const imageTest = 'https://htran844.github.io/hihi/img/ig/i8.jpg';

export default function Profile() {
  const profile = useSelector(state => state.profile.data);
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <View style={{flex: 1, display: 'flex'}}>
        <SizeBox height={dimensions.screenHeight * 0.05} />

        <Image
          source={{
            uri: profile?.avatar ? profile?.avatar : imageTest,
          }}
          style={{
            resizeMode: 'cover',
            aspectRatio: 1,
            width: dimensions.screenWidth * 0.3,
            height: dimensions.screenWidth * 0.3,
            borderRadius: dimensions.screenWidth * 0.3,
            alignSelf: 'center',
          }}
        />

        <Text
          style={{
            textAlign: 'center',
            fontSize: headings.h4,
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            margin: 5,
            fontWeight: '500',
          }}>
          {profile?.username}
        </Text>

        <Text
          style={{
            textAlign: 'center',
            fontSize: headings.h6,
            color: '#525252',
          }}>
          {profile?.email}
        </Text>

        <SizeBox height={15} />

        <View
          style={{
            height: 1.5,
            width: dimensions.screenWidth * 0.9,
            backgroundColor: '#696969',
            alignSelf: 'center',
          }}
        />

        <SizeBox height={15} />

        <ButtonOption
          isDarkMode={isDarkMode}
          textButton="Setting"
          prefixIcon={
            <IconOutline.Cog6ToothIcon
              color={isDarkMode ? darkMode.textColor : lightMode.textColor}
              size={20}
            />
          }
        />

        <SizeBox height={15} />

        <ButtonOption
          isDarkMode={isDarkMode}
          textButton="Change password"
          prefixIcon={
            <IconOutline.LockClosedIcon
              color={isDarkMode ? darkMode.textColor : lightMode.textColor}
              size={20}
            />
          }
        />

        <SizeBox height={15} />

        <ButtonOption
          isDarkMode={isDarkMode}
          textButton="Change profile"
          prefixIcon={
            <IconOutline.UserCircleIcon
              color={isDarkMode ? darkMode.textColor : lightMode.textColor}
              size={20}
            />
          }
        />

        <SizeBox height={15} />

        <ButtonOption
          isDarkMode={isDarkMode}
          textButton="My order"
          prefixIcon={
            <IconOutline.UserCircleIcon
              color={isDarkMode ? darkMode.textColor : lightMode.textColor}
              size={20}
            />
          }
        />

        <SizeBox height={15} />

        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            style={{
              padding: 10,
              backgroundColor: isDarkMode ? darkMode.error : lightMode.error,
              borderRadius: 10,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                color: 'white',
                fontWeight: '600',
                fontSize: headings.h5,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>

        <SizeBox height={15} />
      </View>
    </ScrollView>
  );
}

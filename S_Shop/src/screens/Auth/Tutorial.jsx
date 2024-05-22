import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';
import PagerView from 'react-native-pager-view';
import LottieView from 'lottie-react-native';
import {anims} from '../../assets/animations';
import {dimensions} from '../../assets/sizes/dimention';
import {headings} from '../../assets/sizes/heading';
import {useNavigation} from '@react-navigation/native';
import {nameScreens} from '../../Constants';

export default function Tutorial() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef(null);
  const navigation = useNavigation();

  const indicators = [1, 2, 3];

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <View
        style={{
          flex: 3,
          backgroundColor: 'white',
          borderBottomEndRadius: 20,
          borderBottomStartRadius: 20,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,
          elevation: 3,
          margin: 3,
        }}>
        <PagerView
          ref={pagerRef}
          style={{flex: 1, margin: 10}}
          initialPage={0}
          orientation={'horizontal'}
          scrollEnabled={true}
          onPageSelected={({nativeEvent}) =>
            setCurrentPage(nativeEvent.position)
          }>
          <View
            key="1"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={anims.tutorial_1}
              loop={true}
              autoPlay={true}
              style={{
                width: '100%',
                height: dimensions.screenWidth,
              }}
            />
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                fontSize: headings.h5,
                textAlign: 'center',
              }}>
              Explore the world of new technology with groundbreaking
              innovations for phones, computers, and mobile devices!
            </Text>
          </View>
          <View
            key="2"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={anims.tutorial_2}
              loop={true}
              autoPlay={true}
              style={{
                width: '100%',
                height: dimensions.screenWidth,
              }}
            />
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                fontSize: headings.h5,
                textAlign: 'center',
              }}>
              Experience the power and convenience of technology at your
              fingertips - shop today!
            </Text>
          </View>
          <View
            key="3"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <LottieView
              source={anims.tutorial_3}
              loop={true}
              autoPlay={true}
              style={{
                width: '100%',
                height: dimensions.screenWidth,
              }}
            />
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                fontSize: headings.h5,
                textAlign: 'center',
              }}>
              Phones, computers, and mobile devices - not just tools, but part
              of your life. Choose wisely and smartly!
            </Text>
          </View>
        </PagerView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
          }}>
          {indicators.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: index === currentPage ? '#078ef5' : 'gray', // Tùy chỉnh màu sắc dựa trên trang hiện tại
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: 5,
                }}
              />
            );
          })}
        </View>
      </View>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#8d9499',
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
              width: dimensions.screenWidth / 2.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate(nameScreens.login);
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: headings.h4,
                fontWeight: '500',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: '#078ef5',
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 10,
              width: dimensions.screenWidth / 2.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.navigate(nameScreens.register);
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: headings.h4,
                fontWeight: '500',
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

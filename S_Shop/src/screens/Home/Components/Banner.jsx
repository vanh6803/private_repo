import {
  View,
  Text,
  Animated,
  StyleSheet,
  Easing,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {dimensions} from '../../../assets/sizes/dimention';
import LinearGradient from 'react-native-linear-gradient';
import PagerView from 'react-native-pager-view';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';

const AnimatedLG = Animated.createAnimatedComponent(LinearGradient);

export default function Banner({loading, data, isDarkMode}) {
  const animatedValue = new Animated.Value(0);
  const [bannerIndex, setBannerIndex] = useState(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.inOut(Easing.linear),
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-dimensions.screenWidth, dimensions.screenWidth],
  });

  if (loading == true) {
    return (
      <View
        style={{
          width: dimensions.screenWidth * 0.9,
          height: dimensions.screenWidth * 0.5,
          backgroundColor: '#a0a0a0',
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 10,
        }}>
        <AnimatedLG
          colors={['#a0a0a0', '#b0b0b0', '#b0b0b0', '#a0a0a0']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={{
            width: 0.9 * dimensions.screenWidth,
            height: dimensions.screenWidth * 0.5,
            transform: [{translateX}],
          }}
        />
      </View>
    );
  }

  return (
    <View style={{alignItems: 'center'}}>
      <View
        style={{
          width: dimensions.screenWidth * 0.9,
          height: dimensions.screenWidth * 0.5,
          alignSelf: 'center',
          overflow: 'hidden',
          borderRadius: 10,
        }}>
        {data ? (
          <Carousel
            width={dimensions.screenWidth * 0.9}
            height={dimensions.screenWidth * 0.5}
            autoPlay={true}
            vertical={false}
            loop
            data={data}
            scrollAnimationDuration={3000}
            onSnapToItem={index => setBannerIndex(index)}
            renderItem={({item, index}) => {
              return (
                <FastImage
                  key={index}
                  style={{resizeMode: 'stretch', width: '100%', height: '100%'}}
                  source={{
                    uri: item.image,
                    priority: FastImage.priority.high,
                  }}
                />
              );
            }}
          />
        ) : null}
      </View>
      {/* <FlatList
        data={data}
        horizontal
        renderItem={({item, index}) => {
          return (
            <View
              key={index}
              style={{
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: bannerIndex == index ? 'red' : '#d4d4d4',
                alignSelf: 'center',
                margin: 5,
              }}
            />
          );
        }}
        extraData={(item, index) => index.toString()}
      /> */}
    </View>
  );
}

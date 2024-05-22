import {
  View,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';
import axios from 'axios';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {apiUrl} from '../../api';
import {dimensions} from '../../assets/sizes/dimention';
import Banner from './Components/Banner';
import SizeBox from '../../components/SizeBox';
import Header from './Components/Header';
import {fetchProfileRequest} from '../../redux/actions/ProfileAction';
import {headings} from '../../assets/sizes/heading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {nameScreens} from '../../Constants';
import {fetchCartRequest} from '../../redux/actions/CartAction';

export default function Home() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const profile = useSelector(state => state.profile.data);
  const [products, setProducts] = useState(null);
  const [banner, setBanner] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('token');
        setToken(userToken);
      } catch (error) {
        console.log(error);
      }
    };

    getToken();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchProfileRequest(token));
    }
  }, [token]);

  useEffect(() => {
    fetchBanner();
  }, []);

  useEffect(() => {
    fetchProduct();
  }, []);

  useEffect(() => {
    if (token) {
      dispatch(fetchCartRequest(token));
    }
  }, [token]);

  async function fetchBanner() {
    setIsLoadingBanner(true);
    try {
      const response = await axios.get(apiUrl.banner);
      setIsLoadingBanner(false);
      const data = response.data.data;
      setBanner(data);
    } catch (error) {
      setIsLoadingBanner(false);
      console.log(error);
    }
  }

  async function fetchProduct() {
    setIsLoadingProducts(true);
    try {
      const response = await axios.get(apiUrl.getAllProducts);
      setIsLoadingProducts(false);
      const data = response.data.result;
      setProducts(data);
    } catch (error) {
      setIsLoadingProducts(false);
      console.log(error);
    }
  }

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const handleDetailProduct = product => {
    navigation.navigate(nameScreens.detailProduct, {id: product._id});
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}
      onScroll={event => {
        console.log(event.nativeEvent.contentOffset);
      }}>
      <View
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? darkMode.background
            : lightMode.background,
        }}>
        <SizeBox height={dimensions.screenHeight * 0.01} />
        <Header profile={profile} isDarkMode={isDarkMode} />
        <SizeBox height={dimensions.screenHeight * 0.01} />

        <Banner
          loading={isLoadingBanner}
          data={banner}
          isDarkMode={isDarkMode}
        />

        <FlatList
          scrollEnabled={false}
          data={products}
          numColumns={2}
          centerContent={true}
          style={{
            marginHorizontal: dimensions.screenWidth * 0.05,
            marginVertical: 10,
          }}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => handleDetailProduct(item)}
                style={{
                  flex: 1,
                  maxWidth: '48%',
                  borderRadius: 10,
                  margin: 5,
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  elevation: 2,
                }}>
                <FastImage
                  source={{uri: item.image, priority: FastImage.priority.high}}
                  style={{resizeMode: 'cover', aspectRatio: 1}}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    paddingHorizontal: 10,
                    fontSize: headings.h6,
                    color: isDarkMode
                      ? darkMode.textColor
                      : lightMode.textColor,
                  }}
                  numberOfLines={2}>
                  {item.name}
                </Text>

                <View
                  style={{
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingHorizontal: 10,
                    paddingBottom: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: headings.h6,
                      color: isDarkMode ? darkMode.error : lightMode.error,
                    }}>
                    {formatPrice(item?.minPrice)}
                  </Text>
                  <Text
                    style={{
                      color: isDarkMode
                        ? darkMode.textColor
                        : lightMode.textColor,
                      fontSize: 11,
                    }}>
                    {item.soldQuantity} sold
                  </Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={item => item._id}
        />
      </View>
    </ScrollView>
  );
}

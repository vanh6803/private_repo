import {View, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as IconOutline from 'react-native-heroicons/outline';
import {darkMode, lightMode} from '../../../assets/colors';
import {headings} from '../../../assets/sizes/heading';
import FastImage from 'react-native-fast-image';
import {dimensions} from '../../../assets/sizes/dimention';
import axios from 'axios';
import {apiUrl} from '../../../api';
import {BottomSheetScrollView} from '@gorhom/bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addToCart, fetchCartRequest} from '../../../redux/actions/CartAction';
import {err} from 'react-native-svg';

export default function BottomSheetContent({product, close, type, nextTo}) {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const [selectedOption, setSelectedOption] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const [token, setToken] = useState(null);

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
    if (!selectedOption && product?.option && product.option.length > 0) {
      setSelectedOption(product.option[0]);
    }
  }, [product]);

  const cancel = () => {
    close();
  };

  const buy = () => {
    switch (type) {
      case 'buy':
        close();
        nextTo();
        break;
      case 'cart':
        console.log(selectedOption._id, quantity);
        axios
          .post(
            apiUrl.addToCart,
            {option_id: selectedOption._id, quantity},
            {headers: {Authorization: `Bearer ${token}`}},
          )
          .then(response => {
            dispatch(fetchCartRequest(token));
            ToastAndroid.show('Add to cart success', ToastAndroid.SHORT);
          })
          .catch(error => {
            console.log(error);
          });
        close();
        break;
      default:
        break;
    }
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  return (
    <View style={{flex: 1, flexDirection: 'column'}}>
      <BottomSheetScrollView>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
            }}>
            {selectedOption ? (
              <FastImage
                source={{uri: selectedOption?.image}}
                style={{
                  width: dimensions.screenWidth * 0.3,
                  aspectRatio: 1,
                  borderRadius: 10,
                }}
                resizeMode="cover"
              />
            ) : (
              <View
                style={{
                  width: dimensions.screenWidth * 0.27,
                  height: dimensions.screenWidth * 0.4,
                  backgroundColor: 'gray',
                  borderRadius: 10,
                }}></View>
            )}
            <View
              style={{
                width: 1,
                backgroundColor: 'gray',
                marginHorizontal: 5,
              }}></View>
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text
                style={{
                  color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                  marginHorizontal: 10,
                }}>
                {product?.name}
              </Text>
              {selectedOption ? (
                <Text
                  style={{
                    color: isDarkMode
                      ? darkMode.textColor
                      : lightMode.textColor,
                    marginHorizontal: 10,
                  }}>
                  Giá: {selectedOption?.price.toLocaleString()} VNĐ
                </Text>
              ) : null}

              <Text
                style={{
                  color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                  marginHorizontal: 10,
                }}>
                Số lượng còn: {selectedOption?.quantity}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 10,
                  marginHorizontal: 10,
                }}>
                <TouchableOpacity
                  onPress={decrementQuantity}
                  style={{
                    borderWidth: 1,
                    padding: 2,
                    borderColor: isDarkMode
                      ? darkMode.borderColor
                      : lightMode.borderColor,
                  }}>
                  <IconOutline.MinusIcon
                    color={
                      isDarkMode ? darkMode.textColor : lightMode.textColor
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity style={{marginHorizontal: 10}}>
                  <Text
                    style={{
                      color: isDarkMode
                        ? darkMode.textColor
                        : lightMode.textColor,
                      fontSize: 18,
                    }}>
                    {quantity}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={incrementQuantity}
                  style={{
                    borderWidth: 1,
                    padding: 2,
                    borderColor: isDarkMode
                      ? darkMode.borderColor
                      : lightMode.borderColor,
                  }}>
                  <IconOutline.PlusIcon
                    color={
                      isDarkMode ? darkMode.textColor : lightMode.textColor
                    }
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{width: '100%', height: 1, backgroundColor: 'gray'}} />
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {product?.option.map((option, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setSelectedOption(option);
                  }}
                  key={index}
                  style={{
                    borderWidth: 1,
                    borderColor:
                      selectedOption === option
                        ? 'white'
                        : isDarkMode
                        ? darkMode.borderColor
                        : lightMode.borderColor,
                    padding: 15,
                    paddingVertical: 10,
                    margin: 10,
                    backgroundColor:
                      selectedOption === option
                        ? lightMode.primary
                        : 'transparent',
                    borderRadius: 10,
                  }}>
                  <Text
                    style={{
                      color:
                        selectedOption === option
                          ? 'white'
                          : isDarkMode
                          ? darkMode.textColor
                          : lightMode.textColor,
                    }}>
                    {option.name_color}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </BottomSheetScrollView>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={{flex: 1}} />
        <TouchableOpacity
          onPress={cancel}
          style={{
            backgroundColor: 'gray',
            padding: 10,
            paddingHorizontal: 18,
            borderRadius: 15,
            marginRight: 10,
          }}>
          <Text style={{color: 'white', fontSize: headings.h5}}>Hủy</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={buy}
          style={{
            backgroundColor: isDarkMode ? darkMode.primary : lightMode.primary,
            padding: 10,
            paddingHorizontal: 20,
            borderRadius: 15,
          }}>
          <Text style={{color: 'white', fontSize: headings.h5}}>Mua</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

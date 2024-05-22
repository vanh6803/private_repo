import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import FastImage from 'react-native-fast-image';
import * as IconOutline from 'react-native-heroicons/outline';
import {RectButton, Swipeable} from 'react-native-gesture-handler';
import axios from 'axios';
import {darkMode, lightMode} from '../../assets/colors';
import {dimensions} from '../../assets/sizes/dimention';
import {headings} from '../../assets/sizes/heading';
import {apiUrl} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  updateCartQuantity,
  deleteFromCart,
} from '../../redux/actions/CartAction';

export default function Cart() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const carts = useSelector(state => state.cart.data);

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

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const updateQuantityItem = (id, quantity) => {
    axios
      .put(
        `${apiUrl.updateCartItem}/${id}`,
        {quantity},
        {headers: {Authorization: `Bearer ${token}`}},
      )
      .then(response => {
        dispatch(updateCartQuantity(id, quantity));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDeleteItem = id => {
    axios
      .delete(`${apiUrl.deleteCartItem}/${id}`, {
        headers: {Authorization: `Bearer ${token}`},
      })
      .then(response => {
        dispatch(deleteFromCart(id));
      })
      .catch(error => {
        console.log(error);
      });
  };

  const renderRightActions = (progress, dragX, itemId) => {
    return (
      <RectButton
        style={styles.deleteButton}
        onPress={() => handleDeleteItem(itemId)}>
        <IconOutline.TrashIcon color="white" size={30} />
      </RectButton>
    );
  };

  const calculateTotalPrice = () => {
    return carts.reduce(
      (total, item) => total + item.option_id.price * item.quantity,
      0,
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <View style={{flexDirection: 'row', padding: 10}}>
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h4,
          }}>
          Tổng tiền: {formatPrice(calculateTotalPrice())}
        </Text>
      </View>

      <View>
        <FlatList
          data={carts}
          renderItem={({item}) => {
            return (
              <Swipeable
                renderRightActions={(progress, dragX) =>
                  renderRightActions(progress, dragX, item._id)
                }>
                <View
                  style={{
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    marginHorizontal: 10,
                    padding: 5,
                    borderRadius: 10,
                    overflow: 'hidden',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 2,
                    marginBottom: 10,
                  }}>
                  <FastImage
                    source={{uri: item.option_id.image}}
                    style={{
                      width: dimensions.screenWidth * 0.23,
                      aspectRatio: 1,
                    }}
                    resizeMode="cover"
                  />
                  <View style={{flexDirection: 'column', flex: 1}}>
                    <Text
                      style={{
                        color: isDarkMode
                          ? darkMode.textColor
                          : lightMode.textColor,
                      }}>
                      {item.option_id.product_id.name}
                    </Text>
                    <Text
                      style={{
                        color: isDarkMode ? darkMode.error : lightMode.error,
                      }}>
                      {formatPrice(item.option_id.price)}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: 10,
                        marginHorizontal: 10,
                      }}>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          padding: 2,
                          borderColor: isDarkMode
                            ? darkMode.borderColor
                            : lightMode.borderColor,
                        }}
                        onPress={() =>
                          item.quantity > 1 &&
                          updateQuantityItem(item._id, item.quantity - 1)
                        }>
                        <IconOutline.MinusIcon
                          color={
                            isDarkMode
                              ? darkMode.textColor
                              : lightMode.textColor
                          }
                        />
                      </TouchableOpacity>
                      <Text
                        style={{
                          color: isDarkMode
                            ? darkMode.textColor
                            : lightMode.textColor,
                          fontSize: 18,
                          marginHorizontal: 10,
                        }}>
                        {item.quantity}
                      </Text>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          padding: 2,
                          borderColor: isDarkMode
                            ? darkMode.borderColor
                            : lightMode.borderColor,
                        }}
                        onPress={() =>
                          updateQuantityItem(item._id, item.quantity + 1)
                        }>
                        <IconOutline.PlusIcon
                          color={
                            isDarkMode
                              ? darkMode.textColor
                              : lightMode.textColor
                          }
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Swipeable>
            );
          }}
          keyExtractor={item => item._id}
        />
      </View>
      {carts.length > 0 ? (
        <TouchableOpacity
          style={{
            backgroundColor: lightMode.primary,
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{color: 'white', fontSize: headings.h5, fontWeight: 'bold'}}>
            CheckOut
          </Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
  },
});

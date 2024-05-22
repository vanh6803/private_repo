import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import axios from 'axios';
import {apiUrl} from '../../api';
import {useSelector} from 'react-redux';
import PagerView from 'react-native-pager-view';
import {dimensions} from '../../assets/sizes/dimention';
import FastImage from 'react-native-fast-image';
import {darkMode, lightMode} from '../../assets/colors';
import {headings} from '../../assets/sizes/heading';
import * as IconOutline from 'react-native-heroicons/outline';
import {nameScreens} from '../../Constants';
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import BottomSheetContent from './components/BottomSheetContent';

export default function ProductDetail() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const carts = useSelector(state => state.cart.data);
  const [data, setData] = useState();
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [toolBarVisible, setRoolBarVisible] = useState(false);
  const [type, setType] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;
  const bottomSheetRef = useRef(null);

  const snapPoints = useMemo(() => ['35%'], []);

  useEffect(() => {
    fetchProduct(id);
    fetchProductSimilar(id);
  }, [id]);

  const fetchProduct = async id => {
    try {
      setLoading(true);
      const response = await axios.get(`${apiUrl.detailProduct}/${id}`);
      const result = response.data.result;
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const fetchProductSimilar = async id => {
    try {
      const response = await axios.get(`${apiUrl.getSimilarProducts}/${id}`);
      const result = response.data.result;
      setSimilar(result);
    } catch (error) {
      console.error(error);
    }
  };

  const onPageSelected = event => {
    setCurrentPage(event.nativeEvent.position);
  };

  const formatPrice = price => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator color={lightMode.primary} />
      </View>
    );
  }

  const handleDetailProduct = item => {
    navigation.navigate(nameScreens.detailProduct, {id: item._id});
  };

  const productData = {
    screen: data?.screen,
    camera: data?.camera,
    chipset: data?.chipset,
    cpu: data?.cpu,
    gpu: data?.gpu,
    ram: data?.ram,
    rom: data?.rom,
    operatingSystem: data?.operatingSystem,
    battery: data?.battery,
    weight: data?.weight,
    connection: data?.connection,
    specialFeature: data?.specialFeature,
    manufacturer: data?.manufacturer,
    other: data?.other,
  };

  const tableData = Object.entries(productData).map(([key, value]) => ({
    key,
    value,
  }));

  const renderModalContent = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(38, 38, 38, 0.5)',
          }}>
          <View
            style={{
              width: dimensions.screenWidth * 0.95,
              height: dimensions.screenHeight * 0.9,
              backgroundColor: 'white',
              borderRadius: 20,
              overflow: 'hidden',
              padding: 10,
            }}>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                fontWeight: 'bold',
                fontSize: headings.h4,
              }}>
              Thông số sản phẩm
            </Text>
            <ScrollView
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}>
              {tableData.map(item => (
                <View style={styles.tableRow} key={item.key}>
                  <Text
                    style={[
                      {
                        flex: 2,
                        color: isDarkMode
                          ? darkMode.textColor
                          : lightMode.textColor,
                        fontSize: headings.h6,
                      },
                    ]}>
                    {item.key}
                  </Text>
                  <Text
                    style={[
                      {
                        flex: 3,
                        color: isDarkMode
                          ? darkMode.textColor
                          : lightMode.textColor,
                        fontSize: headings.h6,
                      },
                    ]}>
                    {item.value}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                backgroundColor: isDarkMode
                  ? darkMode.primary
                  : lightMode.primary,
                justifyContent: 'center',
                alignItems: 'center',
                padding: 10,
                borderRadius: 20,
                marginTop: 10,
              }}>
              <Text style={{color: 'white'}}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
      <View
        style={{
          flexDirection: 'row',
          backgroundColor: 'transparent',
          position: 'absolute',
          width: dimensions.screenWidth,
          top: 0,
          zIndex: 1,
          padding: 10,
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(77, 77, 77, 0.7)',
            padding: 10,
            borderRadius: 30,
          }}
          onPress={() => navigation.goBack()}>
          <IconOutline.ArrowLeftIcon
            color={isDarkMode ? lightMode.textColor : darkMode.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'rgba(77, 77, 77, 0.7)',
            padding: 10,
            borderRadius: 30,
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              backgroundColor: 'red',
              borderRadius: 20,
              width: 20,
              height: 20,
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1,
              right: 0,
            }}>
            <Text style={{fontSize: 12, fontWeight: 'bold', color: 'white'}}>
              {carts.length}
            </Text>
          </View>
          <IconOutline.ShoppingCartIcon
            color={isDarkMode ? lightMode.textColor : darkMode.textColor}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: isDarkMode
            ? darkMode.background
            : lightMode.background,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: isDarkMode
              ? darkMode.background
              : lightMode.background,
          }}>
          <View>
            <PagerView
              style={{
                width: dimensions.screenWidth,
                height: dimensions.screenWidth,
              }}
              onPageSelected={onPageSelected}>
              {data?.image.map((image, index) => (
                <FastImage
                  key={index}
                  source={{uri: image}}
                  style={{aspectRatio: 1}}
                  resizeMode="cover"
                />
              ))}
            </PagerView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: '#bdb9b9',
                padding: 5,
                borderRadius: 10,
                margin: 10,
              }}>
              <Text
                style={{
                  fontSize: headings.h6,
                  color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                }}>
                {currentPage + 1}/{data?.image.length}
              </Text>
            </View>
          </View>

          <Text
            style={{
              fontSize: headings.h4,
              color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              fontWeight: 'bold',
              marginHorizontal: 10,
              letterSpacing: 1,
            }}>
            {data?.name}
          </Text>

          <Text
            style={{
              fontSize: headings.h5,
              color: isDarkMode ? darkMode.error : lightMode.error,
              fontWeight: 'bold',
              marginHorizontal: 10,
            }}>
            {formatPrice(data?.minPrice)} - {formatPrice(data?.maxPrice)}
          </Text>

          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: 'rgba(255, 255, 255,0.4)',
              padding: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              }}>
              Loại sản phẩm: {data?.category_id.name}
            </Text>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                marginTop: 4,
              }}>
              Nhà sản xuất: {data?.manufacturer}
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 10,
              marginTop: 10,
              backgroundColor: 'rgba(255, 255, 255,0.4)',
              padding: 5,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              }}>
              Chi tiết sản phẩm:
            </Text>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                letterSpacing: 1,
                marginTop: 4,
              }}>
              {data?.description}
            </Text>

            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text
                style={{
                  color: isDarkMode ? darkMode.primary : lightMode.primary,
                  alignSelf: 'center',
                }}>
                Thông số chi tiết
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: isDarkMode
                ? darkMode.borderColor
                : lightMode.borderColor,
              borderRadius: 10,
              padding: 10,
              margin: 10,
            }}>
            <Text
              style={{
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              }}>
              Bình luận
            </Text>
          </TouchableOpacity>

          <FlatList
            data={similar}
            horizontal={true}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    width: dimensions.screenWidth * 0.4,
                    borderRadius: 10,
                    margin: 5,
                    backgroundColor: 'white',
                    overflow: 'hidden',
                  }}
                  onPress={() => handleDetailProduct(item)}>
                  <FastImage
                    source={{uri: item.image}}
                    style={{aspectRatio: 1}}
                    resizeMode="cover"
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
          />
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            setType('cart');
            bottomSheetRef.current.expand();
          }}
          style={{
            backgroundColor: 'white',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconOutline.ShoppingCartIcon
            color={isDarkMode ? darkMode.textColor : lightMode.textColor}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setType('buy');
            bottomSheetRef.current.expand();
          }}
          style={{
            backgroundColor: isDarkMode ? darkMode.primary : lightMode.primary,
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 12,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: headings.h4,
            }}>
            Mua ngay
          </Text>
        </TouchableOpacity>
      </View>
      {renderModalContent()}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        enablePanDownToClose
        snapPoints={snapPoints}>
        <BottomSheetContent
          product={data}
          close={() => {
            bottomSheetRef.current.close();
          }}
          nextTo={() => {
            navigation.navigate(nameScreens.preOder);
          }}
          type={type}
        />
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    height: dimensions.screenHeight * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  tableCell: {
    flex: 1,
    padding: 5,
    fontSize: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

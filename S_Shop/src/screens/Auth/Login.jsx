import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {nameScreens} from '../../Constants';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {darkMode, lightMode} from '../../assets/colors';
import {headings} from '../../assets/sizes/heading';
import SizeBox from '../../components/SizeBox';
import {dimensions} from '../../assets/sizes/dimention';
import InputCusomer from '../../components/InputCusomer';
import CheckBoxCustomer from '../../components/CheckBoxCustomer';
import axios from 'axios';
import {apiUrl} from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [isChecked, setisChecked] = useState(false);
  const [emailValidMessage, setEmailValidMessage] = useState('');
  const [passwordValidMessage, setPasswordValidMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const login = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (!email) {
      setEmailValid(false);
      setEmailValidMessage('This field is required');
    }

    if (!password) {
      setPasswordValid(false);
      setPasswordValidMessage('This field is required');
    }

    if (isEmailValid && isPasswordValid) {
      setIsLoading(true);

      axios
        .post(apiUrl.login, {email: email, password: password})
        .then(async response => {
          setIsLoading(false);
          ToastAndroid.show('Login success', ToastAndroid.SHORT);
          const token = response.data.token;
          await AsyncStorage.setItem('token', token);
          navigation.navigate('bottomNavigation');
        })
        .catch(error => {
          setIsLoading(false);
          ToastAndroid.show('Login fail', ToastAndroid.SHORT);
          console.log(error);
        });
    }
  };

  function validatePassword(password) {
    if (!password || password.trim() === '' || password == null) {
      setPasswordValidMessage('This field is required');
      return false;
    }
    setPasswordValidMessage('');
    return true;
  }

  const handlePasswordChange = text => {
    setPassword(text);
    const isValid = validatePassword(text);
    setPasswordValid(isValid);
  };

  const handleEmailChange = text => {
    setEmail(text);
    const isValid = validateEmail(text);
    setEmailValid(isValid);
  };

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || email.trim() === '' || email == null) {
      setEmailValidMessage('This field is required');
      return false;
    }
    if (!re.test(String(email).toLowerCase())) {
      setEmailValidMessage('Invalid email address');
      return false;
    }
    setEmailValidMessage('');
    return true;
  }

  return (
    <ScrollView
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
        <SizeBox height={dimensions.screenHeight * 0.1} />
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h2,
            fontWeight: 'bold',
            marginHorizontal: 15,
          }}>
          Welcome back!
        </Text>
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h4,
            fontWeight: '500',
            marginHorizontal: 15,
          }}>
          Explore our latest and greatest products.
        </Text>

        <SizeBox height={dimensions.screenHeight * 0.1} />

        <InputCusomer
          isDarkMode={isDarkMode}
          inputMode="email"
          placeholder="Enter email"
          onChangeText={handleEmailChange}
          isValid={emailValid}
          errorMessage={emailValidMessage}
          prefixIcon={
            <Icon
              name="mail"
              color={isDarkMode ? darkMode.borderColor : lightMode.borderColor}
              size={25}
            />
          }
        />
        <SizeBox height={20} />
        <InputCusomer
          isDarkMode={isDarkMode}
          placeholder="Enter password"
          inputMode="text"
          onChangeText={handlePasswordChange}
          isValid={passwordValid}
          errorMessage={passwordValidMessage}
          prefixIcon={
            <Icon
              name="lock"
              color={isDarkMode ? darkMode.borderColor : lightMode.borderColor}
              size={25}
            />
          }
          suffixIcon={
            <TouchableOpacity
              onPress={() => {
                setIsHidePassword(!isHidePassword);
              }}>
              {isHidePassword ? (
                <IconOutline.EyeIcon
                  color={
                    isDarkMode
                      ? darkMode.placeholderTextColor
                      : lightMode.placeholderTextColor
                  }
                />
              ) : (
                <IconOutline.EyeSlashIcon
                  color={
                    isDarkMode
                      ? darkMode.placeholderTextColor
                      : lightMode.placeholderTextColor
                  }
                />
              )}
            </TouchableOpacity>
          }
          obscureText={isHidePassword}
        />
        <SizeBox height={15} />
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 15,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <CheckBoxCustomer
            initialChecked={isChecked}
            content="Remember"
            onToggle={setisChecked}
          />
          <TouchableOpacity>
            <Text>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <SizeBox height={30} />
        <TouchableOpacity
          onPress={login}
          disabled={isLoading ? true : false}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: isDarkMode ? darkMode.primary : lightMode.primary,
            marginHorizontal: 15,
            borderRadius: 15,
            padding: 10,
          }}>
          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={'white'}
              style={{marginEnd: 10}}
            />
          ) : null}
          <Text
            style={{color: 'white', fontSize: headings.h3, fontWeight: '500'}}>
            Login
          </Text>
        </TouchableOpacity>

        <SizeBox height={10} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              fontWeight: 'normal',
              fontSize: headings.h5,
            }}>
            Create a account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(nameScreens.register);
            }}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: isDarkMode ? darkMode.textColor : lightMode.textColor,
                fontWeight: 'bold',
                fontSize: headings.h5,
              }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <SizeBox height={10} />

        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: isDarkMode ? 'white' : 'black',
              marginHorizontal: 15,
            }}
          />
          <Text
            style={{
              color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              fontWeight: '500',
              fontSize: headings.h5,
            }}>
            Or
          </Text>
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: isDarkMode ? 'white' : 'black',
              marginHorizontal: 15,
            }}
          />
        </View>

        <SizeBox height={10} />
      </View>
    </ScrollView>
  );
}

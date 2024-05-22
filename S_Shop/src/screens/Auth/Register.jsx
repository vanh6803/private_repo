import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import * as IconOutline from 'react-native-heroicons/outline';
import {darkMode, lightMode} from '../../assets/colors';
import SizeBox from '../../components/SizeBox';
import {dimensions} from '../../assets/sizes/dimention';
import {headings} from '../../assets/sizes/heading';
import InputCusomer from '../../components/InputCusomer';
import {useNavigation} from '@react-navigation/native';
import {nameScreens} from '../../Constants';
import axios from 'axios';
import {apiUrl} from '../../api';

export default function Register() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const [isHidePassword, setIsHidePassword] = useState(true);
  const [isHideConfirmPassword, setIsHideConfirmPassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailValid, setEmailValid] = useState(true);
  const [emailValidMessage, setEmailValidMessage] = useState('');
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordValidMessage, setPasswordValidMessage] = useState('');
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(true);
  const [confirmPasswordValidMessage, setConfirmPasswordValidMessage] =
    useState('');
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleEmailChange = text => {
    setEmail(text);
    const isValid = validateEmail(text);
    setEmailValid(isValid);
  };

  const handlePasswordChange = text => {
    setPassword(text);
    const isValid = validatePassword(text);
    setPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    const isValid = text === password;
    setConfirmPasswordValid(isValid);
    setConfirmPasswordValidMessage(isValid ? '' : 'Passwords do not match');
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

  function validatePassword(password) {
    if (!password || password.trim() === '' || password == null) {
      setPasswordValidMessage('This field is required');
      return false;
    }
    if (password.length < 8) {
      setPasswordValidMessage('Password must be at least 8 characters');
      return false;
    }
    setPasswordValidMessage('');
    return true;
  }

  const handleRegister = () => {
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = confirmPassword === password;

    if (!email) {
      setEmailValid(false);
      setEmailValidMessage('This field is required');
    }

    if (!password) {
      setPasswordValid(false);
      setPasswordValidMessage('This field is required');
    }

    if (!confirmPassword) {
      setConfirmPasswordValid(false);
      setConfirmPasswordValidMessage('This field is required');
    }

    if (
      isEmailValid &&
      isPasswordValid &&
      isConfirmPasswordValid &&
      email &&
      password &&
      confirmPassword
    ) {
      setLoading(true);
      axios
        .post(apiUrl.register, {
          email: email,
          password: password,
        })
        .then(response => {
          console.log(response);
          setLoading(false);
          ToastAndroid.show('Register success', ToastAndroid.SHORT);
          navigation.navigate(nameScreens.verify, {email: email});
        })
        .catch(error => {
          setLoading(false);
          ToastAndroid.show('Register fail', ToastAndroid.SHORT);
          console.log(error);
        });
    } else {
      if (!isConfirmPasswordValid) {
        setConfirmPasswordValidMessage('Passwords do not match');
        setConfirmPasswordValid(false);
      }
    }
  };

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
        }}>
        <SizeBox height={dimensions.screenHeight * 0.1} />
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h2,
            fontWeight: 'bold',
            marginHorizontal: 15,
          }}>
          Welcome to our community!
        </Text>
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            fontSize: headings.h5,
            marginHorizontal: 15,
          }}>
          Register now and start a new shopping journey
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
            <IconOutline.EnvelopeIcon
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
            <IconOutline.LockClosedIcon
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
        <SizeBox height={20} />

        <InputCusomer
          isDarkMode={isDarkMode}
          placeholder="Confirm password"
          inputMode="text"
          onChangeText={handleConfirmPasswordChange}
          isValid={confirmPasswordValid}
          errorMessage={confirmPasswordValidMessage}
          prefixIcon={
            <IconOutline.LockClosedIcon
              color={isDarkMode ? darkMode.borderColor : lightMode.borderColor}
              size={25}
            />
          }
          suffixIcon={
            <TouchableOpacity
              onPress={() => {
                setIsHideConfirmPassword(!isHideConfirmPassword);
              }}>
              {isHideConfirmPassword ? (
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
          obscureText={isHideConfirmPassword}
        />

        <SizeBox height={40} />

        <TouchableOpacity
          onPress={handleRegister}
          disabled={loading ? true : false}
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: isDarkMode ? darkMode.primary : lightMode.primary,
            marginHorizontal: 15,
            borderRadius: 15,
            padding: 10,
          }}>
          {loading ? (
            <ActivityIndicator
              size={'small'}
              color={'white'}
              style={{marginEnd: 10}}
            />
          ) : null}
          <Text
            style={{color: 'white', fontSize: headings.h3, fontWeight: '500'}}>
            Register
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
            You have a account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <SizeBox height={40} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});

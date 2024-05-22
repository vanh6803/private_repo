import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';
import OTPInput from '../../components/OTPInput';
import SizeBox from '../../components/SizeBox';
import {dimensions} from '../../assets/sizes/dimention';
import {headings} from '../../assets/sizes/heading';
import ModalSuccess from '../../components/ModalSuccess';
import {useNavigation, useRoute} from '@react-navigation/native';
import {nameScreens} from '../../Constants';
import axios from 'axios';
import {apiUrl} from '../../api';

export default function Verify() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  let otp = useRef(null);
  const [confirmCode, setConfirmCode] = useState('');
  const [isVisibleModalSuccess, setIsVisibleModalSuccess] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;

  // State for countdown timer
  const [timer, setTimer] = useState(60);
  const [showResendButton, setShowResendButton] = useState(false);
  const [codeValid, setCodeValid] = useState(true);
  const [codeValidMessage, setCodeValidMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setShowResendButton(true);
    }
  }, [timer]);

  const validateCode = code => {
    if (!code || code.trim() === '' || code == null) {
      setCodeValidMessage('This field is required');
      return false;
    }
    if (code.length !== 5) {
      setCodeValidMessage('Code must be 5 characters');
      return false;
    }
    setCodeValidMessage('');
    return true;
  };

  const handleVerify = () => {
    const isCodeValid = validateCode(confirmCode);
    if (isCodeValid) {
      console.log(confirmCode);
      setIsLoading(true);
      axios
        .post(apiUrl.verify, {code: confirmCode, email: email})
        .then(response => {
          setIsVisibleModalSuccess(true);
          setTimeout(() => {
            setIsVisibleModalSuccess(false);
            navigation.navigate(nameScreens.login);
          }, 3000);
        })
        .catch(err => {
          setIsLoading(true);
          ToastAndroid.show(
            'Verify fail, check code in your email',
            ToastAndroid.SHORT,
          );
        });
    } else {
      setCodeValid(false);
    }
  };

  const handleResendCode = () => {
    console.log('Resend code');

    axios
      .post(apiUrl.resendCode, {email: email})
      .then(response => {
        setTimer(60);
        setShowResendButton(false);
        ToastAndroid.show('Resend code successfully', ToastAndroid.SHORT);
      })
      .catch(err => {
        ToastAndroid.show('Resend code successfully', ToastAndroid.SHORT);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <SizeBox height={dimensions.screenHeight * 0.2} />
      <Text
        style={{
          color: isDarkMode ? darkMode.textColor : lightMode.textColor,
          fontSize: headings.h2,
          textAlign: 'center',
          fontWeight: 'bold',
        }}>
        Verification code
      </Text>
      <Text
        style={{
          color: isDarkMode ? darkMode.textColor : lightMode.textColor,
          textAlign: 'center',
        }}>
        Verification code has been sent to your Email
      </Text>
      <SizeBox height={20} />
      <OTPInput
        inputCount={5}
        handleTextChange={text => {
          console.log('otp: ', text);
          setConfirmCode(text);
          setCodeValid(true);
          setCodeValidMessage('');
        }}
      />
      {!codeValid && (
        <Text
          style={{
            color: 'red',
            textAlign: 'center',
            marginTop: 10,
          }}>
          {codeValidMessage}
        </Text>
      )}
      {showResendButton ? (
        <TouchableOpacity onPress={handleResendCode}>
          <Text
            style={{
              color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              textAlign: 'center',
              marginTop: 10,
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>
      ) : (
        <Text
          style={{
            color: isDarkMode ? darkMode.textColor : lightMode.textColor,
            textAlign: 'center',
            marginTop: 10,
          }}>
          Request new OTP in 0:{timer < 10 ? `0${timer}` : timer}
        </Text>
      )}
      <SizeBox height={dimensions.screenHeight * 0.05} />
      <TouchableOpacity
        onPress={handleVerify}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isDarkMode ? darkMode.primary : lightMode.primary,
          marginHorizontal: 15,
          borderRadius: 15,
          padding: 10,
        }}>
        <Text
          style={{color: 'white', fontSize: headings.h3, fontWeight: '500'}}>
          Verify
        </Text>
      </TouchableOpacity>
      <ModalSuccess
        visible={isVisibleModalSuccess}
        invisibleToggle={() => {
          setIsVisibleModalSuccess(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});

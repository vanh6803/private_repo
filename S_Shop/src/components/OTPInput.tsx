import React, {FC, ForwardedRef, useRef, useState} from 'react';
import {
  ColorValue,
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputKeyPressEventData,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {headings} from '../assets/sizes/heading';

type OTPInputProps = {
  containerStyle?: ViewStyle | undefined;
  inputCount: number;
  tinColor?: ColorValue | undefined;
  offTinColor?: ColorValue | undefined;
  textInputStyle?: TextStyle | undefined;
  autoFocus?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
  inputCellLength: number;
  defaultValue?: string | undefined;
  handleCallTextChange: (txt: string, i: number) => void;
  handleTextChange: (text: string) => void;
};

const OTPInput: FC<Required<OTPInputProps>> = ({
  containerStyle,
  inputCount = 4,
  offTinColor = 'gray',
  tinColor = 'green',
  textInputStyle,
  autoFocus = false,
  keyboardType = 'numeric',
  inputCellLength = 1,
  defaultValue,
  handleCallTextChange,
  handleTextChange,
}) => {
  const inputs = useRef<(TextInput | null)[]>([]);
  const [otp, setOtp] = useState(
    getOtpText(inputCount, inputCellLength, defaultValue),
  );
  const [focusedInput, setFocusedInput] = useState(0);
  const [keyboardStatus, setKeyboardStatus] = useState(false);

  function getOtpText(count: number, cell: number, text: string) {
    let m = text?.match(new RegExp('.{1,' + cell + '}', 'g')) || [];
    return m.slice(0, count);
  }

  const TextInputComponent = [];

  function onInputFocusEvent(i: number) {
    const prev = i - 1;
    if (prev > -1 && !otp[prev]) {
      inputs.current[prev]?.focus();
      return;
    }
    setFocusedInput(i);
  }
  function isValid(text: string) {
    const _isValid = /^[0-9a-zA-Z]+$/;
    return text.match(_isValid);
  }

  function onchangeText(txt: string, i: number) {
    if (txt && !isValid(txt)) {
      return;
    }
    let temp = [...otp];
    temp[i] = txt;
    setOtp(temp);
    handleCallTextChange && handleCallTextChange(txt, i);
    if (txt.length === inputCellLength && i !== inputCount - 1) {
      inputs.current[i + 1]?.focus();
    }
    handleTextChange(temp.join(''));
  }

  function onKeyPress(
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
    i: number,
  ) {
    const val = otp[i] || '';
    if (e.nativeEvent.key !== 'Backspace' && i !== inputCount - 1) {
      inputs.current[i + 1]?.focus();
      return;
    }
    if (e.nativeEvent.key === 'Backspace' && i !== 0) {
      if (!val.length && otp[i - 1].length === inputCellLength) {
        let temp = [...otp];
        temp[i - 1] = otp[i - 1]
          .split('')
          .splice(0, otp[i - 1].length - 1)
          .join('');
        setOtp(temp);
        handleTextChange(otp.join(''));
        inputs.current[i - 1]?.focus();
      }
    }
  }

  for (let i = 0; i < inputCount; i++) {
    TextInputComponent.push(
      <TextInput
        ref={e => {
          if (e) {
            inputs.current[i] = e;
          }
        }}
        key={i}
        autoCorrect={false}
        autoFocus={autoFocus && i === 0}
        keyboardType={keyboardType}
        value={otp[i] || ''}
        style={{
          height: 45,
          width: 45,
          borderWidth: 1,
          margin: 5,
          textAlign: 'center',
          fontSize: headings.h3,
          fontWeight: '600',
          color: 'black',
          borderRadius: 10,
          borderColor: focusedInput === i ? tinColor : offTinColor,
        }}
        maxLength={inputCellLength}
        onFocus={() => onInputFocusEvent(i)}
        onChangeText={txt => onchangeText(txt, i)}
        multiline={false}
        selectionColor={tinColor}
        onKeyPress={e => onKeyPress(e, i)}
      />,
    );
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <TextInput style={[{}, textInputStyle]} />
      {TextInputComponent}
    </View>
  );
};

const styles = StyleSheet.create({});

export default OTPInput;

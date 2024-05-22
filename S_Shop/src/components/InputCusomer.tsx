import React, {FC, useState} from 'react';
import {
  InputModeOptions,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
  Text,
} from 'react-native';
import {darkMode, lightMode} from '../assets/colors';
import {headings} from '../assets/sizes/heading';

interface TextInputCustomer {
  isDarkMode: boolean;
  styleContainer?: ViewStyle | undefined;
  inputStyle: TextStyle | undefined;
  placeholder?: string | undefined;
  inputMode?: InputModeOptions | undefined;
  suffixIcon?: React.ReactNode;
  prefixIcon?: React.ReactNode;
  value?: string;
  onChangeText?: ((text: string) => void) | undefined;
  obscureText?: boolean;
  isValid?: boolean | undefined;
  errorMessage?: string;
}

const InputCusomer: FC<
  Required<Omit<TextInputCustomer, 'isValid'>> &
    Partial<Pick<TextInputCustomer, 'isValid'>>
> = ({
  isDarkMode,
  styleContainer,
  inputStyle,
  placeholder,
  inputMode,
  suffixIcon,
  prefixIcon,
  value,
  onChangeText,
  obscureText,
  isValid = true,
  errorMessage,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const borderColor = !isValid
    ? isDarkMode
      ? darkMode.error
      : lightMode.error
    : isFocused
    ? isDarkMode
      ? darkMode.primary
      : lightMode.primary
    : isDarkMode
    ? darkMode.borderColor
    : lightMode.borderColor;

  return (
    <View style={{marginHorizontal: 15}}>
      <TouchableOpacity
        activeOpacity={1}
        style={[
          {
            flexDirection: 'row',
            borderWidth: 1,
            borderRadius: 10,
            paddingHorizontal: 10,
            alignItems: 'center',
            borderColor: borderColor,
          },
          styleContainer,
        ]}>
        {prefixIcon &&
          React.cloneElement(prefixIcon as React.ReactElement, {
            color: borderColor,
          })}
        <TextInput
          style={[
            {
              flex: 1,
              marginLeft: 5,
              color: isDarkMode ? darkMode.textColor : lightMode.textColor,
              fontSize: headings.h5,
            },
            inputStyle,
          ]}
          placeholder={placeholder}
          inputMode={inputMode}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          onChangeText={onChangeText}
          cursorColor={isDarkMode ? darkMode.textColor : lightMode.textColor}
          secureTextEntry={obscureText}
        />
        {suffixIcon}
      </TouchableOpacity>
      {!isValid && errorMessage && (
        <Text
          style={{
            color: isDarkMode ? darkMode.error : lightMode.error,
            fontSize: 14,
            marginTop: 5,
          }}>
          {errorMessage}
        </Text>
      )}
    </View>
  );
};

export default InputCusomer;

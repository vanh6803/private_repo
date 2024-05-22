import React, {FC} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ViewStyle,
} from 'react-native';
import {darkMode, lightMode} from '../assets/colors';
import {headings} from '../assets/sizes/heading';
import {dimensions} from '../assets/sizes/dimention';

type buttonOptionProps = {
  textButton: string;
  prefixIcon?: React.ReactNode;
  isDarkMode: boolean;
  styleContainer?: ViewStyle | undefined;
};

const ButtonOption: FC<Required<buttonOptionProps>> = ({
  textButton,
  prefixIcon,
  isDarkMode,
  styleContainer,
}) => {
  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          borderWidth: 1,
          padding: 10,
          marginHorizontal: dimensions.screenWidth * 0.05,
          borderRadius: 10,
          overflow: 'hidden',
          alignItems: 'center',
        },
        styleContainer,
      ]}>
      {prefixIcon}
      <Text
        style={{
          color: isDarkMode ? darkMode.textColor : lightMode.textColor,
          fontSize: headings.h5,
          marginStart: 10,
        }}>
        {textButton}
      </Text>
    </TouchableOpacity>
  );
};

export default ButtonOption;

import React, {FC, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import * as IconOutline from 'react-native-heroicons/outline';
import * as IconSolid from 'react-native-heroicons/solid';
import {darkMode, lightMode} from '../assets/colors';
import {headings} from '../assets/sizes/heading';

interface CheckBoxProps {
  initialChecked?: boolean;
  content?: string;
  isDarkMode?: boolean;
  onToggle?: (checked: boolean) => void;
}

const CheckBoxCustomer: FC<CheckBoxProps> = ({
  initialChecked = false,
  content,
  isDarkMode = false,
  onToggle,
}) => {
  const [checked, setChecked] = useState(initialChecked);

  const handlePress = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (onToggle) {
      onToggle(newChecked);
    }
  };

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          borderWidth: 1,
          width: 24,
          height: 24,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {initialChecked ? (
          <IconOutline.CheckIcon
            color={isDarkMode ? darkMode.textColor : lightMode.textColor}
          />
        ) : null}
      </TouchableOpacity>
      <Text
        style={{
          color: isDarkMode ? darkMode.textColor : lightMode.textColor,
          fontSize: headings.h5,
          marginStart: 5,
        }}>
        {content}
      </Text>
    </View>
  );
};

export default CheckBoxCustomer;

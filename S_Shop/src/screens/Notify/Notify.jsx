import {View, Text} from 'react-native';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {darkMode, lightMode} from '../../assets/colors';

export default function Notify() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  const dispatch = useDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? darkMode.background
          : lightMode.background,
      }}>
      <Text>Notify</Text>
    </View>
  );
}

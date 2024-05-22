import {View, Text, SafeAreaView, StatusBar} from 'react-native';
import React from 'react';
import RootNavigation from './navigation/RootNavigation';
import {useSelector} from 'react-redux';

export default function Main() {
  const isDarkMode = useSelector(state => state.theme.darkMode);
  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
}

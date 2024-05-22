import React from 'react';
import Main from './src/Main';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <Main />
      </Provider>
    </GestureHandlerRootView>
  );
}

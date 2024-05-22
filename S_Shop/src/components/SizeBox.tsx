import React from 'react';
import {DimensionValue, StyleSheet, View} from 'react-native';

interface sizeBoxProps {
  height?: DimensionValue | undefined;
  width?: DimensionValue | undefined;
}
const SizeBox: React.FC<sizeBoxProps> = ({height, width}) => {
  return (
    <View
      style={{
        height: height,
        width: width,
      }}
    />
  );
};

export default SizeBox;

import React, {FC, useRef} from 'react';
import {Modal, StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {dimensions} from '../assets/sizes/dimention';
import LottieView from 'lottie-react-native';
import {anims} from '../assets/animations';

type modalSuccessProps = {
  visible?: boolean | undefined;
  invisibleToggle?: () => void;
};

const ModalSuccess: FC<Required<modalSuccessProps>> = ({
  visible,
  invisibleToggle,
}) => {
  const viewContainerRef = useRef(null);
  const viewContentRef = useRef(null);
  const handleContentPress = (e: any) => {
    // Prevent propagation of the press event to the parent TouchableWithoutFeedback
    e.stopPropagation();
  };
  return (
    <Modal visible={visible} transparent animationType="fade">
      <TouchableWithoutFeedback
        onPress={invisibleToggle}
        ref={viewContainerRef}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(140,140,140, 0.3)',
          }}>
          <TouchableWithoutFeedback
            onPress={handleContentPress}
            ref={viewContentRef}>
            <View
              style={{
                backgroundColor: 'white',
                width: dimensions.screenWidth * 0.8,
                height: dimensions.screenWidth * 0.5,
                borderRadius: 16,
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 8,
                },
                shadowOpacity: 0.44,
                shadowRadius: 10.32,
                elevation: 16,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <LottieView
                source={anims.success}
                autoPlay={true}
                loop={false}
                style={{
                  width: dimensions.screenWidth * 0.4,
                  height: dimensions.screenWidth * 0.4,
                }}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default ModalSuccess;
